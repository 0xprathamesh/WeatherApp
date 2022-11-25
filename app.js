
//jshint esversion:6


const express = require("express");
const https = require("https")
const bodyParser = require("body-parser");
const ejs = require("ejs");
// const alertBox = "Search City By Correct Spelling";
// alert(alertBox);
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));



app.get("/", function (req, res) {
    res.render('index');

 })

 app.post("/", function (req, res) {
  console.log(req.body.cityName);
  const query = req.body.cityName;


  const apiKey = "ff5d26dc13fa995f9407f65c90da8272";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

 https.get(url, query, function (response) {

   console.log(response.statusCode);
   if (response.statusCode === 200) {
    response.on("data", function (data) {
     
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp;
      const humidity = weatherData.main.humidity;
      const country = weatherData.sys.country;
      const pressure = weatherData.main.pressure;
      const wind = weatherData.wind.speed;
      const weatherDescription = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

    
        res.render('temprature', {
          weatherDescription: weatherDescription,
          query: query,
          temp: temp,
          imageURL: imageURL,
          humidity: humidity,
          wind: wind,
          country: country,
          pressure: pressure
        })
    
      
     



    });
   } else {
     res.render('failure')
   }

   


  });

})
app.get("*",(req, res) =>{
  res.render("failure")
});


app.listen(process.env.PORT || 3000, function() {
  console.log("server is running");
})
