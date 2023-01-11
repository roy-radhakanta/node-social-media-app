const User = require('../models/User');

module.exports.signup = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/user/profile');
    }
    return res.render('signup', {
        currentpage: "Signup",
        title: "Signup"
    });
}

module.exports.signin = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/user/profile');
    }
    return res.render('signin', {
        currentpage: "Signin",
        title: "Signin"
    });
}

module.exports.create = function (req, res) {
    if (!req.body.password) {
        return res.redirect('signup');
    }

    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) { console.log(err); return; }

        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) {
                    return res.redirect('back');
                }
            })
        }

        return res.redirect('/user/signin');
    })
}

module.exports.createSession = function (req, res) {
    return res.redirect('/');
}

module.exports.profile = function (req, res) {
    return res.render('profile', {
        currentpage: "Profile",
        title: "Profile page"
    });
}
module.exports.destroySession = function (req, res) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
}