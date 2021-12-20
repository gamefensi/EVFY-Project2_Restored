const express = require('express');
const path = require('path');
const mongoose = require("mongoose");
const User = require("./models/userModel");
const bcrypt = require("bcryptjs");
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const app = express();
require("dotenv").config();
const urlencodedParser = bodyParser.urlencoded({ extended: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(express.static('public'));
app.use(express.json());

// EXPRESS SESSION
app.use(session({
  cookie: {
     maxAge: 60000,
     secure: false
  }, 
  secret: 'screat',
  resave: true,
  saveUninitialized: true
}));
app.use(flash());
app.use((req, res, next) => {
  res.locals.errors = req.flash("error");
  res.locals.successes = req.flash("success");
  next();
});

// // PASSPORT SETUP

const passport = require('passport');

app.use(passport.initialize());
app.use(passport.session());

// CONNECT TO DB
mongoose.connect(
    process.env.DB,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    },
    (error) => {
      if (error) throw error;
      console.log("Database connected");
    }
  );


// PASSPORT LOCAL AUTHENTICATION

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// const connectEnsureLogin = require('connect-ensure-login');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));


app.get('/', (req,res) => {
  if (req.session.loggedin) {
    const { email, password, username, fullname } = req.session;
    req.flash('success', 'Welcome back,' + req.session.username + '!');
    res.render('index', {
      title: 'EVFY',
      username: username,
      fullname: fullname,
      email: email,
      password: password
    });
  } else {
    res.render('index', { title: 'EVFY' });
  }
})

app.get("/logout", (req, res) => {
  req.logout();
  req.flash('success', "Goodbye!");
  req.session.destroy();
  res.redirect("/");
});

app.post('/contact', urlencodedParser, (req, res) => {
  console.log('Received Contact Information:', req.body);
  res.render("index");
});
app.post('/edit', async (req, res)  => {
  try{
    const { email, password, username, fullname} = req.body;

    // Bcrypt - hashing password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      email: email,
      password: passwordHash,
      username: username,
      fullname: fullname,
    });
    const savedUser = await newUser.save();
    req.session.destroy();
    console.log("New login information has been saved", req.body)
    res.redirect('/');

  } catch (error) {
    res.status(500).json({ err: error.message });
  }
});

app.post("/register", async (req, res) => {
    try {
      const { email, password, username, fullname} = req.body;

      if (!email || !password || !username || !fullname) {
        return res.status(400).json({ msg: "Not all fields have been entered" });
      }
  
      const existingEmail = await User.findOne({ email: email });
      if (existingEmail) {
        return res.render('index', { signUpFailed: 'true' }); 
      };
  
      // Bcrypt - hashing password
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);
  
      const newUser = new User({
        email: email,
        password: passwordHash,
        username: username,
        fullname: fullname,
      });
      // const savedUser = await newUser.save();
      console.log("user", user)
      req.flash("success", "Welcome to EVFY!");
      res.redirect('/profile');
    } catch (error) {
      res.status(500).json({ err: error.message });
    }
  });



app.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
          return res.status(400).json({ msg: "Not all fields have been entered" });
        }

        // validate email
        const user = await User.findOne({ email: email });
        if (!user) {
          return res
            .status(400)
            .json({ msg: "Invalid credentials" });
        }
    
        // validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          res.render('index', { loginFailed: 'true' });
        } else {
            console.log("user", user)
            req.session.loggedin = true;
            req.session.username = user.username;
            req.session.fullname = user.fullname;
            req.session.email = email;
            req.session.password = password;
            req.flash('success', 'Welcome back, ' + req.session.username + '!');
            res.redirect('/');
        }

    } catch (error) {
        res.status(500).json({ err: error.message });
    }
});


//CONVERT PUG TO HTML IN PUBLIC FOLDER
var jade = require('pug');//require pug module
var fs = require('fs')
var str = jade.renderFile('./views/index.pug' ,{pretty : true });
fs.writeFile('./index.html' ,str , function(err){
    if (err)
        console.log("Compile to html in error");
    else
        console.log("Compile to html successfully");
});

app.listen(3000, () => console.log("Listening on port 3000"))