const express = require("express");
const app = express();
const port = 3000;


const hbs = require("express-handlebars");

app.engine("handlebars", hbs.engine());
app.set("view engine", "handlebars");
//app.set("views", path.join(__dirname, "views"));
// the path module is used to work with file and directory paths
const path = require("path");

//setup db connection
const mongoose = require("mongoose");
const { title } = require("process");
// create schemas
const destinationSchema = new mongoose.Schema({
  page: String,
  name: String,
  description: String,
  image: String,
});

// Activities schema for things to do in each destination
const activitySchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  cost: Number,
  destination: { type: mongoose.Schema.Types.ObjectId, ref: "destination" },
});


const Destination = mongoose.model("destinations", destinationSchema);
const Activity = mongoose.model("activities", activitySchema);


async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/travelsite");
}
main().catch((err) => console.log(err));

// Serving static files
app.use(express.static(path.join(__dirname, "static")));
// Parse the body of incoming requests with urlencoded payloads and is based on body-parser.
app.use(express.urlencoded({ extended: true }));
// data

// generate routes
app.get("/", (req, res) => {
  // Homepage route
  res.render("home", { title: "Welcome to Travel Site" });
});

// generate routes to populate destinations page
app.post("/destinations", async (req, res) => {


  // code to add a new destination to the database
  const { page, name, description, image } = req.body;
  console.log(req.body);
  const newDestination = new Destination({
    page,
    name,
    description,
    image,
  });
  await newDestination.save();


  //res.redirect("/destinations");
  res.send("Destination added successfully");
});


// generate routes to display destinations page
app.get("/destinations", async (req, res) => {


  // code to fetch destinations from the database and render the destinations page
  const destinations = await Destination.find().lean();
  res.render("destinations", {
    destinations: destinations,
    title: "Destinations",
  });
});

// Get a specific destination by _id 
app.get("/destinations/:id", async (req, res) => {
  const { id } = req.params;
  const destination = await Destination.findById(id).lean();
  const activities = await Activity.find({ destination: id }).lean();
  res.render("details", { 
    destination: destination, 
    title: destination.name,
    activities: activities, 
  });
});



// activities routes
app.post("/activities", async (req, res) => {
  const { name, description, image, cost, destination } = req.body;
  const newActivity = new Activity({
    name,
    description,
    image,
    cost,
    destination,
  });
  await newActivity.save();
  res.send("Activity added successfully");
});

// start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
