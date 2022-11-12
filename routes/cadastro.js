const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool


router.post('/',(req, res, next) => {
    // const user = {
    //     username: req.body.username,
    //     password: req.body.password
    // };
    mysql.getConnection((error, conn)=>{
        conn.query(
            'INSERT INTO data (id, username, password) VALUES (?,?,?);',
            [req.body.id,req.body.username,req.body.password],
            (error, resultado, field) => {
                conn.release();
                    if(error){
                        return res.status(500).send({
                            error: error,
                            response: null
                        });
                    }

                    res.status(201).send({
                        message:`o usuario ${req.body.username} foi cadastrado com sucesso`
                    })
            }
        )
    }) 

    // res.status(201).send({
    //     message: 'usuário cadastrado',
    //     username: req.body.username
    // })
})

module.exports = router