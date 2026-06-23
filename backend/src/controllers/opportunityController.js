const Opportunity = require('../models/Opportunity');

// @route   GET /api/opportunities
// @access  Private (all logged in users can view)
const getOpportunities = async (req, res) => {
  try {
    // Fetch ALL opportunities (shared pipeline)
    // .populate() replaces owner ID with actual user name and email
    const opportunities = await Opportunity.find()
      .populate('owner', 'name email')
      .sort({ createdAt: -1 }); // newest first

    res.json(opportunities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   GET /api/opportunities/:id
// @access  Private
const getOpportunityById = async (req, res) => {
  try {
    // Find opportunity by ID from URL parameter
    const opportunity = await Opportunity.findById(req.params.id).populate(
      'owner',
      'name email'
    );

    if (!opportunity) {
      return res.status(404).json({ message: 'Opportunity not found' });
    }

    res.json(opportunity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   POST /api/opportunities
// @access  Private
const createOpportunity = async (req, res) => {
  try {
    const {
      customerName,
      contactName,
      contactEmail,
      contactPhone,
      requirement,
      estimatedValue,
      stage,
      priority,
      nextFollowUpDate,
      notes,
    } = req.body;

    // Validate required fields
    if (!customerName || !requirement) {
      return res
        .status(400)
        .json({ message: 'Customer name and requirement are required' });
    }

    // owner is set from JWT token via req.user
    // NEVER from frontend request body (security requirement)
    const opportunity = await Opportunity.create({
      owner: req.user._id,
      customerName,
      contactName,
      contactEmail,
      contactPhone,
      requirement,
      estimatedValue,
      stage,
      priority,
      nextFollowUpDate,
      notes,
    });

    res.status(201).json(opportunity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   PUT /api/opportunities/:id
// @access  Private (only owner can update)
const updateOpportunity = async (req, res) => {
  try {
    // Find the opportunity first
    const opportunity = await Opportunity.findById(req.params.id);

    if (!opportunity) {
      return res.status(404).json({ message: 'Opportunity not found' });
    }

    // OWNERSHIP CHECK - backend validation (most important security step)
    // Compare opportunity owner ID with logged in user ID
    if (opportunity.owner.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: 'Not authorized to update this opportunity' });
    }

    // Update allowed fields only
    const {
      customerName,
      contactName,
      contactEmail,
      contactPhone,
      requirement,
      estimatedValue,
      stage,
      priority,
      nextFollowUpDate,
      notes,
    } = req.body;

    // Only update fields that were actually sent
    if (customerName) opportunity.customerName = customerName;
    if (contactName) opportunity.contactName = contactName;
    if (contactEmail) opportunity.contactEmail = contactEmail;
    if (contactPhone) opportunity.contactPhone = contactPhone;
    if (requirement) opportunity.requirement = requirement;
    if (estimatedValue !== undefined) opportunity.estimatedValue = estimatedValue;
    if (stage) opportunity.stage = stage;
    if (priority) opportunity.priority = priority;
    if (nextFollowUpDate) opportunity.nextFollowUpDate = nextFollowUpDate;
    if (notes !== undefined) opportunity.notes = notes;

    const updated = await opportunity.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   DELETE /api/opportunities/:id
// @access  Private (only owner can delete)
const deleteOpportunity = async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);

    if (!opportunity) {
      return res.status(404).json({ message: 'Opportunity not found' });
    }

    // OWNERSHIP CHECK - backend validation
    if (opportunity.owner.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: 'Not authorized to delete this opportunity' });
    }

    await opportunity.deleteOne();
    res.json({ message: 'Opportunity deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getOpportunities,
  getOpportunityById,
  createOpportunity,
  updateOpportunity,
  deleteOpportunity,
};