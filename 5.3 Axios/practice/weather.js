import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
const app = express();
const port = 3009;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/weather", async (req, res) => {
  try {
    const response = await axios.get("https://api.open-meteo.com/v1/forecast", {
      params: {
        latitude: 38.00482,
        longitude: -91.582031,
        current_weather: true,
      },
    });

    const data = response.data;
    console.log(data);

    console.log("city searched achieved!");
    res.render("weather.ejs", {
      cityName: null,
      temperature: null,
      error: "",
    });
  } catch (err) {
    res.json({ error: err.message });
  }
});

app.post("/weather/search", async (req, res) => {
  const cityName = req.body.cityName;
  try {
    if (cityName === "city1".toLowerCase()) {
      const response = await axios.get(
        "https://api.open-meteo.com/v1/forecast",
        {
          params: {
            latitude: 38.00482,
            longitude: -91.582031,
            current_weather: true,
          },
        },
      );
      const data = response.data;
      console.log(data);

      const temperature = data.current_weather.temperature;
      const city = {
        cityName: cityName,
        temperature: data.current_weather.temperature_2m,
      };

      return res.render("weather.ejs", {
        cityName,
        temperature,
        error: "",
      });
      console.log("city1 search rendered!");
    }

    res.render("weather.ejs", {
      cityName,
      temperature: null,
      error: "",
    });
  } catch (err) {
    res.json({ error: err.message });
  }
});

// app.get("/weather/clean", async (req, res) => {
//   try {
//     const response = await axios.get("https://api.open-meteo.com/v1/forecast", {
//       params: {
//         latitude: 41.5313236828957,
//         longitude: -81.53644052533635,
//         current_weather: true,
//         temperature_unit: "fahrenheit",
//         timezone: "GMT-4",
//       },
//     });
//     const result = response.data;
//     console.log(result);
//     const weather = {
//       time: result.current_weather.time,
//       temperature: result.current_weather.temperature,
//       unit: result.current_weather_units.temperature,
//       timezone: result.timezone,
//     };

//     res.render("weather.ejs", {
//       weather,
//       error: "",
//     });
//     console.log(response.data);

//     console.log("weather/clean achieved!");
//   } catch (err) {
//     res.json({ error: err.message });
//   }
// });

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
