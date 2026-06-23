const express = require('express');
const router = express.Router();
const {
  getOpportunities,
  getOpportunityById,
  createOpportunity,
  updateOpportunity,
  deleteOpportunity,
} = require('../controllers/opportunityController');
const { protect } = require('../middleware/authMiddleware');

// protect middleware is applied to ALL routes below
// meaning every route requires a valid JWT token

// @route   GET /api/opportunities
// @route   POST /api/opportunities
router
  .route('/')
  .get(protect, getOpportunities)     // get all opportunities
  .post(protect, createOpportunity);  // create new opportunity

// @route   GET /api/opportunities/:id
// @route   PUT /api/opportunities/:id
// @route   DELETE /api/opportunities/:id
router
  .route('/:id')
  .get(protect, getOpportunityById)   // get single opportunity
  .put(protect, updateOpportunity)    // update opportunity
  .delete(protect, deleteOpportunity); // delete opportunity

module.exports = router;