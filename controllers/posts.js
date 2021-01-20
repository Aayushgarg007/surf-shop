const Post = require('../models/post');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapBoxToken = process.env.MAPBOX_PUBLIC_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: process.env.MAPBOX_TOKEN });
const cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: 'detxvbsr7',
  api_key: '452761124969478',
  api_secret: process.env.CLOUDINARY_SECRET
});


module.exports = {
  // Posts Index
  async postIndex(req, res, next) {
    let posts = await Post.paginate({}, {
      page: req.query.page || 1,
      limit: 10,
      sort: '-_id'
    });
    // console.log(posts);
    posts.page = Number(posts.page);
    res.render('posts/index', { posts, mapBoxToken, title: 'Post Index' });
  },

  // Posts New
  postNew(req, res, next) {
    res.render('posts/new', { title: 'Post New' });
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
    req.body.post.geometry = response.body.features[0].geometry;
    let post = new Post(req.body.post);
    post.properties.description = `<strong><a href="/posts/${post._id}">${post.title}</a></strong><p>${post.location}</p><p>${post.description.substring(0, 20)}...</p>`;
    await post.save();
    req.session.success = 'Post created Successfully!';
    res.redirect(`/posts/${post._id}`);
  },

  // posts Show
  async postShow(req, res, next) {
    let post = await Post.findById(req.params.id).populate({
      path: 'reviews',
      options: { sort: { '_id': -1 }},
      populate: {
        path: 'author',
        model: 'User'
      }
    });
    const floorRating = post.calculateAvgRating();
    res.render('posts/show', { post, mapBoxToken, floorRating, title: 'Post Show' });
  },

  // posts Edit
  async postEdit(req, res, next) {
    let post = await Post.findById(req.params.id);
    res.render('posts/edit', { post, title: 'Post Edit' });
  },

  // posts Update
  async postUpdate(req, res, next) {
    // find the post
    let post = await Post.findById(req.params.id);
    // delete selected images
    if(req.body.deleteImages && req.body.deleteImages.length){
      let deleteImages = req.body.deleteImages;
      for(const public_id of deleteImages) {
        await cloudinary.v2.uploader.destroy(public_id);
        post.images = post.images.filter((image)=> image.public_id!==public_id);
      }
    }
    // upload new images
    if(req.files){
      for(const file of req.files){
        let image = await cloudinary.v2.uploader.upload(file.path);
        post.images.push({
          url: image.secure_url,
          public_id: image.public_id
        });
      }
    }
    // check if location was updated
    if(req.body.post.location !== post.location){
      let response = await geocodingClient
      .forwardGeocode({
        query: req.body.post.location,
        limit: 1
      })
      .send();
      post.geometry = response.body.features[0].geometry;
      post.location = req.body.post.location;
    }

    // update the post with new properties
    post.title = req.body.post.title;
    post.description = req.body.post.description;
    post.price = req.body.post.price;
    post.properties.description = `<strong><a href="/posts/${post._id}">${post.title}</a></strong><p>${post.location}</p><p>${post.description.substring(0, 20)}...</p>`;

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
    req.session.success = 'Post deleted successfully!';
    res.redirect('/posts');
  }
}
