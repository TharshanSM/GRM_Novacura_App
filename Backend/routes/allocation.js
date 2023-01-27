const router = require("express").Router();
const sql = require("mssql");
const dbconfig = require("../dbconfig");

// Employee Routes
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

// Employee Routes
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

// Get All The Allocations Details
router.get("/get", async (req, res) => {
    const query = ` 
    SELECT   emp.id                'employee_id',
            week.id               'week_number',
            week.description      'week_desc',
            emp.first_name        'first_name',
            emp.last_name         'last_name',
            proj.name	          'project_name',
            proj.start_date       'project_start_date',
            proj.end_date         'project_end_date',
            role.description      'role_assignment',
            allocation.allocation 'allocation'
    FROM    [ncc flow].[grm].[weekly_allocations] allocation
            JOIN [ncc flow].[grm].[employees] emp
            ON allocation.emp_id = emp.id
            JOIN [ncc flow].[grm].[projects] proj
            ON allocation.project_id = proj.id
            JOIN [ncc flow].[grm].[roles] role
            ON allocation.role_id = role.id
            JOIN [ncc flow].[grm].[weeks] week
            ON allocation.week_id = week.id  `;
    try {
        const pool = await sql.connect(dbconfig);
        const result = await pool.request().query(query);
        res.send(result);
    } catch (err) {
        console.log(err);
    }
});

//Get All The Allocations Details by Name

module.exports = router;
