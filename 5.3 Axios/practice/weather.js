import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3005;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", async (req, res) => {
  const response = await axios.get("");
});
app.listen(port, () => {
  console.log(`Server running on port: http://localhost:${port}`);
});
