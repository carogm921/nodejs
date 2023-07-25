const express = require ('express');
const app = express();
const port =3821 ;

app.get ("/", (req, res)=>{
    console.log("Get ejecutado en la raiz");
    res.send("hello motto");
});

app.get ("/alumnos", (req, res)=>{
    res.send("Mi listado de alumnos");
});

app.get ("/alumno", (req, res)=>{
    let cal1 = 10;
    let cal2 = 8;
    let cal3 =8;

    let final = (cal1 + cal2 + cal3)/3;

    console.log(final);
    res.send("La calificacion final es: "+ final);

});

app.post ("/alumno", (req, res)=>{
    res.send("Creamos un alumno");
});

app.put ("/alumno", (req, res)=>{
    res.send("Actualizamos un alumno");
});

app.delete ("/alumno", (req, res)=>{
    res.send("Eliminamos un alumno");
});

app.listen (port, ()=>{
    console.log("Servidor ejecutando en ", +port);
});