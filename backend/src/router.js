const express = require('express');
const router = express.Router();
const paginas = require('./controllers/Paginas')




router.get('/', paginas.paginaInicial)
router.post('/cadastrar', paginas.verificacaoCadastro, paginas.cadastrar)
router.post('/login', paginas.login)
router.get('/inicio',paginas.verificarToken, paginas.logado )
router.post('/busca',paginas.busca)
router.post('/recuperar',paginas.recuperar)
router.post('/cadastrarclin', paginas.cadastrarClinica, paginas.verificacaoCadastroClinica)

module.exports = router;