const express = require("express");
const bodyParser = require("body-parser");
const colors = require("colors");
require("dotenv").config();
const cors = require("cors");
const app = express();

const allocationRoutes = require("./routes/allocations");
const employeeRoutes = require("./routes/employees");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/allocations", allocationRoutes);
app.use("/employees", employeeRoutes);

app.get("/", (req, res) => {
    res.send("Global Resource Management App");
});

app.listen(process.env.PORT || 3000, () => {
    console.log(colors.cyan.underline("App is Listening"));
});
