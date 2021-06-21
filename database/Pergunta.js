const Sequelize = require('sequelize')
const connection = require('./database')

// Difinir Model da tabela     // definir nome da tabela
const Pergunta = connection.define('perguntas', {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})
// }, {})

// Criar tabela se nao existir:
Pergunta.sync({ force: false }) // force, nao forca criar tabela se ela ja existir
    .then(() => {})

module.exports = Pergunta
    