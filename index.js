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
        res.render("index.ejs");
    } catch (error) {
        console.log(error.response.data);
        res.render("index.ejs");
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
