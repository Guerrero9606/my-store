const { Router } = require("express");
const express = require("express");
const productosServices = require('./../services/productosServices');
const validatorHandler = require('./../middlewares/validator.handler');
const { createProductosSchema, updateProductosSchema, getProductosSchema } = require('./../schemas/productos.schema');

const router = express.Router();
const service = new productosServices();

router.get('/', async (req, res, next) => {
	try {
		const productos = await service.find();
		res.status(200).json(productos);
	} catch (error) {
		next(error);
	}
});

router.get('/:id',
	validatorHandler(getProductosSchema, 'params'),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const producto = await service.findOne(id);
			res.json(producto);
		} catch (error) {
			next(error);
		}
	}
);

router.post('/',
	validatorHandler(createProductosSchema, 'body'),
	async (req, res, next) => {
		try {
			const body = req.body;
			const newProducto = await service.create(body);
			res.status(201).json(newProducto);
		} catch (error) {
			next(error);
		}
	});

router.patch('/:id',
	validatorHandler(getProductosSchema, 'params'),
	validatorHandler(updateProductosSchema, 'body'),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const body = req.body;
			const producto = await service.update(id, body);
			res.json(producto);
		} catch (error) {
			next(error);
		}
	});

router.delete('/:id', async (req, res, next) => {
	try {
		const { id } = req.params;
		const rta = await service.delete(id);
		res.status(500).json(rta);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
