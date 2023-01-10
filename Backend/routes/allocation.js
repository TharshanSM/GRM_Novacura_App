const router = require('express').Router();
const sql = require('mssql');
const dbconfig = require('../dbconfig')

router.get('/',async (req,res)=>{
    const query = "SELECT [id],[first_name],[last_name],[join_date],[status],[manager_id] FROM [grm].[employees]"
    try{
        const pool = await sql.connect(dbconfig)
        const result = await pool.request()
        .query(query)
        res.send(result)
    }catch(err){
        console.log(err)
    }
});


// Get All The Allocations Details
// Create Weekly Allocation Table

module.exports = router;