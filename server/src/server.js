const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const templatesController = require('./controllers/templates_controller.js');
const usersController = require('./controllers/users_controller.js');
const guestsController = require('./controllers/guests_controller.js');

const app = express();
const PORT = process.env.PORT;

//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

//server start
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
});

//default path
app.get("/", (req, res) => {
    res.status(200).send("This is the Uninviter server");
});

//users
app.post("/users", usersController.getUser);
app.delete("/users", usersController.deleteUser);

//guests
app.get("/guests", guestsController.getGuests);
app.post("/guests", guestsController.addGuest);
app.delete("/guests", guestsController.deleteGuest);

//templates
app.get("/templates", templatesController.getTemplates);
app.post("/templates", templatesController.createTemplate);
app.patch("/templates", templatesController.editTemplate);
app.delete("/templates", templatesController.deleteTemplate);
