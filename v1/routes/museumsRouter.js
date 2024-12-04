const express = require("express")
const router = express.Router()
const museumController = require("../../controllers/museumController")
router
    .get('/',museumController.getAllMuseums)
    .get('/single-museum',museumController.getSingleMuseum)
    .post('/', museumController.createMuseum)
    .put('/update-museum', museumController.updateMuseum)
    .delete('/:id',museumController.deleteMuseum)


module.exports = router