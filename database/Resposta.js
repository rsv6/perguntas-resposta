const Sequelize = require('sequelize')
const connection = require('./database')

// Realacionamento entre a Resposta e uma Pergunta:
const Resposta = connection.define("respostas", {
  // Define campos e tipos da tabela:
  corpo: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  // Toda resposta pertence a uma pergunta:
  perguntaId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

// Sicroniza com o banco de dados:
Resposta.sync({ force: false })

module.exports = Resposta