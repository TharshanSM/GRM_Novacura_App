const router = require("express").Router();
const sql = require("mssql");
const dbconfig = require("../dbconfig");

// Get All EMployee
router.get("/get", async (req, res) => {
    const query =
        "SELECT [id],[first_name],[last_name],[join_date],[status],[manager_id] FROM [grm].[employees]";
    try {
        const pool = await sql.connect(dbconfig);
        const result = await pool.request().query(query);
        res.send(result);
    } catch (err) {
        console.log(err);
    }
});

// Create Employee
router.post("/add", async (req, res) => {
    const { firstName, lastName, joinDate, status, managerID } = req.body;
    const query = `INSERT INTO [grm].[employees]([first_name],[last_name],[join_date],[status],[manager_id]) 
                    VALUES ('${firstName}','${lastName}','${joinDate}','${status}','${managerID}')`;
    try {
        const pool = await sql.connect(dbconfig);
        const result = await pool.request().query(query);
        res.json({
            message: "Employee Created Sucessfully",
            result: result,
        });
    } catch (err) {
        res.json({
            err: err,
        });
    }
});

module.exports = router;
