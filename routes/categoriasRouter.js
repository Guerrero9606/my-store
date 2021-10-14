const { Router } = require("express");
const express = require("express");
const categoriasServices = require('./../services/categoriasServices');
const validatorHandler = require('./../middlewares/validator.handler');
const { createCategoriasSchema, updateCategoriasSchema, getCategoriasSchema } = require('./../schemas/categorias.schema');

const router = express.Router();
const service = new categoriasServices();

router.get('/', async (req, res, next) => {
	try {
		const categorias = await service.find();
		res.status(200).json(categorias);
	} catch (error) {
		next(error);
	}
});

router.get('/:id',
	validatorHandler(getCategoriasSchema, 'params'),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const categoria = await service.findOne(id);
			res.json(categoria);
		} catch (error) {
			next(error);
		}
	});

router.post('/',
	validatorHandler(createCategoriasSchema, 'body'),
	async (req, res, next) => {
		try {
			const body = req.body;
			const newCategoria = await service.create(body);
			res.status(201).json(newCategoria);
		} catch (error) {
			next(error);
		}
	});

router.patch('/:id',
	validatorHandler(getCategoriasSchema, 'params'),
	validatorHandler(updateCategoriasSchema, 'body'),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const body = req.body;
			const categoria = await service.update(id, body);
			res.json(categoria);
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
