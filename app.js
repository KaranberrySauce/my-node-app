const express = require("express");

//express app
const app = express();

//register view engine
app.set("view engine", "ejs");


//listen for requests
app.listen(3000);

app.get("/", (req, res) => {
  //res.send("<p>Home page</p>");
  res.sendFile("./views/index.html", { root: __dirname });
});

app.get("/about", (req, res) => {
  //res.send("<p>About page</p>");
  res.sendFile("./views/about.html", { root: __dirname });
});

//redirects
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

//404 page
app.use((req, res) => {
  res.status(404).sendFile("./views/404.html", { root: __dirname });
});

/* This method will go down the list of requests until no page
is found and then use the 404 file. Make sure to apply the use
method for the 404 page at the very end. Otherwise it wil load
that page despite the proper redirect. */
