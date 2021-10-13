const { Router } = require("express");
const express = require("express");
const personasServices = require('./../services/personasServices');

const router = express.Router();
const service = new personasServices();

router.get('/', async (req, res) => {
	const personas = await service.find();
	res.json(personas)
})

router.get('/:id', async (req, res) => {
	const { id } = req.params;
	const persona = await service.findOne(id);
	res.json(persona);
})

router.post('/', async (req, res) => {
	const body = req.body;
	const newPersona = await service.create(body);
	res.status(201).json(newPersona);
});

router.patch('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const body = req.body;
		const persona = await service.update(id, body);
		res.json(persona);
	} catch (error) {
		res.status(404),json({
			message: error.message
		})
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const rta = await service.delete(id);
		res.status(500).json(rta);
	} catch (error) {
		res.status(404),json({
			message: error.message
		})
	}
});

module.exports = router;
