const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const initializePassport = require('./passport-config')
const db = require('./config/database')
const crypto = require('crypto');
const sessionSecret = crypto.randomBytes(64).toString('hex');

initializePassport(
    passport,
    username => users.find(user => user.username === username),
    id => users.find(user => user.id === id)
)

app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
    //todo
});



app.post('/login',  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

// app.get('/signup', (req, res) => {
//     res.render('/signup');
// })

app.post('/signup', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        
        // Insert user into MySQL database
        db.query(
            'INSERT INTO users (username, firstname, lastname, email, phoneNumber, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [req.body.username, req.body.firstname, req.body.lastname, req.body.email, req.body.phoneNumber, hashedPassword, req.body.role],
            (error, results) => {
                if (error) {
                    console.error(error);
                    res.redirect('/signup');
                } else {
                    res.redirect('/login');
                }
            }
        );
    } catch {
        res.redirect('/signup');
    }
});

app.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
})

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}

app.listen(3000)