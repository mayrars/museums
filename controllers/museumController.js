const museumService = require("../services/museumService")
const { createMuseumSchema, updateMuseumSchema } = require('../middlewares/validator');
const Museum = require('../models/museumsModel')
const getAllMuseums = async(req, res) => {
    //const allMuseums = museumService.getAllMuseums();
    const {page} = req.query
    const museumsPerPage = 10
    try{
        if(page<=1){
            pageNum = 0
        }else{
            pageNum = page-1
        }
        const result = await Museum.find().sort({createdAt: -1}).skip(pageNum*museumsPerPage).limit(museumsPerPage)
        res.status(200).json({success: true, message: 'Museums', data: result})
    }catch(error){
        console.log(error)
    }
}

const getSingleMuseum = async (req, res) => {
    const {_id} = req.query
    try{
        const singleMuseum = await Museum.findOne({_id})
		if(!singleMuseum){
			return res.status(404).json({success: false, message: 'museum is not find'})
		}
		res.status(200).json({success: true, message: 'Museums ', data: singleMuseum})
    }catch(e){
        console.log(e)
    }
}

const createMuseum = async(req, res) => {
    const { name, address, description, image, latitud, longitud, city, country } = req.body;
    try {
		const { error, value } = createMuseumSchema.validate({
			name, address, description, image, latitud, longitud, city, country
		});
		if (error) {
			return res
				.status(401)
				.json({ success: false, message: error.details[0].message });
		}

		const result = await Museum.create({
			name, address, description, image, latitud, longitud, city, country
		});
        console.log(result)
        result.save()
		res.status(201).json({ success: true, message: 'created', data: result });
	} catch (error) {
		console.log(error);
	}
}

const updateMuseum = async(req, res) => {
    const { name, address, description, image, latitud, longitud, city, country } = req.body;
    const {_id} = req.query
    try{
        const {error, value} = updateMuseumSchema.validate({
            name, address, description, image, latitud, longitud, city, country
        })
        if(error){
            return res.status(401).json({success: false, message: error.details[0].message
            })
        }
        //verify if exists
        const existsMuseum = await Museum.findOne({ _id });
        if(!existsMuseum){
			return res.status(404).json({success: false, message: 'post unavailable'})
		}
        existsMuseum.name = name;
		existsMuseum.address = address;
		existsMuseum.description = description;
		existsMuseum.image = image;
		existsMuseum.latitud = latitud;
		existsMuseum.longitud = longitud;
		existsMuseum.city = city;
		existsMuseum.country = country;
		const result = await existsMuseum.save();
        res.status(200).json({ success: true, message: 'Museum Updated', data: result });
    }catch (error) {
		console.log(error);
	}
}

const deleteMuseum = async(req, res) => {
    const {_id} = req.query
    try {
		const existsMuseum = await Museum.findOne({ _id });
		if(!existsMuseum){
			return res.status(404).json({success: false, message: 'Museums are not find'})
		}
		await Museum.deleteOne({_id})
		res.status(200).json({ success: true, message: 'Museun deleted' });
	} catch (error) {
		console.log(error);
	}
}

module.exports = {
    getAllMuseums,
    getSingleMuseum,
    createMuseum,
    updateMuseum,
    deleteMuseum
}