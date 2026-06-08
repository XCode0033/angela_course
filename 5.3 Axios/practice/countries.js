import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
const app = express();
const port = 3004;
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", async (req, res) => {
  const response = await axios.get(
    ` https://restcountries.com/v3.1/all?fields=name,capital,currencies`,
  );

  const result = response.data;
  console.log(result);
  res.render("countries.ejs", { countries: result });
});

//handle search
app.post("/search", async (req, res) => {
  const search = req.body.search.toLowerCase();
 
  const response = await axios.get(
    "https://restcountries.com/v3.1/all?fields=name,capital,currencies",
  );
  const filtered = response.data.filter((country) =>
    country.name.common.toLowerCase().includes(search),
  );

  res.render("countries.ejs", { countries: filtered });
});

app.post("/", (req, res) => {
  const search = req.body.search.toLowerCase();
  const response = await axios.get("");

  const filtered = response.data.filter((i) => 
  i.name.common.toLowerCase().includes(search))
  
})
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

app.post("/", (req, res) => {});
