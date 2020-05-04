const express = require('express');
const router = express.Router({ mergeParams: true});
// this "mergeParams: true" let us to get the id of the post

/* GET reviews index /posts/:id/reviews */
router.get('/', (req, res, next) => {
  res.send('index /posts/:id/reviews');
});

/* POST reviews create /posts/:id/reviews */
router.post('/', (req, res, next) => {
  res.send('create /posts/:id/reviews');
});

/* GET reviews edit /posts/:id/reviews/:review_id/edit */
router.get('/:review_id/edit', (req, res, next) => {
  res.send('edit /posts/:id/reviews/:review_id/edit');
});

/* PUT reviews update /posts/:id/reviews/:review_id */
router.put('/:review_id', (req, res, next) => {
  res.send('update /posts/:id/reviews/:review_id');
});

/* DELETE destroy index /posts/:id/reviews/:review_id */
router.delete('/:review_id', (req, res, next) => {
  res.send('delete /posts/:id/reviews/:review_id');
});

module.exports = router;

/*
GET index         /reviews
POST create       /reviews
GET edit          /reviews/:id/edit
PUT update        /reviews/:id
DELETE destroy    /reviews/:id
*/