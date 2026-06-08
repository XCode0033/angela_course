import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3007;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("fieldSearch.ejs", {
    country: null,
    error: "",
    searchTerm: "",
    selectedFields: [],
  });
});

app.post("/search", async (req, res) => {
  try {
    const countryName = req.body.countryName.trim();

    let selectedFields = req.body.fields || [];

    if (!Array.isArray(selectedFields)) {
      selectedFields = [selectedFields];
    }

    if (!countryName) {
      return res.render("fieldSearch.ejs", {
        country: null,
        error: "Please enter a country name.",
        searchTerm: "",
        selectedFields,
      });
    }

    if (selectedFields.length === 0) {
      return res.render("fieldSearch.ejs", {
        country: null,
        error: "Please choose at least one field.",
        searchTerm: countryName,
        selectedFields,
      });
    }

    const response = await axios.get(
      `https://restcountries.com/v3.1/name/${countryName}`,
      {
        params: {
          fields: selectedFields.join(","),
        },
      },
    );

    const country = response.data[0];

    res.render("fieldSearch.ejs", {
      country,
      error: "",
      searchTerm: countryName,
      selectedFields,
    });
  } catch (error) {
    res.render("fieldSearch.ejs", {
      country: null,
      error: "Country not found or API request failed.",
      searchTerm: req.body.countryName,
      selectedFields: req.body.fields || [],
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
