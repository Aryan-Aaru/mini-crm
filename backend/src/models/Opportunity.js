const mongoose = require('mongoose');

const opportunitySchema = new mongoose.Schema(
  {
    // Reference to the User who created this opportunity
    // This is set from JWT token, never from frontend request
    owner: {
      type: mongoose.Schema.Types.ObjectId, // MongoDB ID of the user
      ref: 'User', // links to User model
      required: true,
    },
    customerName: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true,
    },
    contactName: {
      type: String,
      trim: true,
    },
    contactEmail: {
      type: String,
      trim: true,
      lowercase: true,
    },
    contactPhone: {
      type: String,
      trim: true,
    },
    requirement: {
      type: String,
      required: [true, 'Requirement summary is required'],
      trim: true,
    },
    estimatedValue: {
      type: Number,
      min: [0, 'Value cannot be negative'], // no negative deal values
      default: 0,
    },
    stage: {
      type: String,
      enum: ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Won', 'Lost'],
      default: 'New', // every new opportunity starts at New
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium',
    },
    nextFollowUpDate: {
      type: Date,
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, // auto adds createdAt and updatedAt
  }
);

module.exports = mongoose.model('Opportunity', opportunitySchema);