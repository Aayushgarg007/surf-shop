const express = require('express');
const router = express.Router();

/* GET posts index /posts */
router.get('/', (req, res, next) => {
  res.send('index /posts');
});

/* GET posts new /posts/new */
router.get('/new', (req, res, next) => {
  res.send('new /posts/new');
});

/* POST posts create /posts */
router.post('/', (req, res, next) => {
  res.send('create /posts');
});

/* GET posts show /posts/:id */
router.get('/:id', (req, res, next) => {
  res.send('show /posts/:id');
});

/* GET posts edit /posts/:id/edit */
router.get('/:id/edit', (req, res, next) => {
  res.send('edit /posts/:id/edit');
});

/* PUT posts update /posts/:id */
router.put('/:id', (req, res, next) => {
  res.send('update /posts/:id');
});

/* DELETE destroy index /posts/:id */
router.delete('/:id', (req, res, next) => {
  res.send('delete /posts/:id');
});

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