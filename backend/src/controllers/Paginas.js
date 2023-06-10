const { body, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const userTabela = require('../models/users')
const jwt = require('jsonwebtoken')
const segredo = process.env.JWT_SECRET
const clinicaTabela = require('../models/clinicas');




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

    function busca(req,res){

    }
    const nodemailer = require('nodemailer');

    const recuperar=async(req, res) =>{
      
        console.log(req.body.email)
        try{
            const user = await userTabela.findOne({where:{email:req.body.email}})
           
            if (user){
                res.status(200).json({msg:'Link de redefinição de senha enviado com sucesso'})
            }else{
                res.json({msg: 'Email não encontrado'})
            }
        }
        catch(erro){
      console.log(erro)
        }
    }

    
    const cadastrarClinica = async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() }), console.log(errors);
      }
    
      let conta = await clinicaTabela.findOne({ where: { email: req.body.email } });
      if (conta === null) {
        conta = await clinicaTabela.findOne({ where: { cnpj: req.body.cnpj } });
        if (conta === null) {
          res.status(200);
        } else {
          return res
            .status(500)
            .json('Erro ao tentar criar o cadastro: CNPJ já existente no sistema. Entre em contato com o suporte!');
        }
      } else {
        return res
          .status(500)
          .json('Erro ao tentar criar o cadastro: E-mail já existente no sistema. Entre em contato com o suporte!');
      }
    
      try {
        const senhaCript = await bcrypt.hash(req.body.senha, 10);
        await clinicaTabela.create({
          nome: req.body.nome,
          email: req.body.email,
          telefone: req.body.telefone,
          cnpj: req.body.cnpj,
          cep: req.body.cep,
          rua: req.body.rua,
          bairro: req.body.bairro,
          estado: req.body.estado,
          crm: req.body.crm,
          situacao: req.body.situacao,
        });
        return res.status(200).json({ msg: 'Clínica cadastrada com sucesso!' });
      } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Erro ao cadastrar a clínica' });
      }
    };
    
    const verificacaoCadastroClinica = [
      body('nome').notEmpty().isAlpha('pt-BR', { ignore: " " }).withMessage('O nome não pode conter números ou símbolos!'),
      body('email').notEmpty().isEmail().withMessage('O e-mail deve ser válido!'),
      body('telefone').notEmpty().withMessage('O campo telefone não pode estar vazio!'),
      body('cnpj').notEmpty().isLength({ min: 14, max: 14 }).withMessage('O CNPJ deve conter 14 dígitos!'),
      body('cep').notEmpty().isLength({ min: 8 }).withMessage('O CEP deve conter 8 dígitos!'),
      body('rua').notEmpty().withMessage('O campo rua não pode estar vazio!'),
      body('bairro').notEmpty().withMessage('O campo bairro não pode estar vazio!'),
      body('estado').notEmpty().withMessage('O campo estado não pode estar vazio!'),
      body('crm').notEmpty().withMessage('O campo CRM não pode estar vazio!'),
      body('situacao').notEmpty().withMessage('O campo situação cadastral não pode estar vazio!'),
    ];
 


module.exports = {
    paginaInicial,
    cadastrar,
    verificacaoCadastro,
    login,
    verificarToken,
    logado,
    busca,
    recuperar,
    cadastrarClinica,
    verificacaoCadastroClinica
  
}