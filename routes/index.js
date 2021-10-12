const express = require('express');
const productosRouter = require('./productosRouter');
const personasRouter = require('./personasRouter');
const categoriasRouter = require('./categoriasRouter');

function routerApi(app) {
	const router = express.Router();
	app.use('/api/v1', router);
	router.use('/productos', productosRouter);
	router.use('/personas', personasRouter);
	router.use('/categorias', categoriasRouter);
}

module.exports = routerApi;
