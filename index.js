const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app= express();
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect('mongodb://localhost:27017/MoneyList');
let db = mongoose.connection;
db.on('error', ()=> console.log("Error in connecting to the Database"));
db.once('open', () => console.log("Connected to Database"));

app.post("/add", (req,res) =>{
    let category_select = req.body.category_select
    let amount_input= req.body.amount_input
    let info = req.body.info
    let date_input = req.body.date_input

    let data={
        "Category": category_select,
        "Amount" : amount_input,
        "Info": info,
        "Date": date_input
    };
    db.collection('users').insertOne(data, (err,collection) => {
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");

    });
});

app.get("/",(req,res) =>{
    res.set({
        "Allow-access-Allow-Origin":'*'
    });
    return res.redirect('index.html');
}).listen(8080);

console.log("Listening on port 8080");