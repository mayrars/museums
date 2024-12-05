const Joi = require('joi');
exports.createMuseumSchema = Joi.object({
	name: Joi.string()
		.min(6)
		.max(60)
		.required(),
	address: Joi.string()
		.min(6)
		.max(600)
		.required(),
	description: Joi.string()
		.min(6)
		.max(600)
		.required()	,
    image: Joi.string()
		.min(6)
		.max(600),
    latitud: Joi.number()
		.min(-90)
		.max(90),
    longitud: Joi.number()
		.min(-180)
		.max(180),
    city: Joi.string()
		.min(4)
		.required(),
    country: Joi.string()
		.min(4)
		.required()
})

exports.updateMuseumSchema = Joi.object({
	name: Joi.string()
		.min(6)
		.max(60)
		.required(),
	address: Joi.string()
		.min(6)
		.max(600)
		.required(),
	description: Joi.string()
		.min(6)
		.max(600)
		.required()	,
    image: Joi.string()
		.min(6)
		.max(600),
    latitud: Joi.number()
		.min(-90)
		.max(90),
    longitud: Joi.number()
		.min(-180)
		.max(180),
    city: Joi.string()
		.min(4)
		.required(),
    country: Joi.string()
		.min(4)
		.required()
})