const Sequelize = require('sequelize');
const Banco = require('./connection')

const clinTabela = Banco.define('clinicas',{
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

    telefone:{
        allowNull:false,
        type:Sequelize.STRING
    },
    senha:{
        allowNull:false,
        type:Sequelize.STRING
    },
    cnpj:{
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
    crm:{
        allowNull:false,
        type:Sequelize.STRING
    },
    situacao:{
        allowNull:true,
        type:Sequelize.STRING
    }
})

module.exports = clinTabela