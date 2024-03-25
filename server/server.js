import express from 'express'
import mysql from 'mysql'
import cors from 'cors'

const port = 8081;
const app = express();
app.use(cors());
app.use(express.json())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "inventory"
})

app.get('/', (req, res) => {
    const sql = "SELECT * FROM paint_inventory";
    db.query(sql, (err, result)=> {
        if(err) return res.json({Message: "Server error"});
        return res.json(result);
    })
})

app.post('/paint_inventory', (req, res) => {
    const sql = "INSERT INTO paint_inventory (`colour_name`, `stock`, `status`) VALUES (?)";
    const values = [
        req.body.colour_name,
        req.body.stock,
        req.body.status
    ]
    db.query(sql, [values], (err, result) => {
        if(err) return res.json(err);
        return res.json(result);
    })
})

app.get('/edit/:id', (req, res) => {
    const sql = "SELECT * FROM paint_inventory WHERE ID = ?";
    const id = req.params.id;

    db.query(sql,[id], (err, result) => {
        if(err) return res.json({Message: "Server error"});
        return res.json(result);
    })
})

app.put('/edit/:id', (req, res) =>{
    const sql = "UPDATE paint_inventory SET `colour_name`=?, `stock`=?, `status`=? WHERE ID = ?"
    const id = req.params.id;
    db.query(sql, [req.body.colour_name, req.body.stock, req.body.status, id], (err, result) => {
        if(err) return res.json({Message: "Server error"});
        return res.json(result);
    })
})

app.delete('/delete/:id', (req, res) => {
    const sql = "DELETE FROM paint_inventory WHERE ID = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
        if(err) return res.json({Message: "Server error"});
        return res.json(result);
    })
})

app.listen(port, ()=> {
    console.log("Listening");
})