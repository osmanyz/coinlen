const mongoose = require("mongoose");

/**
 * types: web, server
 */
const schema = mongoose.Schema({
  type: {
    type: String,
    index: true,
  },
  path: {
    type: String,
    index: true,
    default: null,
  },
  method: {
    type: String,
    index: true,
    default: null,
  },
  url: {
    type: String,
  },
  description: {
    type: String,
    default: null,
    index: true,
  },
  error: {
    type: Object,
    default: {}
  },
  user: {
    type: Object,
    default: {}
  },
  userId: {
    type: String,
    default: null,
    index: true,
  },
  userEmail: {
    type: String,
    default: null,
    index: true,
  },
  userAgent: {
    type: String,
    index: true,
  },
  ipAddress: {
    type: String,
    index: true,
  },
  request: {
    type: Object,
    default: {}
  },
}, {
  timestamps: {
    createdAt: true,
    updatedAt: true
  }
});

schema.statics.findOneById = function (id, callback) {
  return this.findOne({_id: id}, callback);
};

module.exports = mongoose.model("Log", schema);
