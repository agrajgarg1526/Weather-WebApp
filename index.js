const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
require('dotenv').config()

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  var city = req.body.cityName;
  var api = process.env.DB_API;
  var url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&APPID=" +
    api +
    "&units=metric";

  https.get(url, function (response) {
    console.log(response.on);
    response.on("data", function (data) {
      var data = JSON.parse(data);
      var temperature = data.main.temp;
      var description = data.weather[0].description;
      var icon = data.weather[0].icon;
      res.write("<p> The weather is currently " + description + "</p>");
      res.write(
        "<h1> The temperature at " + city + " is " + temperature + " C</h1>"
      );
      res.write(
        "<img src=http://openweathermap.org/img/wn/" + icon + "@2x.png>"
      );
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("Server Running at 3000 port");
});
