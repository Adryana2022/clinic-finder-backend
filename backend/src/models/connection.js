const Sequelize = require('sequelize')
const config = require('../config/'+process.env.NODE_ENV)


const sequelize = new Sequelize(config.database.database, config.database.user, config.database.password,{
    host:config.database.host,
    dialect:config.database.dialect,
    port:config.database.port,
    dialectOptions:config.database.dialectOptions
});

sequelize.authenticate()
.then(()=>{console.log('conexão feita com sucesso!')})
.catch((err)=>{console.log(err)})

sequelize.sync()
module.exports = sequelize