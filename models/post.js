const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review');

const PostSchema = new Schema({
  title: String,
  price: String,
  description: String,
  images: [ 
    { 
      url: String, 
      public_id: String
    }
  ],
  location: String,
  coordinates: Array,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review'
    }
  ]
});

// this is pre hook middleware
// whenever Post.remove() is called this function is also called first
PostSchema.pre('remove', async function() {
  await Review.remove({
    _id: {
      $in: this.reviews
    }
  });
});

module.exports = mongoose.model('Post', PostSchema);


/*
Post
- title - string
- price - string 
- description - string
- images - array of strings
- location - string
- lat - number
- lng - number
- author - object id ref User
- reviews - array of objects
*/