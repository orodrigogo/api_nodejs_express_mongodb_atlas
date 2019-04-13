const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/', auth, (requisicao, resposta) => {
    console.log(resposta.locals.auth_data);
    return resposta.send({ mensagem: 'Tudo ok com o método GET da raiz!'}); 
});

router.post('/', (requisicao, resposta) => {
    return resposta.send({ mensagem: 'Tudo ok com o método POST da raiz!'}); 
});


module.exports = router;