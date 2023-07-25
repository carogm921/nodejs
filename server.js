'use strict'

const mongoose = require('mongoose');
const app = require('./app');
const port = 3821 ;


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/curso', { useNewUrlParser: true, useUnifiedTopology: true })

                .then(()=>{
                        console.log('conexion a la base de datos establecida con exito');

                         //Creando el servidor
                        var server = app.listen(port, () =>{
                        console.log("Servidor corriendo correctamente en la url: http://localhost: "+port)
                        });
            
                })
                .catch(err => console.log(err))
                
            
                

          


