const express = require("express");
const https = require("https");

const app = express();

app.get("/", function(req, res) {

  url = "https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=a55e26b6643e9baeee86a9a8d641b6dc&units=metric";
  https.get(url, function(response) {
    //console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.feels_like;
      const description = weatherData.weather[0].description;
      res.write("<h1>The temperature feels like " +temp +" Degree Celcius </h1>");
      res.write("<h1>There can be "+description+" today</h1>");
      const icon = weatherData.weather[0].icon;
      const imgURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
      res.write("<img src="+ imgURL + "></img>");
      res.send();
    });
  });
//res.send("server is up and running");
});


app.listen(3000, function() {
  console.log("server is running on port 3000");
});
