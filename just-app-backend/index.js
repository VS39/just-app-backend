const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.get('/',(req,res)=>{
    res.send("HELLO");
});

app.listen(port, (req, res)=>{
    console.log("RUNNING");
})