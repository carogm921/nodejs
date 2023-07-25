'use strict'

var controller = {

    welcome: function(req, res){
        console.log("Get en la raiz");
        res.send("hola");
    },

    alumnos: function(req, res){
        res.send("listado de alumnos");
    },

    alumno: function(req, res){
        let cal1 = 5;
        let cal2 = 5;
        let cal3 =5;
    
        let final = (cal1 + cal2 + cal3)/3;
    
        console.log(final);

        if(final< 6){
            return res.status(400).json({
                status: 400,
                cal_final: final
            });
        }else{
            return res.status(200).json({
                status: 200,
                cal_final: final
            });
        }

    },

    crear_alumno: (req, res)=>{

        let user_info = req.body;

        console.log(user_info);


        return res.status(200).json({
            status: 200,
            nombre_de_alumno : user_info.nombre + " " + user_info.apellido,
            edad: user_info.edad
        });

    }

}

module.exports = controller;