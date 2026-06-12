import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3008;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("countryProject.ejs", {
    countries: [],
    error: "",
    dropdown: [],
  });
});

app.post("/search", async (req, res) => {
  const countryName = req.body.countryName.trim();
  let dropdown = req.body.dropdown;

  const response = await axios.get(
    `https://restcountries.com/v3.1/${countryName}?fields=name, region, capital, languages, currencies`,
    {
      fields: dropdown.join(","),
    },
  );

  const result = response.data[0];
  console.log(result);
  res.render("/search", {
    countries,
    error: "",
    dropdown,
  });
});
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
