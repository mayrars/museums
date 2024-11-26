const getAllMuseums = (req, res) => {
    res.send("Get all museums")
}

const getSingleMuseum = (req, res) => {
    res.send("Get museum")
}

const createMuseum = (req, res) => {
    res.send("Create museum")
}

const updateMuseum = (req, res) => {
    res.send("Update museum")
}

const deleteMuseum = (req, res) => {
    res.send("Delete museum")
}

module.exports = {
    getAllMuseums,
    getSingleMuseum,
    createMuseum,
    updateMuseum,
    deleteMuseum
}