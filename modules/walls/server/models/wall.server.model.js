'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Wall Schema
 */
var WallSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Wall name',
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
  /*  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }

   Wall_type: {
    type: [{
      type: String,
      enum: ['custom', 'other']
    }],
    default: ['custom'],
    //required: 'Please provide at least one role'
  },

  plain_Wall_Img: {
    type: String,
    default: 'modules/walls/client/img/defaultWall.png'
  },

  Diminsioned_Wall_Img: {
    type: String,
    default: 'modules/walls/client/img/defaultWall.png'
  },

  Wall_with_SVG_Img: {
   type: String,
    default: 'modules/walls/client/img/defaultWall.png'
  },

  svg_Img: {
    type: String,
    default: 'modules/walls/client/img/defaultSVGs.jpg'
  },

  status: {
      {},
      {},
      {}
  },

 /* Artist: {
    type: String,
    trim: true,
    default: '',
    validate: [validateLocalStrategyProperty, 'Please fill in your first name']
  },
*//*
  Wall_info: {
    type: String,
    trim: true,
    default: '',
    validate: [validateLocalStrategyProperty, 'Please fill in your first name']
  },





  lastName: {
    type: String,
    trim: true,
    default: '',
    validate: [validateLocalStrategyProperty, 'Please fill in your last name']
  },
  displayName: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    default: '',
    validate: [validateLocalStrategyEmail, 'Please fill a valid email address']
  },
  username: {
    type: String,
    unique: 'Username already exists',
    required: 'Please fill in a username',
    lowercase: true,
    trim: true
  },
 
  

  updated: {
    type: Date 
  },*/

});

mongoose.model('Wall', WallSchema);
