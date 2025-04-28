const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

//express app
const app = express();

//connect to MongoDB
const dbURI =
  "mongodb+srv://karanberry1:abcd12345@nodetuts.yndapyi.mongodb.net/NodeTuts?retryWrites=true&w=majority&appName=NodeTuts";
mongoose
  .connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

//register view engine
app.set("view engine", "ejs");

//middleware & static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); //takes all the url encoded data and passes it on as an object
app.use(morgan("dev"));

//routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

//blog routes
app.use("/blogs", blogRoutes);

//404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});

/* This method will go down the list of requests until no page
is found and then use the 404 file. Make sure to apply the use
method for the 404 page at the very end. Otherwise it wil load
that page despite the proper redirect. */
