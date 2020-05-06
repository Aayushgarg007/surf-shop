const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: String,
  image: String,
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Post'
    }
  ]
});

UserSchema.plugin(passportLocalMongoose);
// bcz of plugin with passportLocalMongoose it will automatically use passport local stratergy 
// where username and password is already declared

module.exports = mongoose.model('User', UserSchema);


/*
User
- email - string
- password - string
- username - string
- profilePic - string
- posts - array of objects - ref Post
- review - array of objects - ref Review
*/
