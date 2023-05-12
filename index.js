// Imported Required  Modules
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Created Connection
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "API",
});

// the below code ththrows error if any, and if no errors console logs "Connected to the database" Statement 
con.connect((err) => {
  if (err) {
    console.error("Error connecting to the database: ", err);
  }
  console.log("Connected to the database");
});

// This Route enables us to render the form
app.get("/api/data",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
})

// This Route is being used to save the data received from FORM 
app.post("/api/data", (req, res) => {
  
    // Saves the data into MySQL database
    let users = {name: req.body.name, email: req.body.email}
    let sql2 = "INSERT into users SET ?";
    let query = con.query(sql2, users, (err,result)=>{
        if(err) throw err;
        console.log(result);
    });
    res.redirect("/api/data");
});

// The app is set to run on Port 3000
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});