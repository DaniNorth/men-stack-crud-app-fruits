const dotenv = require("dotenv"); // require package
dotenv.config(); // Loads the environment variables from .env file
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Fruit = require("./models/fruit.js");

mongoose.connect(process.env.MONGODB_URI);
// log connection status to terminal on start
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

mongoose.connection.on("Error", (error) => {
    console.log(`An error connecting to MongoDB has occured ${error}.`);
  });
  


app.use(express.urlencoded({ extended: false }));


// GET /
app.get("/", async (req, res) => {
    res.render("index.ejs");
});
  
app.get("/fruits", async (req, res) => {
    const allFruits = await Fruit.find();
    res.render("fruits/index.ejs", { fruits: allFruits });
}); 

// GET /fruits/new
app.get("/fruits/new", (req, res) => {
    res.render("fruits/new.ejs");
});

app.post("/fruits", async (req, res) => {
    if (req.body.isReadyToEat === "on") {
        req.body.isReadyToEat = true;
    } else {
        req.body.isReadyToEat = false;
    }
    await Fruit.create(req.body);
        res.redirect("/fruits/new");
    });

app.listen(3000, () => {
    console.log("Listening on port 3000");
  });
  