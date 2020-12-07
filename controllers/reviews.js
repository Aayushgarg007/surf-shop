const Post = require('../models/post');
const Review = require('../models/review');

module.exports = {
  // Reviews Create
  async reviewCreate(req, res, next) {
    // find the post by id
    let post = await Post.findById(req.params.id).populate('reviews').exec();
    // here we can restricting each user with only one review
    let haveReviewed = post.reviews.filter(review => {
      return review.author.equals(req.user._id);
    }).length;
    if(haveReviewed) {
      req.session.error = 'Sorry you can only create one review per post.';
      return res.redirect(`/posts/${post.id}`);
    }
    // creat a review
    req.body.review.author = req.user._id;
    let review = await Review.create(req.body.review);
    // assign review to post
    post.reviews.push(review);
    // save the post
    await post.save();
    // redirect to the post
    req.session.success = 'Review created successfully';
    res.redirect(`/posts/${post.id}`);
  },

  // Reviews Update
  async reviewUpdate(req, res, next) {
    await Review.findByIdAndUpdate(req.params.review_id, req.body.review);
    req.session.success = 'Review updated successfully';
    res.redirect(`/posts/${req.params.id}`);
  },
  
  // Reviews Delete
  async reviewDestroy(req, res, next) {
    await Post.findByIdAndUpdate(req.params.id, {
      $pull: { reviews: req.params.review_id }
    });
    // $pull is part of mongoDB to delete items from an array in DB
    await Review.findByIdAndRemove(req.params.review_id);
    req.session.success = "Review deleted successfully";
    res.redirect(`/posts/${req.params.id}`);
  }
  
}
