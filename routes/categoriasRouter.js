const { Router } = require("express");
const express = require("express");
const categoriasServices = require('./../services/categoriasServices');

const router = express.Router();
const service = new categoriasServices();

router.get('/', (req, res) => {
	const categorias = service.find();
	res.status(200).json(categorias);
})

router.get('/:id', (req, res) => {
	const { id } = req.params;
	const categoria = service.findOne(id);
	res.json(categoria)
})

router.post('/', (req, res) => {
	const body = req.body;
	const newCategoria = service.create(body);
	res.status(201).json(newCategoria);
});

router.patch('/:id', (req, res) => {
	try {
		const { id } = req.params;
		const body = req.body;
		const categoria = service.update(id, body);
		res.json(categoria);
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
