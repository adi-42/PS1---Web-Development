if(process.env.NODE_ENV !== 'production'){ //if in development, not prod
    require('dotenv').config()
}

const express = require('express'); 
const app = express();
const bcrypt = require('bcrypt');
const initializePassport = require('./passport-config');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');

const users = []; //using local for now, connect to database later

initializePassport(
    passport, 
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
);

app.set('view-engine','ejs');
app.use(express.urlencoded({extended: false})); //to be able to access form data in POST request later
app.use(flash());
app.use(session({
    secret  : process.env.SESSION_SECRET,
    resave : false,
    saveUninitialized : false
}));
app.use(passport.initialize());
app.use(passport.session());


app.get('/', (req,res)=>{
    //  res.render('index.ejs', { name : req.user.name });
    res.render('index.ejs');
});

app.get('/login', (req,res)=>{
    res.render('login.ejs');
});

app.get('/register', (req,res)=>{
    res.render('register.ejs');
});

app.get('/userportal', (req,res)=>{
    res.render('userportal.ejs');
});

app.post('/login', passport.authenticate('local', {
    successRedirect : '/userportal',
    failureRedirect : '/login',
    failureFlash : true 
}))

app.post('/register', async (req,res)=>{
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        users.push({
            id: Date.now().toString(),
            name : req.body.name,
            email : req.body.email,
            password : hashedPassword
        })
        res.redirect('/login');
    } catch{
        res.redirect('/register');
    }
    console.log(users);
});
 
app.listen(3000);