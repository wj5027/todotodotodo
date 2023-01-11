const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    user: "todo_2",
    password: "todo_2",
    database: "todo",
});

connection.connect();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('서버연결성공');
})



app.post("/toDoList", (req, res) => {
    connection.query("SELECT id, content, DATE_FORMAT(TODO_DATE,'%Y-%m-%d') AS todo_date FROM TODO",
        function (err, rows, fields) {
            if (err) {
                console.log("조회 실패:: " + err);
            } else {
                console.log("조회 성공");
                res.send(rows);
            }
        })
})

app.listen(port, () => {
    console.log(`Connect at http://localhost:${port}`);
})