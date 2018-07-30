
import Handlebars from 'handlebars';

import template from './template.html';

let database;

let recetas = [];

export default (_database) => {
	database = _database;
	recetas = [];
	listarRecetas();
}

const listarRecetas = () => {
	const lista = database
					.ref('/recetas')
					.once("value")
					.then((datos_recetas) => {
						
						datos_recetas.forEach((element) => {
							const datosReceta = element.val();
							datosReceta.id = element.key;
							recetas.push(datosReceta);
						});
						
						render();
					});
}

const render = () => {
	const t = Handlebars.compile(template);
	document.getElementById('main').innerHTML = t({ recetas });
}