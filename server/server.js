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

app.post("/insertToDo", (req, res) => {
    const content = req.body.content;
    const todo_date = req.body.todo_date;
    var params = [content, todo_date];

    connection.query("INSERT INTO todo (id, content, todo_date) VALUES ((select max(a.id)+1 as id from todo a), ?,? )", params,
        function (err, rows, fields) {
            if (err) {
                console.log("INSERT 실패:: " + err);
            } else {
                console.log("INSERT 성공");
            }
        })
});


app.post("/toDoList", (req, res) => {
    connection.query("SELECT id, content, DATE_FORMAT(TODO_DATE,'%Y-%m-%d') AS todo_date FROM TODO order by todo_date desc",
        function (err, rows, fields) {
            if (err) {
                console.log("조회 실패:: " + err);
            } else {
                console.log("조회 성공");
                res.send(rows);
            }
        })
});



app.listen(port, () => {
    console.log(`Connect at http://localhost:${port}`);
})