'use strict'

const { validationResult } = require ('express-validator');

var Alumnos = require('../models/alumnos');

var controller = {
    alumnos:  function(req,res){

        Alumnos.find({}).exec((err,alumnos) => {
            if(err) return res.status(500).json({status:500, mensaje: err });
            if(!alumnos) return res.status(200).json({status:200,mensaje: "No hay alumnos por listar" });
                
            return res.status(200).json({
                    status:200,
                    data: alumnos
            });
            //console.log(alumnos);
        });  
    },

    alumno : function(req,res){
        let n_cuenta = req.params.n_cuenta;
        
        Alumnos.findOne({n_cuenta:n_cuenta}).exec((err,alumno) => {
            if(err) return res.status(500).json({status:500, mensaje: err });
            if(!alumno) return res.status(200).json({status:200,mensaje: "No se encontro alumno" });
                
            return res.status(200).json({
                    status:200,
                    data: alumno
            });
        });  

    },

    crear_alumno : function(req,res){     
        const errors =validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }

        let user_info = req.body;

        Alumnos.findOne({n_cuenta:user_info.n_cuenta}).exec((err,alumno) => {
            if(err) return res.status(500).json({status:500, mensaje: err });

            if(alumno) return res.status(200).json({status:200, mensaje: "Id ya existente" });
                            
            let alumnos_model = new Alumno();
            alumnos_model.n_cuenta = user_info.n_cuenta;
            alumnos_model.nombre = users_info.nombre;
            alumnos_model.edad = users_info.edad;
            alumnos_model.genero = users_info.genero;

            alumnos_model.save((err,alumnoStored) => {
                if(err) return req.status(500).json({status: 500, mensaje: err});
                if(!alumnoStored) return req.status(200).json({status: 200, mensaje: 'No se logró almacenar el usuario'});
            });
            
            return res.status(200).json({
                status: 200,
                menssage: 'guardado'
            });
                
        });      
    },

    update_alumno: function(req,res){
        const errors =validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        let n_cuenta = req.params.n_cuenta;
        let user_info = req.body;
        let alumno_info_update = {
            nombre: user_info.nombre,
            edad: user_info.edad,
            genero: user_info.genero
        };
        
        Alumnos.findOneAndUpdate({n_cuenta: n_cuenta},alumno_info_update,{new:true},(err,alumnoUpdate) =>{
            if(err) return req.status(500).json({status: 500, message: 'error al actualizar'});
            if(!alumnoUpdate) return req.status(404).json({status: 200, message: 'No existe alumno'});
            console.log(alumnoUpdate);
                return res.status(200).json({
                    nombre: alumnoUpdate.nombre,
                    edad: alumnoUpdate.edad,
                    genero: alumnoUpdate.genero
                })
        });
    },

    delete_alumno: function(req,res){
        let n_cuenta = req.params.n_cuenta;
        Alumnos.findOneAndRemove({n_cuenta: n_cuenta},(err,alumnoDelete) =>{
            if(err) return req.status(500).json({status: 500, message: 'error al eliminar'});
            if(!alumnoUpdate) return req.status(404).json({status: 200, message: 'No existe alumno'});
            return res.status(200).json({
                message: 'eliminado'
            })
        });
    }

};

module.exports = controller; 