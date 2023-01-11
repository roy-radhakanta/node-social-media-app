const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/User');


passport.use(new LocalStrategy({
    usernameField: 'email'
},
    function (email, password, done) {
        User.findOne({ email: email }, function (err, user) {
            if (err) {
                console.log("Error in finding the user -----> Passport");
                return done(err);
            }
            if (!user || user.password != password) {
                console.log("Error in finding user ---> Passport");
                return done(null, false);
            }

            return done(null, user);
        });
    }

));


passport.serializeUser(function(user, done){
    done(null, user.id);
});


passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            return done(err);
        }
        return done(null, user);
    })
});

passport.checkAuthentication = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }

    return res.redirect('/user/signin');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
   return next();
}

module.exports = passport;