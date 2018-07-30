

import Handlebars from 'handlebars';
import { guid } from '../../utils';

import template from './template.html';

let mensaje = '';

let database;

export default (_database) => {
  database = _database;
  render();
};

const crearNuevaReceta = (e) => {

  e.preventDefault();

  const receta = {
    id: guid(),
    foto: document.getElementById('foto').value,
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
}