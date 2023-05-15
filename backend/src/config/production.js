require('dotenv').config()
const port = process.env.PORT?process.env.PORT : 5000
module.exports ={
    porta:{
        port: port
    },
    database:{
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        password: process.env.DB_PASSWORD,
        user: process.env.DB_USER,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT,
        dialectOptions:{
            ssl:{
                require:'true'
            }
    }
    }

}