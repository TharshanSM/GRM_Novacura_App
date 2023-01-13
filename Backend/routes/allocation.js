const router = require("express").Router();
const sql = require("mssql");
const dbconfig = require("../dbconfig");

router.get("/employees", async (req, res) => {
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

router.post("/employees/add", async (req, res) => {
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

// Create Weekly Allocation Table
router.post("/add", async (req, res) => {
    const { employeeID, projectID, roleID, weekID, allocation } = req.body;
    const query = `INSERT INTO [grm].[weekly_allocations]([emp_id],[project_id],[role_id],[week_id],[allocation]) 
                    VALUES (${employeeID},${projectID},${roleID},${weekID},${allocation})`;
    try {
        const pool = await sql.connect(dbconfig);
        const result = await pool.request().query(query);
        res.json({
            message: "Create Data Sucessfully",
            result: result,
        });
    } catch (err) {
        res.json({
            err: err,
        });
    }
});

// Get All The Allocations Details
router.get("/get", async (req, res) => {
    const query =
        "SELECT [id],[emp_id],[project_id],[role_id],[week_id],[allocation] FROM [grm].[weekly_allocations]";
    try {
        const pool = await sql.connect(dbconfig);
        const result = await pool.request().query(query);
        res.send(result);
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
