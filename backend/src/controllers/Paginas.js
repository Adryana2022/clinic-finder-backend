const { body, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const userTabela = require('../models/users')
const jwt = require('jsonwebtoken')
const segredo = process.env.JWT_SECRET



const paginaInicial = (req, res) => {
    res.status(200).json({msg:"está funcionando"});
}
const cadastrar = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() }), console.log(errors)
    }
    let conta = await userTabela.findOne({ where: { email: req.body.email } })
    if (conta == null) {
        conta = await userTabela.findOne({where:{cpf:req.body.cpf}})
        if(conta == null){
            res.status(200)
        }
        else{
            return res.status(500).json('erro ao tentar criar o cadastro: cpf já existente no sistema. entre em contato com o suporte!')
        }
    }else{
        return res.status(500).json('erro ao tentar criar o cadastro: email já existente no sistema. entre em contato com o suporte!')
    }
    try {
        const senhaCript = await bcrypt.hash(req.body.senha, 10)
        await userTabela.create({
            nome: req.body.nome,
            senha: senhaCript,
            email: req.body.email,
            cpf: req.body.cpf,
            rua: req.body.rua,
            bairro: req.body.bairro,
            cidade: req.body.cidade,
            estado: req.body.estado,
            cep: req.body.cep,
            numero: req.body.numero

        })
        return res.status(200).json({ msg: 'Usuário cadastrado com sucesso!' })

    }
    catch (ERR) {
        console.log(ERR)
        res.status(500).json({ msg: 'erro ao cadastrar o usuário' })


    }


}
const verificacaoCadastro =
    [
        body('senha').notEmpty().isLength({ min: 8 }).withMessage('a senha deve conter 8 ou mais caracteres!'),
        body('email').notEmpty().isEmail().withMessage('o email deve ser válido!'),
        body('nome').notEmpty().isAlpha('pt-BR', { ignore: " " }).withMessage('o nome não pode conter números ou símbolos!'),
        body('cpf').notEmpty().isLength({ min: 11 }).withMessage('o cpf digitado não contém o número correto de algarismos!'),
        body('rua').notEmpty().withMessage('o campo rua não pode estar vazio!'),
        body('bairro').notEmpty().withMessage('o campo bairro não pode estar vazio!'),
        body('cidade').notEmpty().withMessage('o campo cidade não pode estar vazio!'),
        body('estado').notEmpty().withMessage('o campo estado não pode estar vazio!'),
        body('cep').notEmpty().isLength({ min: 8 }).withMessage('o campo cep deve conter 8 caracteres!'),
        body('numero')
    ]

const login = async(req, res) => {
    
    

    try{
        const user = await userTabela.findOne({where:{email:req.body.email}})
        
        if(!user || !(bcrypt.compareSync(req.body.senha, user.senha))){
            res.status(400).json('Login ou senha incorretos!')
        }else{
            const token = jwt.sign({userID:user.id}, segredo, {expiresIn:'1h'})
            res.json({token,msg:'login efetuado com sucesso!'})
        }
            
        
        
        
    }
    catch(err){
        console.log(err)
    }
    // if(!user || !bcrypt.compare(req.body.senha, user.senha)){
    //     return res.status(401).json({msg:'credenciais inválidas!'})   
    // }

    


}
const logado = (req, res)=>{
    res.json('logado!')
}
function verificarToken(req, res, next){
    const token = req.headers.authorization
    
    if(!token){
        console.log(!token)
        return res.status(401).json({ error: 'não autorizado!' });
        
    }
    try{
        
        const decodificado = jwt.verify(token, segredo)
        req.userID = decodificado.id;
        
        res.status(201).json('seja bem-vindo!')
        return next()

    }catch(error){
        console.log(error)
        return res.status(401).json({error})
    }

}

    function Busca(req,res){

    }

module.exports = {
    paginaInicial,
    cadastrar,
    verificacaoCadastro,
    login,
    verificarToken,
    logado,
    Busca
}