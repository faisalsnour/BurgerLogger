const express = require("express");
const exphbs = require("express-handlebars");
const orm = require( './app/orm' );

const app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
const PORT = process.env.PORT || 3000;

// Use the express.static middleware to serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// Serve index.handlebars to the root route.
app.get("/", async function(req, res) {
  const data = await orm.selectAll();
  console.log(data)
  res.render("index", { burgers: data });
});



// Show the user the individual quote and the form to update the quote.
// app.get("/:id", async function(req, res) {
//   const quoteId = req.params.id;
//   const data = await orm.getQuotes( quoteId );
//   res.render("single-quote", data[0]);
// });

//== ENDPOINTS =======================================================
app.post("/api/add", async function(req, res) {
  const burgerName = req.body.burger_name;
  const result = await orm.insertOne(burgerName );
//   console.log( `[POST added quote] (author: ${author}, quote: ${quote}) resultId=${result.insertId}` );
  res.send( { id: result.id });
});

app.put("/api/update/:id", async function(req, res){
  const burgerID = req.params.id
  const result = await orm.updateOne(burgerID)
  console.log("row has been updated")
  res.send({message: `Updated row`})
}
)

// app.delete("/api/quotes/:id", async function(req, res) {
//   const quoteId = req.params.id
//   console.log( `[DELETE deleted quote] quoteId(${quoteId})` )
//   const result = await orm.deleteQuote( quoteId )
//   console.log( ` .. result`, result.affectedRows )
//   if (result.affectedRows === 0) {
//       // If no rows were changed, then the ID must not exist, so 404
//       return res.status(404).send({ message: "Unknown quote to delete" })
//   }
//   res.send({ message: `Deleted row` })
// })

// Update a quote by an id and then redirect to the root route.
// app.put("/api/quotes/:id", async function(req, res) {
//   const quoteData = req.body
//   const quoteId = req.params.id
//   console.log( `[PUT] /api/quotes/${quoteId} called` )
//   const result = await orm.updateQuote( quoteId, quoteData )
//   console.log( ` ... affectedRows(${result.affectedRows})` )
//   if (result.affectedRows === 0) {
//     return res.status(404).send({ message: "Unknown quote to update" })
//   }
//   res.send({ message: `Updated row` })
// })



// get the unhandled rejection and throw it to another fallback handler we already have.
// process.on('unhandledRejection', function (error){
//   console.log( `unhandledRejection exception: `, error )
// });  
// process.on('uncaughtException', function (error){
//   console.log( `unCaught exception: `, error )
// });

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  console.log( `Server listening on: http://localhost:${PORT}` );
});
