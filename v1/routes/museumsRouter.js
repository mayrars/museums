const express = require("express")
const router = express.Router()
const museumController = require("../../controllers/museumController")
router
    .get('/',museumController.getAllMuseums)
    .get('/:id',museumController.getSingleMuseum)
    .post('/:id', museumController.createMuseum)
    .put('/:id', museumController.updateMuseum)
    .delete('/:id',museumController.deleteMuseum)


module.exports = router