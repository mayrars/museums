const express = require("express")
const router = express.Router()
const museumController = require("../../controllers/museumController")
router
    .get('/',museumController.getAllMuseums)
    .get('/single-museum',museumController.getSingleMuseum)
    .post('/', museumController.createMuseum)
    .put('/update-museum', museumController.updateMuseum)
    .delete('/delete-museum',museumController.deleteMuseum)
    .get('/search-museum',museumController.searchMuseum)


module.exports = router