const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const templatesController = require('./controllers/templates_controller.js');

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(morgan('dev'));

//server start
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
});

//default path
app.get("/", (req, res) => {
    res.status(200).send("This is the Uninviter server");
});

//templates
app.get("/templates", templatesController.getTemplates);
app.post("/templates", templatesController.createTemplate);
app.patch("/templates", templatesController.editTemplate);
app.delete("/templates", templatesController.deleteTemplate);