
const express = require('express')
const cors = require('cors')
const http = require('http')
const https = require('https')


class Server {
    constructor(){
        this.paths = {
            auth :      '/api/auth',
            usuarios:   '/api/usuarios',
            productos: '/api/productos'
        }
       
        this.app = express()
        this.port = process.env.PORT 
        this.middlewares()
        this.routes()

       

        

    }
    
    middlewares(){
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.static('public'));
    }
    
    routes(){
        this.app.use(this.paths.usuarios,require('../routes/usuarios'))
        this.app.use(this.paths.auth,require('../routes/auth'))
       this.app.use(this.paths.productos,require('../routes/productos'))    
    }
    listen() {
        const server = process.env.ENVIROMENT === 'local' ?
          http.createServer(this.app) : https.createServer({
            key: fs.readFileSync('/home/api/ssl/quimica.unam.mx.key'),
            cert: fs.readFileSync('/home/api/ssl/quimica.unam.mx.cer')
          }, this.app);
        server.listen(this.port);
        server.on('error', (error) => {
          console.log('Error al crear server', error);
          process.exit(1);
        });
        server.on('listening', () => {
          console.log('Api listen on port', this.port, `(${process.env.ENVIROMENT})`);
        });
      }

    

}

module.exports = Server