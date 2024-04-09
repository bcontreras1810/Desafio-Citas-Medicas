//importo dependencias necesarias
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import chalk from 'chalk';
import moment from "moment";
import _ from 'lodash';
import express from 'express';

//creo una instancia express
const app = express();

//creo un arreglo para almacenar paciente
const pacientes = [];

//realizo la consulta a la API
axios
.get("https://randomuser.me/api/?results=11")
.then((response) => {
    //proceso los datos de usuarios 
     response.data.results.forEach((usuario) => {
        const paciente = 
            " Nombre:" +  usuario.name.first + " Apellido:" + usuario.name.last + " Genero:" + usuario.gender + " ID:" + uuidv4() + " Timestamp" +moment().format('MMMM Do YYYY, h:mm:ss a')
        pacientes.push(paciente);
    });
    // Paso 5: Imprimir por consola el objeto “consulta” con colores
    console.log(chalk.blue.bgWhite('LISTA DE USUARIOS:') + chalk.blue.bgWhite (pacientes));

})
// En el catch capturar e imprimir un error de consulta en caso de existir.
.catch((e) => {
    console.log(e);
});

app.get("/:usuarios",  (req, res) => {
    const pacientesPorGenero = _.groupBy(pacientes, (paciente) => {
        const datosPaciente = paciente.split (' ')
        return datosPaciente[3]
    });
  res.json(pacientesPorGenero);

});

app.listen(3000, () => {
    console.log("El servidor está inicializado en el puerto 3000");
});

//Middleware de error.
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('!Se ha producido un error!');
});

