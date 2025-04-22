const express = require("express");
const morgan = require("morgan");

//express app
const app = express();

//register view engine
app.set("view engine", "ejs");

//listen for requests
app.listen(3000);

app.use(morgan("dev"));

app.get("/", (req, res) => {
  const blogs = [
    {
      title: "Here is blog 1",
      snippet: "This is the first blog of the website. Enjoy",
    },
    {
      title: "Here is blog 2",
      snippet: "This is the second blog of the website. Enjoy",
    },
    {
      title: "Here is blog 3",
      snippet: "This is the third blog of the website. Enjoy",
    },
    {
      title: "Here is blog 4",
      snippet: "This is the fourth blog of the website. Enjoy",
    },
  ];
  res.render("index", { title: "Home", blogs });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create New Blog" });
});

//404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});

/* This method will go down the list of requests until no page
is found and then use the 404 file. Make sure to apply the use
method for the 404 page at the very end. Otherwise it wil load
that page despite the proper redirect. */
