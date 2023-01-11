const express = require('express');
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/db');
const app = express();

const session = require('express-session');
const passport = require('passport')
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');

app.use(express.urlencoded());
app.use(cookieParser());

app.use('/assets', express.static('assets'));
app.use(expressLayouts);


app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name: 'codial',
    secret: 'abc',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost/codial_development',
        autoRemove: 'disabled'
    },
        function(err){
            console.log(err || "Mongo-Store is connected");
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use('/', require('./routers'));

app.listen(3000, function(error){
    if(error){console.log(error);return;}
    console.log("App is listening on port 3000")
})