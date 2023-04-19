require('dotenv').config()
const port = process.env.PORT?process.env.PORT : 3333
module.exports ={
    porta:{
        port:port
    },
    database:{
        host: process.env.DB_DEV_HOST,
        dialect: process.env.DB_DEV_DIALECT,
        password: process.env.DB_DEV_PASSWORD,
        user: process.env.DB_DEV_USER,
        database: process.env.DB_DEV_DATABASE,
        port: process.env.DB_DEV_PORT,
        dialectOptions:{}
    }
}