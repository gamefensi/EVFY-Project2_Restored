const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('public'));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req,res) => {
res.render('index', { title: 'Home page' });
})

//CONVERT PUG TO HTML IN PUBLIC FOLDER
var jade = require('pug');//require pug module
var fs = require('fs')
var str = jade.renderFile('./views/index.pug' ,{pretty : true }); 
fs.writeFile('./public/final_index.html' ,str , function(err){
    if (err)
        console.log("Compile to html in error");
    else
        console.log("Compile to html successfully");
});

app.listen(3000, () => console.log("Listening on port 3000"))