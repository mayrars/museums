const express = require("express");
const v1MuseumsRouter = require("./v1/routes/museumsRouter");

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/api/v1/museums", v1MuseumsRouter);
app.listen(PORT), () => {
    console.log('listen...')
}