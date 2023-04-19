const app = require('./app');


const porta = require('./config/'+process.env.NODE_ENV).porta.port
console.log(`o servidor está online na porta ${porta}`)
app.listen(porta)