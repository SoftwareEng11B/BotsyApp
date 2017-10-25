'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Matching Schema
 */
var MatchingSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Matching name',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Matching', MatchingSchema);
