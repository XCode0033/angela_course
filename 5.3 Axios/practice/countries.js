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

  res.render("countries.ejs", { data: result });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
