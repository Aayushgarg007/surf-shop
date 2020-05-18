const Post = require('../models/post');
const Review = require('../models/review');

module.exports = {
  // Reviews Create
  async reviewCreate(req, res, next) {
    // find the post by id
    let post = await Post.findById(req.params.id);
    // creat a review
    req.body.review.author = req.user._id;
    let review = new Review(req.body.review);
    // assign review to post
    post.reviews.push(review);
    // save the post and review
    review.save();
    post.save();
    // redirect to the post
    req.session.success = 'Review created successfully';
    res.redirect(`/posts/${post.id}`);
  },

  // Reviews Update
  async reviewUpdate(req, res, next) {
    
  },

  // Reviews Delete
  async reviewDestroy(req, res, next) {
    
  }
  
}