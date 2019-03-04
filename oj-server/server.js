var express = require('express');
var app = express();
var restRouter = require("./routes/rest");
var indexRouter = require("./routes/index");
var mongoose = require("mongoose");
var path = require('path');

mongoose.connect("mongodb+srv://user1:1111@cluster0-qmzyk.mongodb.net/test?retryWrites=true",{ useNewUrlParser: true });
app.use(express.static(path.join(__dirname, '../public')));
app.use('/', indexRouter);
app.use("/api/v1", restRouter);

app.use((req, res) => {
    res.sendFile('index.html', {root: path.join(__dirname, '../public')});
});


app.listen(3000, function () {
    console.log('App listening on port 3000!')
})

