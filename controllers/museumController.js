const museumService = require("../services/museumService")
const getAllMuseums = (req, res) => {
    const allMuseums = museumService.getAllMuseums();
    res.send("Get all museums")
}

const getSingleMuseum = (req, res) => {
    const singleMuseum = museumService.getSingleMuseum(req.params.id);
    res.send("Get museum")
}

const createMuseum = (req, res) => {
    const cretedMuseum = museumService.createMuseum(req.params.id);
    res.send("Create museum")
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