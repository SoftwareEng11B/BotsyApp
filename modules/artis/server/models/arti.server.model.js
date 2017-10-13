'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Arti Schema
 */
var ArtiSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Arti name',
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

mongoose.model('Arti', ArtiSchema);
