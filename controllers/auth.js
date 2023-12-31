'use strict'
const jwt = require('jsonwebtoken')
const{validationResult}= require('express-validator');

var Usuarios = require('../models/usuarios');
var Sessions = require('../models/sessions');

var controller = {
    login:  function(req,res){
        const errors =validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        
        let login_info = req.body;
        Usuarios.findOne({mail:login_info.mail, pass:login_info.pass}).exec((err,usuario) => {
            if(err) return res.status(500).json({status:500,mensaje: err });
            if(!usuario) return res.status(200).json({status:200, mensaje: "Los datos no son válidos" });

            const payload = {
                user_id : usuario.id
            };
            const access_token = jwt.sign(payload,'iAxq0JYUt1VdQgo95eGumWYYWUWaibDk2LTzsYZiknMCH6Ty2W',{
                expiresIn: '1d'
            });
            
            //console.log(access_token);
            let update ={
                user_id : usuario.id,
                jwt : access_token
            }

            Sessions.findOneAndUpdate({user_id : usuario.id},update,{upsert:true , new:true},(err, sessionsUpdate)=>{
                if(err) return res.status(500).send({message:err});

                if (!sessionsUpdate) return res.status(404).send({message:"Datos incorrectos."})

                return res.status(200).json({
                    status:200,
                    message: 'Autenticación correcta',
                    token: access_token
                });

            });

        });
   
        
    },
    
    logout:  function(req,res){

        console.log(req.decoded);
        Sessions.findOneAndRemove({user_id: req.decoded.user_id},(err, sessionDeleted)=>{
            if(err) return res.status(500).send({message:err});
            if(!sessionDeleted) return res.status(404).send({message:"Datos incorrectos."});

            return res.status(200).send({
                message:"Usuario válido"
            })
        })        

    }

};

module.exports = controller;