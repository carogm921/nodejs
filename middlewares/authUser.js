'use strict'

const jwt = require ('jsonwebtoken');

let Sessions = require ('../models/sessions') ;

const middlewares = {
    userProtectUrl : function(req, res, next){

        const token = req.headers['access-token'];

        if(token){

            jwt.verify(token,'iAxq0JYUt1VdQgo95eGumWYYWUWaibDk2LTzsYZiknMCH6Ty2W',(err,decoded) => {
                if(err){
                    return res.status(403).json({message: " Token invalida. "});
                }else{
                    req.decoded = decoded;

                    Sessions.findOne({user_id: req.decoded.user_id, jwt:token}).exec((err, sessions)=>{
                        if(err) return req.status(500).send({message:"Error al devolver los datos"});
                        if(!sessions) return req.status(404).send({message:"Los datos de autenticacion no son validos."})
                        next();
                    });
                }
            })

        }
        else{
            req.status(403).send({
                message : "token no valida."
            })
        }

    }
}

module.exports = middlewares;