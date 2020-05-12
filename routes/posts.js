const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ 'dest': 'uploads/'}); 
// here the uploads is the folder where files gets stored temporarily
// before it gets uploaded to cloudinary's cloud
const { asyncErrorHandler } = require('../middleware');
const { 
  postIndex,
  postNew,
  postCreate,
  postShow,
  postEdit,
  postUpdate,
  postDestroy
} = require('../controllers/posts');

/* GET posts index /posts */
router.get('/', asyncErrorHandler(postIndex));

/* GET posts new /posts/new */
router.get('/new', postNew);

/* POST posts create /posts */
router.post('/', upload.array('images', 4), asyncErrorHandler(postCreate));
/*  middleware - first argument is name of input for images coming from our form
               - second argument is max number of images someone can upload from the form
  
  now bcz of this middleware when we get to postCreate method we get access to the files
  that was uploaded from the form via req.files object which is an array
*/

/* GET posts show /posts/:id */
router.get('/:id', asyncErrorHandler(postShow));

/* GET posts edit /posts/:id/edit */
router.get('/:id/edit', asyncErrorHandler(postEdit));

/* PUT posts update /posts/:id */
router.put('/:id', asyncErrorHandler(postUpdate));

/* DELETE destroy index /posts/:id */
router.delete('/:id', asyncErrorHandler(postDestroy));

module.exports = router;

/*
GET index         /posts
GET new           /posts/new
POST create       /posts
GET show          /posts/:id
GET edit          /posts/:id/edit
PUT update        /posts/:id
DELETE destroy    /posts/:id
*/