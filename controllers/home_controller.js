const Post = require('../models/Post');

module.exports.home = function (req, res) {
    Post.find().populate('userid').populate({path: 'comments', populate: 'user'}).exec(function(err, post) {
        return res.render('home', {
            title: "Home Page",
            currentpage: "Home",
            posts: post
        });
    });
}