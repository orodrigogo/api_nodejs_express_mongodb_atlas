const express = require('express');
const router = express.Router();
const Users = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');


//FUNCOES AUXILIARES
const createUserToken = (userId) => {
    //cria um token com o id do usuario, com uma senha e prazo de expiracao.
    return jwt.sign({ id: userId}, config.jwt_pass , {expiresIn: config.jwt_expires_in })
}


router.get('/', async (requisicao, resposta) => {

    try{
        const users = await Users.find({});
        return resposta.send(users);

    }catch (erro){
        return resposta.status(500).send({ erro: 'Erro na consulta de usuários!'});
    }

});


router.post('/create', async (requisicao, resposta) => {
    const {email, password} = requisicao.body;

    if(!email || !password)
    return resposta.status(400).send({ erro: 'Dados insuficientes!' });

    try{
        if(await Users.findOne({ email }))
        return resposta.status(400).send({ erro: 'Usuário já registrado!' });

        const user = await Users.create(requisicao.body);                      
        //impedir para retornar a senha ao cadastrar.
        user.password = undefined;

        return resposta.status(201).send({user, token: createUserToken(user.id)});
        
    }catch(erro){
        resposta.status(500).send({ erro: 'Erro ao buscar usuário!'});
    }
});


router.post('/auth', async (requisicao, resultado) => {
    const { email, password } = requisicao.body;

    if(!email || !password)
    return resultado.status(400).send({ erro: 'Dados insuficientes!' });

    try{
        const user = await Users.findOne({email}).select('+password');
        if(!user)
        return resultado.status(400).send({ erro: 'Usuário não registrado!' })
                
        const pass_ok = await bcrypt.compare(password, user.password);
        
        if(!pass_ok)
        return resultado.status(401).send({ erro: 'Erro ao autenticar usuário!' })

        user.password = undefined;
        return resultado.send({user, token: createUserToken(user.id)});

    }catch(erro){
        return resultado.status(500).send({ erro: 'Erro ao buscar usuario!' });
    }
});

module.exports = router;



/*

200 - OK
201 - Created
202 - Accepted

400 - Bad request
401 - Não autorizado - autenticacao de carater temporario
403 - autorizacao de caracter permanente
404 - Not found

500 - Erro interno do servidor
501 - Não implementando, ou a API nao suporta essa funcionalidade
503 - Service Unavailable - a API executa essa operacao, mas no momento esta indisponivel

*/