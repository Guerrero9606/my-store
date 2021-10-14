const joi = require('joi');

const id = joi.string().uuid();
const firstname = joi.string().min(3).max(15);
const lastname = joi.string().min(3).max(15);
const type = joi.string().min(3).max(15);

const createPersonasSchema = joi.object({
	firstname: firstname.required(),
	lastname: lastname.required(),
	type: type.required()
});

const updatePersonasSchema = joi.object({
	firstname: firstname,
	lastname: lastname,
	type: type
});

const getPersonasSchema = joi.object({
	id: id.required()
});

module.exports = { createPersonasSchema, updatePersonasSchema, getPersonasSchema };
