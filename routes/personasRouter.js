const { Router } = require("express");
const express = require("express");
const personasServices = require('./../services/personasServices');

const router = express.Router();
const service = new personasServices();

router.get('/', async (req, res, next) => {
	try {
		const personas = await service.find();
		res.json(personas)
	} catch (error) {
		next(error);
	}
})

router.get('/:id', async (req, res, next) => {
	try {
		const { id } = req.params;
		const persona = await service.findOne(id);
		res.status(200).json(persona);
	} catch (error) {
		next(error);
	}
})

router.post('/', async (req, res, next) => {
	try {
		const body = req.body;
		const newPersona = await service.create(body);
		res.status(201).json(newPersona);
	} catch (error) {
		next(error);
	}
});

router.patch('/:id', async (req, res, next) => {
	try {
		const { id } = req.params;
		const body = req.body;
		const persona = await service.update(id, body);
		res.json(persona);
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
