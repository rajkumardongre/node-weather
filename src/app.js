const path = require("path");

const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define path for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPaths = path.join(__dirname, "../templates/partials");

// Setup handelbars engine and views
app.set("views", viewsPath);
app.set("view engine", "hbs");
hbs.registerPartials(partialsPaths);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Rajkumar",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Rajkumar Dongre",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Rajkumar Dongre",
    message:
      "If you wants some help call us on 909000431. Thank You for reaching us.",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an Address.",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({ location, forecastData, address: req.query.address });
      });
    }
  );
});

app.get("/product", (req, res) => {
  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    errorMessage: "Help article Not found",
    name: "Rajkumar Dongre",
    title: "404",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    errorMessage: "Page Not found(404)",
    name: "Rajkumar Dongre",
    title: "404",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000...");
});
