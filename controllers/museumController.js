const museumService = require("../services/museumService")
const { createMuseumSchema, updateMuseumSchema } = require('../middlewares/validator');
const Museum = require('../models/museumsModel')
const getAllMuseums = async(req, res) => {
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

const getSearchMuseum = async (req, res) => {
    try{
        const query = req.query.q || '';
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const filter = {
            name: req.query.name,
            address: req.query.address,
            description: req.query.description,
            country: req.query.country,
            city: req.query.city
        }
        const searchData = {}
        if(query){
            searchData.$text = {$search: query}
        }
        //Apply filters
        if(filter.name) searchData.name = {$regex: filter.name, $options: 'i'};
        if(filter.address) searchData.address = {$regex: filter.address, $options: 'i'};
        if(filter.description) searchData.description = {$regex: filter.description, $options: 'i'};
        if(filter.country) searchData.country = {$regex: filter.country, $options: 'i'};
        if(filter.city) searchData.city = {$regex: filter.city, $options: 'i'};

        const museums = await Museum.find(searchData)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
        const totalMuseums = await Museum.countDocuments(searchData);
        res.status(200).json({
            success: true,
            message: 'Museums found',
            data: museums,
            total: totalMuseums,
            page,
            limit
        })

    }catch(error){
        console.log(error)
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
    getSearchMuseum,
    createMuseum,
    updateMuseum,
    deleteMuseum
}