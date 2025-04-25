const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

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
app.use(morgan("dev"));

//mongoose and mongo sandbox routes
app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "New blog 2",
    snippet: "About my new blog",
    body: "More about my new blog",
  });
  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/all-blogs", (req, res) => {
  Blog.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/single-blog", (req, res) => {
  Blog.findById("680add3587f0548fb5632722")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//routes
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
