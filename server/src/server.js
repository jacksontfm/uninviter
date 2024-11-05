const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());

//server start
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
});

//default path
app.get("", (req, res) => {
    res.status(200).send("This is the Uninviter server");
});