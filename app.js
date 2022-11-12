const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const rotaUsers = require('./routes/users')
const rotaCadastro = require('./routes/cadastro')

app.use(morgan('dev'))
//body parser
//significa que apenas vamos receber dados simples
app.use(bodyParser.urlencoded({extended: false}))
//apenas json de entrada no body
app.use(bodyParser.json())

//pesquisar sobre esse cabeçalho
//da permissao a todos os oprigens de controle de acesso, caso fosse algum em especico
//o seu endereço deveria ser colocado no segundo argumento
//------------------------------------------------------------------
/*Tratamento de header*/
app.use((req, res, next) => {
    res.header('Acces-Control-Allow-Origin', '*')
    res.header(
        'Acces-Control-Allow-Header', 
        'Origin, X-Requrested-Width, Content-Type, Accept, Authorization'
    );
//o client so consegue chamar a api, por um desses verbos
//method options é sobre a forma como a url esta sendo chamada
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', ('PUT, POST, PATCH, DELETE, GET'));
        return res.status(200).send({})
    }
    next();
})
//------------------------------------------------------------------

/*ROTAS*/

app.use('/users', rotaUsers)
app.use('/cadastro', rotaCadastro)

//------------ TRATAMENTO DE ROTAS NAO ENCONTRADAS -------------------------
//para rotas nao encontradas
app.use((req, res, next) => {
    const erro = new Error('Rota nao encontrada');
    erro.status = 404;
    next(erro);
})
//reconhece o erro e avalia o metodo anterior de rota nao encontrada
app.use((error, req, res, next) =>{
    res.status(error.status || 500);
    return res.send({
        erro:error.message
    })
})
module.exports = app