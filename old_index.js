const express = require('express')
const app = express()

// Config ejs no express
app.set('view engine', 'ejs')

// Arquivos estaticos no express
app.use(express.static('public'))

app.get('/:nome?/:lang?', (req, res) => {
    var { nome, lang } = req.params
    var exibirMsg = false

    var produtos = [
        {nome: "Doritos", preco: 3.14},
        {nome: "Coca cola", preco: 5.00},
        {nome: "Leite", preco: 1.45},
        {nome: "Carne", preco: 15},
        {nome: "Redbull", preco: 5},
        {nome: "Nescau", preco: 4}
    ]
                    
    res.render("index", {
        nome,
        lang,
        empresa: "Guia do programador",
        inscritos: 8000,
        msg: exibirMsg,
        produtos
    })
})

app.listen(8080, console.log('App rodando!'))
