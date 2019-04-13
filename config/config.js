const env = process.env.NODE_ENV || 'dev';

const config = () => {
    switch (env){
        
        case 'dev':
        return{
            bd_string: 'mongodb+srv://usuario_admin:10azx102@clusterapi-lskbf.mongodb.net/test?retryWrites=true',
            jwt_pass: '123',
            jwt_expires_in: '7d'

        }
        
        case 'html':
        return{
            bd_string: 'mongodb+srv://usuario_admin:10azx102@clusterapi-lskbf.mongodb.net/test?retryWrites=true'
        }

        case 'prod':
        return{
            bd_string: 'mongodb+srv://usuario_admin:10azx102@clusterapi-lskbf.mongodb.net/test?retryWrites=true'
        }
    }
}

console.log(`Iniciando a API em ambiente ${env.toUpperCase()}`);

module.exports = config();