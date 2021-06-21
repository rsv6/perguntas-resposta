const Sequelize = require(`sequelize`)


// Criar conexao
const connection = new Sequelize(process.env.DB, process.env.USER_DB, process.env.DB_PSSWD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
})


module.exports = connection