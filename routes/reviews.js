const express = require('express');
const router = express.Router({ mergeParams: true});
// this "mergeParams: true" let us to get the id of the post
const { asyncErrorHandler, isReviewAuthor } = require('../middleware');
const { 
  reviewCreate,
  reviewUpdate,
  reviewDestroy
} = require('../controllers/reviews');

/* POST reviews create /posts/:id/reviews */
router.post('/', asyncErrorHandler(reviewCreate));

/* PUT reviews update /posts/:id/reviews/:review_id */
router.put('/:review_id', asyncErrorHandler(isReviewAuthor), asyncErrorHandler(reviewUpdate));

/* DELETE destroy index /posts/:id/reviews/:review_id */
router.delete('/:review_id', asyncErrorHandler(reviewDestroy));

module.exports = router;

/*
GET index         /reviews
POST create       /reviews
GET edit          /reviews/:id/edit
PUT update        /reviews/:id
DELETE destroy    /reviews/:id
*/