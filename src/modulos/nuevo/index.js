

import Handlebars from 'handlebars';
import { guid } from '../../utils';

import template from './template.html';

import firebase from 'firebase';


let mensaje = '';

let database;


// Obtener Elementos
let uploader;
let fileButton; 

let storageRef;
let downloadURL; 
let porcentaje;

let _firebase;
let _database;

export default (_database) => {
  database = _database;
  render();
};


const crearNuevaReceta = (e) => {

  e.preventDefault();

  const receta = {
    id: guid(),
    foto: downloadURL,
    nombre: document.getElementById('nombre').value,
    tipo: document.getElementById('tipo').value,
    clase: document.getElementById('clase').value,
    receta: document.getElementById('receta').value,
  };
console.log(receta);
  database.ref(`recetas/${receta.id}`).set({
    foto: receta.foto,
    nombre: receta.nombre,
    tipo: receta.tipo,
    clase: receta.clase,
    receta: receta.receta,
  })
  .then(() => {
    mensaje = 'Receta creada correctamente!';
    render();
  });

  return false;
};

const render = () => {
	const t = Handlebars.compile(template);
	document.getElementById('main').innerHTML = t({mensaje});
  document.getElementById('boton-nuevo').onclick = crearNuevaReceta;
  createUploader();
}


const createUploader = () => {
  uploader = document.getElementById('uploader');
  fileButton = document.getElementById('fileButton');

  // Vigilar selección archivo
  fileButton.addEventListener('change', function(e) {
  //Obtener archivo
  var file = e.target.files[0];
  // Crear un storage ref
  storageRef = firebase.storage().ref('fotos_recetas/' + file.name);

  // Subir archivo
  var task = storageRef.put(file);
  // Actualizar barra progreso
  task.on('state_changed',
	function progress(snapshot) {
	  var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    // uploader.value = percentage;
    $('#porcentaje')
    .css("width", percentage + "%")
    .attr("aria-valuenow", percentage)
    .text(Math.round(percentage) + "% Complete");
	},
	function error(err) {
    alert("ERROR AL SUBIR IMAGEN")
	},
	function complete() {

    console.log(storageRef.getDownloadURL().then(function(url){
      downloadURL = url; 
    }));
    console.log(file);
    
	}
	)
});


}
