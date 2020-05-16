const Post = require('../models/post');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mbxGeocoding({ accessToken: process.env.MAPBOX_TOKEN });
const cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: 'detxvbsr7',
  api_key: '452761124969478',
  api_secret: process.env.CLOUDINARY_SECRET
})

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
    req.body.post.images = [];
    for(const file of req.files){
      let image = await cloudinary.v2.uploader.upload(file.path);
      req.body.post.images.push({
        url: image.secure_url,
        public_id: image.public_id
      });
    }
    let response = await geocodingClient
      .forwardGeocode({
        query: req.body.post.location,
        limit: 1
      })
      .send();
    req.body.post.coordinates = response.body.features[0].geometry.coordinates;
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
    let post = await Post.findById(req.params.id);
    if(req.body.deleteImages && req.body.deleteImages.length){
      let deleteImages = req.body.deleteImages;
      for(const public_id of deleteImages) {
        await cloudinary.v2.uploader.destroy(public_id);
        post.images = post.images.filter((image)=> image.public_id!==public_id);
      }
    }

    if(req.files){
      for(const file of req.files){
        let image = await cloudinary.v2.uploader.upload(file.path);
        post.images.push({
          url: image.secure_url,
          public_id: image.public_id
        });
      }
    }

    post.title = req.body.post.title;
    post.description = req.body.post.description;
    post.price = req.body.post.price;
    post.location = req.body.post.location;
    // handle any deletion of existing images
    // handle upload of any new images
    await post.save();
    res.redirect(`/posts/${post._id}`);
  },

  // posts Delete
  async postDestroy(req, res, next) {
    let post = await Post.findById(req.params.id);
    for(const image of post.images) {
      await cloudinary.v2.uploader.destroy(image.public_id);
    }
    await post.remove();
    res.redirect('/posts');
  }
}