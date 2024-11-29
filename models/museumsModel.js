const mongoose = require("mongoose")
const museumSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
        trim: true,
    },
    description:{
        type: String,
        required: [true, 'Description is required'],
        trim: true,
    },
    image: {
        type: String,
        trim: true,
    },
    latitud:{
        type: Number
    },
    longitud:{
        type: Number
    },
    city:{
        type: String,
        trim: true,
    },
    country:{
        type: String,
        trim: true,
    }
},
{
    timestamps: true,
})

module.exports = mongoose.model('Museum', museumSchema)