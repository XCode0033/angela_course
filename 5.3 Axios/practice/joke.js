import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
const app = express();
const port = 3003;
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", async (req, res) => {
  const response = await axios.get(`https://v2.jokeapi.dev/joke/any`);
  const result = response.data;
  console.log(result);

  res.render("joke.ejs", { data: result, selectedType: "any" });
});

app.post("/", async (req, res) => {
  const category = req.body.category;
  const type = req.body.type;

  const response = await axios.get(
    `https://v2.jokeapi.dev/joke/${category}?type=${type}`,
  );
  const result = response.data;
  console.log(result);
  res.render("joke.ejs", { data: result, selectedType: type });
});

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
