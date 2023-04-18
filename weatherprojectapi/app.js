const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const { request } = require("http");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    const query = req.body.cityName;
    const apiKey = "ec27dade36e075ad7a1d154714375c57"
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid= " + apiKey + "&units= " + unit + ""

    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {
          const weartherData = JSON.parse(data);
          const temp = weartherData.main.temp;
          const weatherDescription = weartherData.weather[0].description;
          const icon = weartherData.weather[0].icon;
          const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
          res.write("<p>the weather is currenty " + weatherDescription + "</p>");
          res.write("<h1> the temperature in "+ query +" is " + temp + " degrees celcius.</h1>");
          res.write("<img src = " + imageURL + ">")
          res.send()
        })
    })
})


app.listen(3000, function () {
    console.log("server is runnng on port 3000.");
})