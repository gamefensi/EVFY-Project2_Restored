const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('public'));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req,res) => {
res.render('index', { title: 'Home page' });
})
app.listen(3000, () => console.log("Listening on port 3000"))