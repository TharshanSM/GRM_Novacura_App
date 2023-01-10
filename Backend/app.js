const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();

const allocationRoutes = require("./routes/allocation");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/allocations", allocationRoutes);

app.get("/", (req, res) => {
    res.send("Global Resource Management App");
});

app.listen(process.env.PORT || 3000, () => {
    console.log("App is Listening");
});
