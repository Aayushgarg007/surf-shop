const Post = require('../models/post');

module.exports = {
  // Posts Index
  async postIndex(req, res, next) {
    let posts = await Post.find();
    res.render('posts/index', { posts });
  },

  // Posts New
  postNew(req, res, next) {
    res.render('posts/new');
  },

  // posts Create
  async postCreate(req, res, next) {
    let post = new Post(req.body.post);
    await post.save();
    res.redirect(`/posts/${post._id}`);
  },

  // posts Show
  async postShow(req, res, next) {
    let post = await Post.findById(req.params.id);
    res.render('posts/show', { post });
  },

  // posts Edit
  async postEdit(req, res, next) {
    let post = await Post.findById(req.params.id);
    res.render('posts/edit', { post });
  },

  // posts Update
  async postUpdate(req, res, next) {
    let post = await Post.findByIdAndUpdate(req.params.id, req.body.post, { new: true });
    res.redirect(`/posts/${post._id}`);
  },

  // posts Delete
  async postDestroy(req, res, next) {
    await Post.findByIdAndDelete(req.params.id);
    res.redirect('/posts');
  }
}