const express = require('express');
const { Connection } = require('pg');
const router = express.Router();
const mysql = require('../mysql').pool

//imprime todos os usuarios
router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn)=>{
        if(error) return next(error);
        conn.query(
            'SELECT * FROM data', (error, users) => {
                conn.release();
                if(error) return next(error)
                res.json(users);
            }
        )
    })
    // res.status(200).send({
    //     mensagem: 'usando o GET dentro da rota de usuarios'
    // })
});
router.post('/', (req, res, next)=>{
    const user = {
        name: req.body.name,
        age: req.body.age,
        client_code: req.body.client_code,
        type:req.body.type
    }
    res.status(201).send({
        message: 'Usuário cadastrado',
        newUser: user
    })
})
router.post('/', (req, res, next)=>{
    res.status(201).send({
        mensagem: "usando o POST dentro da rota de produtos"
    })
})

router.get('/:id_user', (req, res, next)=>{
    //resgata o id do parametro da rota
    const id = req.params.id_user
    if(id === 'especial'){
        res.status(200).send({
            mensagem: 'voce acessou o id especial'
        })
    }else {
        res.status(200).send({
            mensagem: 'Usando o get em um usuario especifico qualquer',
            id: id
        })
    }
})

router.patch('/:id_user', (req, res, next) => {
    const id = req.params.id_user
    res.status(201).send({
        mensagem: 'Usando o Pacth com id personalizado',
        id: id
    })
})
router.delete('/:id_user', (req, res, next) =>{
    const id = req.params.id_user
    //o status correto é 204, mas este nao permite retorno de mensagem
    res.status(200).send({
        mensagem: `Deletando o usuario com id:${id}`
    })
})

module.exports = router


//dividir as rotas em arquivos separados por verbos
//users_get.js
//user_post.js
//user_path_delete.js