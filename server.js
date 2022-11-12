const http = require('http');
const app = require('./app');
const port = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(port);

//quando chamamos o server ele chama o app e inicia o serviço
//cada rota funciona a medida que é chamada dentro da url do client