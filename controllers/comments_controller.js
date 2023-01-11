const Post = require('../models/Post');
const Comments = require('../models/Comments');

module.exports.create = function(req, res){
    Post.findById(req.body.post, function(err, post){
        // skip the err
        if(post){
            Comments.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function(err, comment){
                // skip err

                if(comment){
                    post.comments.push(comment);
                    post.save();
                    res.redirect('/');
                }
            });
        }
    });
}