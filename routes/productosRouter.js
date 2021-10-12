const { Router, json } = require("express");
const express = require("express");
const productosServices = require('./../services/productosServices');

const router = express.Router();
const service = new productosServices();

router.get('/', async (req, res) => {
	const productos = await service.find();
	res.status(200).json(productos);
});

router.get('/:id', async (req, res) => {
	const { id } = req.params;
	const producto = await service.findOne(id);
	res.json(producto);
}
);

router.post('/', async (req, res) => {
	const body = req.body;
	const newProducto = await service.create(body);
	res.status(201).json(newProducto);
});

router.patch('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const body = req.body;
		const producto = await service.update(id, body);
		res.json(producto);
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
