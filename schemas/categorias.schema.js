const joi = require('joi');

const id = joi.string().uuid();
const categoria = joi.string().min(3).max(15);

const createCategoriasSchema = joi.object({
	categoria: categoria.required(),
});

const updateCategoriasSchema = joi.object({
	categoria: categoria,
});

const getCategoriasSchema = joi.object({
	id: id.required()
});

module.exports = { createCategoriasSchema, updateCategoriasSchema, getCategoriasSchema };
