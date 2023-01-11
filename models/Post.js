const mongoose  = require('mongoose');


const postSchema = mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comments'
        }
    ]
},
{
    timestamps: true
});


const Post = mongoose.model('Post', postSchema);

module.exports = Post;