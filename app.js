
const express = require('express');
const mongoose = require('mongoose');

const port = 3000;


const app = express();

mongoose.connect('mongodb+srv://rakshitgondwal:chitkararakshit@cluster0.wofkim8.mongodb.net/affixity');


app.use(express.urlencoded({
    extended: true
}));

app.get("/", function(req,res){
    res.redirect("/signin")
});

app.get("/signin", function(req,res){
    res.sendFile(__dirname + '/views/signin.html');
} );

app.get("/signup", function(req,res){
    res.sendFile(__dirname + '/views/signin.html');
} );



app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });