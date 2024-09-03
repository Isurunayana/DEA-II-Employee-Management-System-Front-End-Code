// src/Routes/AdminRoute.js
import express from 'express';
import con from '../utils/db.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/adminlogin', (req, res) => {
    const sql = "SELECT * FROM admin WHERE email = ? AND password = ?";
    con.query(sql, [req.body.email, req.body.password], (err, result) => {
        if (err) return res.json({ loginStatus: false, Error: "Query error" });

        if (result.length > 0) {
            const email = result[0].email;
            const token = jwt.sign({ role: "admin", email: email }, "jwt_secret_key", { expiresIn: '1d' });
            res.cookie('token', token, { httpOnly: true, secure: false });  // Adjust secure according to your environment
            return res.json({ loginStatus: true });
        } else {
            return res.json({ loginStatus: false, Error: "Wrong email or password" });
        }
    });
});

router.get('/department', (req, res) => {
    const sql = "SELECT * FROM department";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.post('/add_department', (req, res) => {
    const sql = "INSERT INTO department (`name`, `location`) VALUES (?, ?)";
    con.query(sql, [req.body.name, req.body.location], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"});
        return res.json({Status: true});
    });
});


router.put('/edit_department/:id', (req, res) => {
    const sql = "UPDATE department SET name = ?, location = ? WHERE id = ?";
    con.query(sql, [req.body.name, req.body.location, req.params.id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" });
        return res.json({ Status: true });
    });
});


router.delete('/delete_department/:id', (req, res) => {
    const sql = "DELETE FROM department WHERE id = ?";
    con.query(sql, [req.params.id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" });
        return res.json({ Status: true });
    });
});


router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({Status: true})
})



export { router as adminRouter };
