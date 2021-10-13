const { Router } = require("express");
const express = require("express");
const categoriasServices = require('./../services/categoriasServices');

const router = express.Router();
const service = new categoriasServices();

router.get('/', async (req, res) => {
	const categorias = await service.find();
	res.status(200).json(categorias);
})

router.get('/:id', async (req, res) => {
	const { id } = req.params;
	const categoria = await service.findOne(id);
	res.json(categoria)
})

router.post('/', async (req, res) => {
	const body = req.body;
	const newCategoria = await service.create(body);
	res.status(201).json(newCategoria);
});

router.patch('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const body = req.body;
		const categoria = await service.update(id, body);
		res.json(categoria);
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
