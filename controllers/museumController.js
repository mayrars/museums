const museumService = require("../services/museumService")
const { createMuseumSchema } = require('../middlewares/validator');
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

const getSingleMuseum = (req, res) => {
    const singleMuseum = museumService.getSingleMuseum(req.params.id);
    res.send("Get museum")
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

		const result = await Museum.createMuseum({
			name, address, description, image, latitud, longitud, city, country
		});
        result.save()
		res.status(201).json({ success: true, message: 'created', data: result });
	} catch (error) {
		console.log(error);
	}
}

const updateMuseum = (req, res) => {
    const updatedMuseum = museumService.updateMuseum(req.params.id);
    res.send("Update museum")
}

const deleteMuseum = (req, res) => {
    museumService.deleteMuseum(req.params.id);
    res.send("Delete museum")
}

module.exports = {
    getAllMuseums,
    getSingleMuseum,
    createMuseum,
    updateMuseum,
    deleteMuseum
}