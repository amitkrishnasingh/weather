const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  const cityName = req.body.textInput;
  const appKey = "a55e26b6643e9baeee86a9a8d641b6dc";
  const unit = "metric";

  url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + appKey + "&units=" + unit;
  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      res.write("<h1>It's " + temp + " Degree Celcius in "+ cityName +" </h1>");
      res.write("<h1>There can be " + description + " today</h1>");
      const icon = weatherData.weather[0].icon;
      const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<img src=" + imgURL + "></img>");
      res.send();

    });
  });

});


app.listen(3000, function() {
  console.log("server is running on port 3000");
});
