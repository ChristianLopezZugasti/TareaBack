const { Sequelize} = require('sequelize')

const db = new Sequelize(process.env.DBNAME,process.env.DBUSER,process.env.DBPASSWORD,{
    host: process.env.DBHOST,
    dialect: 'mysql'
})

module.exports = { db}