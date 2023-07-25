'use strict'

const express = require ('express');
const api = express.Router();
const { body } = require('express-validator');


var WelcomeController = require('../controllers/welcome');
var AlumnosController = require('../controllers/alumnos');
let AuthController = require('../controllers/auth');

let userProtectUrl = require('../middlewares/authUser').userProtectUrl;

api.get ("/", WelcomeController.welcome);

api.get ("/alumnos", AlumnosController.alumnos);

api.get ("/alumno/:n_cuenta", AlumnosController.alumno);

api.post ("/alumno",userProtectUrl,[
    body('n_cuenta').not().isEmpty(),
    body('nombre').not().isEmpty(),
    body('edad').not().isEmpty(),
    body('genero').not().isEmpty()
], AlumnosController.crear_alumno);

api.put ("/alumno/:n_cuenta", [
    body('nombre').not().isEmpty(),
    body('edad').not().isEmpty(),
    body('genero').not().isEmpty()
],AlumnosController.update_alumno);

api.delete ("/alumno/:n_cuenta", AlumnosController.delete_alumno);

api.post("/login",[
    body('email').not().isEmpty(),
    body('pass').not().isEmpty()
], AuthController.login);

api.post("/logout",userProtectUrl, AuthController.logout);

module.exports = api;