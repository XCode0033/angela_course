import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3006;

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// creates the "format" to be filled in my app.post
app.get("/", async (req, res) => {
  res.render("countrySearch.ejs", {
    countries: [],
    error: "",
    searchTerm: "",
  });
});
app.post("/search", async (req, res) => {
  try {
    const countryName = req.body.countryName.trim();

    // handles the "is it real" logic for the country name which makes it easier to type than in ejs while also clearing the search term if no country found with error string
    if (!countryName) {
      return res.render("countrySearch.ejs", {
        countries: [],
        error: "Please enter a country name.",
        searchTerm: "",
      });
    }
    // ===================================================================
    const response = await axios.get(
      `https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,currencies,languages`,
    );
    const countries = response.data;
    console.log(countries);
    // kind of like using an object if the country exists,
    res.render("countrySearch.ejs", {
      countries: countries,
      error: "",
      searchTerm: countryName,
    });
  } catch (error) {
    res.render("countrySearch.ejs", {
      countries: [],
      error: "Country not found or API request failed.",
      // displaying what country name was used when it failed
      searchTerm: req.body.countryName,
    });
  }
});
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
