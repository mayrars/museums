const express = require("express");
const v1Router = require("./v1/routes");

const app = express();

app.use("/api/v1", v1Router)

app.listen(process.env.PORT || 3000), () => {
    console.log('listen...')
}