const express = require('express')
require('dotenv').config()
const app = express()
const port = 3000

const allocationRoutes = require('./routes/allocation');

app.use('/allocations',allocationRoutes);



app.get('/', (req, res) => {
  res.send('Global Resource Management App Backend Configuration');
})



app.listen(process.env.PORT, () => {
  console.log('App is Listening')
})



