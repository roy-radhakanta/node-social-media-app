const Post = require('../models/Post');

module.exports.create = function(req, res){
    if(!req.body.content){
        return res.redirect('back');
    }

    Post.create({
        content: req.body.content,
        userid: req.user._id
    }, function(err, post){
        if(err){console.log(err); return;}
       return res.redirect('back');
    });
}