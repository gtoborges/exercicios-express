const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const saudacao = require('./saudacaoMid')
const usuarioApi = require('./api/usuario')


//Primeira forma de realizar a comunicação com módulos (olhar ./api/usuario)
app.post('/usuario', usuarioApi.salvar)
app.get('/usuario', usuarioApi.obter)

//Segunda forma de fazer a comunicação com os módulos (olhar ./api/produto)
const produtoApi = require('./api/produto')
produtoApi(app, 'com param!')

app.use(bodyParser.text())
app.use(bodyParser.json())
app.use((req, res, next) => {
    console.log('Antes')
    next()
})

app.use(saudacao('Augusto'))

app.get('/clientes/relatorio', (req, res) => {
    res.send(`Cliente relatório: completo ${req.query.completo} ano =${req.query.ano}`)
})

app.get('/clientes/:id', (req, res) => {
    res.send(`Cliente ${req.params.id} selecionado!`)
})

app.post('/corpo', (req, res) =>{
    res.send(req.body.nome3)
    // let corpo =''
    // req.on('data', function(parte){
    //     corpo += parte
    // })

    // req.on('end', function(){
    //     res.send(corpo)
    // })
})

app.get('/opa', (req, res, next) => {
    console.log('Durante')
    res.json({
        data: [
            {id: 1, name: 'Marcelo', position: 1},
            {id: 2, name: 'Vitor', position: 2},
            {id:3, name: 'Augusto', position: 3}
        ],
        count: 3,
        limit: 10,
    })
    next()
})

app.use((req, res) => {
    console.log('Depois')
})

app.listen(3000, () => {
    console.log('Backend executando...')
})