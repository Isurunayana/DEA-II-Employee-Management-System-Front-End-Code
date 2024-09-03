// src/utils/db.js
import mysql from 'mysql2';

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "employeedb"
});

con.connect(function(err) {
    if (err) {
        console.log("Connection error:", err);
    } else {
        console.log("Connected to the database");
    }
});

export default con;
