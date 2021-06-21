require('dotenv').config()

const express = require('express')
const app = express()
const connection = require('./database/database')
const Pergunta = require('./database/Pergunta')
const Resposta = require(`./database/Resposta`)

// Database:
connection  
    .authenticate() // tenta logar no mysql
    .then(() => {
      console.log('Conexao feita com o banco de dados!')  
    }) 
    .catch(err => {
        console.error(err)
    })

// Config ejs no express
app.set('view engine', 'ejs')

// Arquivos estaticos no express
app.use(express.static('public'))

app.use(express.urlencoded({ extended: false })) 
app.use(express.json()) // permite ler dados no formato JSON


// Rotas:
app.get('/', (req, res) => {
    // SELECT * FROM perguntas:
    Pergunta.findAll({ 
        raw: true,      // raw: true => retorna apenas os dados
        order: [        
            ['id', 'DESC']  // Ordena pelo ID, decrescent = 'DESC' / Crescente = 'ASC'
            // ['titulo', 'ASC']  // Ordena pelo titulo
        ]}) 
        .then(perguntas => {
            console.log(perguntas)
            res.render("index", {
                perguntas
            })
        })
        .catch(err => {
            console.error(err)
        })
        
})  

app.get('/perguntar', (req, res) => {
    res.render("perguntar")
})

app.post("/salvarpergunta", (req, res) => {
    var { titulo, descricao } = req.body
    // Salvar na tabela: INSERT INTO <tabela>
    Pergunta.create({
        titulo,
        descricao
    })
    .then(() => {
        res.redirect('/')
    })
    // res.send(`Titulo: ${titulo}, Descricao: ${descricao}`)
})

app.get('/pergunta/:id', (req, res) => {
    var id = req.params.id
    Pergunta.findOne({
        where: { id: id }  // Busca qualquer campo da tabela, e retorna se encontrar
    })
    .then(pergunta => {
        if(pergunta != undefined){
            Resposta.findAll({
                where: { perguntaId: id },
                order: [ 
                    ['id', 'DESC'] 
                ]
            })
            .then(respostas => {
                res.render('pergunta', { 
                    pergunta,
                    respostas
                })
            })
        }else{
            res.redirect('/')
        }
    })
        // .catch(err => {
        //     console.error(err)
        // })

})

app.post('/responder', (req, res) => {
    var corpo = req.body.corpo
    var perguntaId = req.body.pergunta
    Resposta.create({
        corpo,
        perguntaId
    })
    .then(() => {
        res.redirect("/pergunta/"+perguntaId)
    })
    .catch(err => {
        console.error(err)
    })
     
})

app.listen(8080, console.log('App rodando!'))
