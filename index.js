const express = require("express");
const cors = require('cors');
const v1MuseumsRouter = require("./v1/routes/museumsRouter");
const mongose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
mongose.connect(process.env.MONGO_URI).then(() => {
    console.log('connected to db')
}).catch((err) => {
    console.log(err)
})

app.use("/api/v1/museums", v1MuseumsRouter);
app.listen(PORT), () => {
    console.log('listen...')
}