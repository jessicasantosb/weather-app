
import express from 'express';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from "body-parser";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
    const query = req.body.cityInput;
    const apiKey = "b73d0e7bb40743bd67b6529abe9cbedd";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${apiKey}`;
    
    https.get(url, function(response) {
        response.on("data", function(data) {
            const weatherData = JSON.parse(data);
            const flag = weatherData.sys.country;
            const temperature = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const iconUrl = `http://openweathermap.org/img/wn/${icon}.png`;
            const humidity = weatherData.main.humidity;
            const wind = weatherData.wind.speed;

            res.write("<h2> The weather is currently "+ description +"</h2>");            
            res.write("<h1> The temperature in "+ query + " is " + temperature +"</h1>");
            res.write("<h3> Humidity: " + humidity + "</h3>")
            res.write("<h3> Wind: " + wind + "</h3>")

            res.send();
        })
    })
});

app.listen(3000, () => {
    console.log("Server is running on port 3000.");
})