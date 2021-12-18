const express = require('express');
const path = require('path');
const mongoose = require("mongoose");
const User = require("./models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const passportLocalMongoose = require('passport-local-mongoose');
const session = require('express-session');
const app = express();
require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// EXPRESS SESSION
// const expressSession = require('express-session')({
//   secret: 'secret',
//   resave: false,
//   saveUninitialized: false
// });

app.use(express.static('public'));
app.use(express.json());
app.use(cors());
app.use(session({
  cookie: {
     maxAge: 60000,
     secure: false
  }, 
  secret: 'screat',
  resave: false, 
  saveUninitialized: false
}));
app.use(flash());
app.use((req, res, next) => {
  res.locals.errors = req.flash("error");
  res.locals.successes = req.flash("success");
  next();
});

// // PASSPORT SETUP

// const passport = require('passport');

// app.use(passport.initialize());
// app.use(passport.session());

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

// passport.use(User.createStrategy());

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());


const connectEnsureLogin = require('connect-ensure-login');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));


app.get('/', (req,res) => {
res.render('index', { title: 'EVFY' });
})

app.post("/register", async (req, res) => {
    try {
      const { email, password, username, fullname} = req.body;

      if (!email || !password || !username || !fullname) {
        return res.status(400).json({ msg: "Not all fields have been entered" });
      }
  
      if (password.length < 6) {
        return res.status(400).json({ msg: "The password needs to be at least 6 characters long" });
        // res.send("The password needs to be at least 6 characters long");
      }
  
      const existingEmail = await User.findOne({ email: email });
      if (existingEmail) {
        return res
          .status(400)
          .json({ msg: "An account with this email already exists" });
      }
  
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
      req.flash("success", "Welcome to EVFY!");
      res.redirect('/');
    } catch (error) {
      res.status(500).json({ err: error.message });
    }
  });

app.post('/login', async (req, res) => {
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
          return res.status(400).json({ msg: "Invalid credentials" });
        } else {
            req.flash('success', 'Welcome back!');
            res.redirect('/');
        }

         //create json web token
        // const token = jwt.sign({ id: user._id });
        // res.json({
        //   token,
        //   user: {
        //     id: user._id,
        //     firstName: user.firstName,
        //     lastName: user.lastName,
        //   },
        // });
    } catch (error) {
        res.status(500).json({ err: error.message });
    }
});

// //EDIT USER PROFILE
// app.post("/edit", async (req, res) => {
//   try {
//     const { email, password, username, fullname} = req.body;
    
//     // ensure email and password meet the requirements
//     if (!email || !password || !username || !fullname) {
//       return res.status(400).json({ msg: "Not all fields have been entered" });
//     }

//     if (password.length < 6) {
//       return res
//         .status(400)
//         .json({ msg: "The password needs to be at least 6 characters long" });
//     }

//     const existingEmail = await User.findOne({ email: email });
//     if (existingEmail) {
//       return res
//         .status(400)
//         .json({ msg: "An account with this email already exists" });
//     }

//     // Bcrypt - hashing password
//     const salt = await bcrypt.genSalt();
//     const passwordHash = await bcrypt.hash(password, salt);

//     const updatedUser = new User({
//       email: email,
//       password: passwordHash,
//       username: username,
//       fullname: fullname,
//     });
//     const savedUser = await newUser.save();
//     res.json(savedUser);
//     // req.flash("success", "Successfully created the account!!");
//     res.redirect('/');
//   } catch (error) {
//     res.status(500).json({ err: error.message });
//   }
// });
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