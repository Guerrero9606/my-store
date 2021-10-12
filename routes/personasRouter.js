const { Router } = require("express");
const express = require("express");
const personasServices = require('./../services/personasServices');

const router = express.Router();
const service = new personasServices();

router.get('/', (req, res) => {
	const personas = service.find();
	res.json(personas)
})

router.get('/:id', (req, res) => {
	const { id } = req.params;
	const persona = service.findOne(id);
	res.json(persona);
})

router.post('/', (req, res) => {
	const body = req.body;
	const newPersona = service.create(body);
	res.status(201).json(newPersona);
});

router.patch('/:id', (req, res) => {
	try {
		const { id } = req.params;
		const body = req.body;
		const persona = service.update(id, body);
		res.json(persona);
	} catch (error) {
		res.status(404),json({
			message: error.message
		})
	}
});

router.delete('/:id', (req, res) => {
	try {
		const { id } = req.params;
		const rta = service.delete(id);
		res.status(500).json(rta);
	} catch (error) {
		res.status(404),json({
			message: error.message
		})
	}
});

module.exports = router;
