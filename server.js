const express = require("express");
const exphbs = require("express-handlebars");
const orm = require( './config/orm' );

const app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
const PORT = process.env.PORT || 3000;

// The express.static middleware to serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// Serve index.handlebars to the root route.
app.get("/", async function(req, res) {
  const data = await orm.selectAll();
  // console.log(data)
  res.render("index", { burgers: data });
});

// To add new burger into the database

app.post("/api/add", async function(req, res) {
  const burgerName = req.body.burger_name;
  const result = await orm.insertOne(burgerName );
  res.send( { id: result.id });
});

// To update devour value of a burger when a button is clicked

app.put("/api/update/:id", async function(req, res){
  const burgerID = req.params.id
  const result = await orm.updateOne(burgerID)
  console.log("row has been updated")
  res.send({message: `Updated row`})
});

// To start the server so that it begins listening to client requests.
app.listen(PORT, function() {
  console.log( `Server listening on: http://localhost:${PORT}` );
});
