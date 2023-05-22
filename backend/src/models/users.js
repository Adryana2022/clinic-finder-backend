const Sequelize = require('sequelize');
const Banco = require('./connection')

const userTabela = Banco.define('usuarios',{
    id:{
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
        type:Sequelize.INTEGER
    },
    nome:{
        allowNull:false,
        type:Sequelize.STRING
    },
    email:{
        allowNull:false,
        type:Sequelize.STRING
    },
    senha:{
        allowNull:false,
        type:Sequelize.STRING
    },
    cpf:{
        allowNull:false,
        type:Sequelize.STRING
    },
    rua:{
        allowNull:false,
        type:Sequelize.STRING
    },
    bairro:{
        allowNull:false,
        type:Sequelize.STRING
    },
    cidade:{
        allowNull:false,
        type:Sequelize.STRING
    },
    estado:{
        allowNull:false,
        type:Sequelize.STRING
    },
    cep:{
        allowNull:false,
        type:Sequelize.STRING
    },
    numero:{
        allowNull:true,
        type:Sequelize.STRING
    }
})

module.exports = userTabela