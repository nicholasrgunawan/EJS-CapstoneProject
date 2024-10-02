import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.render("index.ejs");
});

let submissions = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/about", (req, res) => {
  res.render("about.ejs");
});
app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});
app.get("/form", (req, res) => {
  res.render("form.ejs");
});

app.post("/submit", (req, res) => {
  const { name, email, text } = req.body;
  submissions.push({ name, email, text });
  res.redirect("/form");
});

app.get("/table", (req, res) => {
  res.render("table.ejs", { submissions });
});

app.get("/delete/:index", (req, res) => {
  const index = req.params.index;
  if (index >= 0 && index < submissions.length) {
    submissions.splice(index, 1); 
  }
  res.redirect("/table");
});

app.get("/edit/:index", (req, res) => {
  const index = req.params.index;
  if (index >= 0 && index < submissions.length) {
    const submission = submissions[index];
    res.render("edit.ejs", { submission, index });
  } else {
    res.redirect("/table");
  }
});

app.post("/update/:index", (req, res) => {
  const index = req.params.index;
  if (index >= 0 && index < submissions.length) {
    const { name, email, text } = req.body;
    submissions[index] = { name, email, text };
  }
  res.redirect("/table");
});



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
