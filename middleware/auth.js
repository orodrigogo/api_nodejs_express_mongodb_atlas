const jwt = require('jsonwebtoken');
const config = require('../config/config');

const auth = (requisicao, resposta, next) => {
    const token_header = requisicao.headers.auth;

    if(!token_header)
    return resposta.status(401).send({ erro: 'Autenticação recusada!'});

    jwt.verify(token_header, config.jwt_pass, (erro, decoded) => {
        if(erro)
        return resposta.status(401).send({ erro: 'Token inválido!'});

        resposta.locals.auth_data = decoded;

        return next();
    });

}

module.exports = auth;