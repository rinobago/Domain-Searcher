import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/searched", async (req, res) => {
  try {
    const result = await axios.get("https://api.domainsdb.info/v1/domains/search", {
      params: {
        domain: req.body.search,
      },
    });
    console.log(result.data);
    res.render("index.ejs", {
      data: result.data,
      search: req.body.search,
    });
  } catch (error) {
    console.log("API not working");
    res.render("index.ejs", {
      data: { message: "Failed to fetch domain data. Try again later." },
      search: req.body.search,
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
