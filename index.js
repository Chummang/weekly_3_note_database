// NPM installed modules
const express = require("express");
const app = express();

const basicAuth = require("express-basic-auth");
const { create } = require("express-handlebars");

const knexFile = require("./knexfile").development;
const knex = require("knex")(knexFile);

//Set up port number
const port = 3000;

// Get all user generated modules into the application

const AuthChallenger = require("./AuthChallenger");
const NoteService = require("./Service/NoteService");
const NoteRouter = require("./Router/NoteRouter");

//The code below returns the current year
const hbs = create({
  helpers: {
    year() {
      return new Date().getFullYear();
    },
  },
});

// Set up handlebars as our view engine - handlebars will responsible for rendering our HTML
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Serves the public directory to the root of our server
app.use(express.static("public"));

// Set up middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Set up basic auth
app.use(
  basicAuth({
    authorizeAsync: true,
    authorizer: AuthChallenger(knex), // we are defining the file where our users exist with this code. We also parse the data so that we can iterate over each user like a JavaScript variable/object.
    challenge: true,
  })
);

// Create a new instance of noteService and pass the file path/to/the/file where you want the service to read from and write to.
const noteService = new NoteService(knex);

// Responsible for sending our index page back to our user.
app.get("/", (req, res) => {
  noteService.list(req.auth.user).then((data) => {
    res.render("index", {
      user: req.auth.user,
      notes: data,
    });
  });
});

// Set up the NoteRouter - handle the requests and responses in the note, read from a file and return the actual data, get the note from your JSON file and return to the clients browser.
app.use("/api/notes", new NoteRouter(noteService, express).router()); //sending our data

module.exports = app;

// Set up the port that we are going to run the application on, therefore the port that we can view the application from our browser.
app.listen(port, () =>
  console.log(`Note Taking application listening to port ${port}`)
);
