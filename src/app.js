const express = require('express'); 
const app = express(); 
require('dotenv').config();

const {connectDB } = require('./config/database')


connectDB()
   .then(()=>{
    console.log("connection successfully")
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
   })
   .catch((error)=>{
    console.error("connection unsuccessfully")
    process.exit(1)
    })


