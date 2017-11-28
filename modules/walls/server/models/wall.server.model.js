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
  picture: { type: String, required: true
  },
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
  },
  serviceRequested: {
    type: [{
      type: String,
      enum: ['Custom', 'Logo','DIY']
    }],
    default: ['Custom']
  },
  wall_info: {
    length: {
      type: String,
      required: true,
      default:'1'
    },

    height: {
      type: String,
      required: true,
      default:'1'
    },
    address: {
      type: String,
      required: true,
      default:''
    },

    loc_type: {
      type: String,
      required: true,
      default: 'home',
    },

    material: {
      type: String,
      required: true,
      default:'none'
    },

    finish: {
      type: String,
      required: true,
      default:'none'
    },

    paint_name: {
      type: String,
      required: true,
      default:'none'
    },

    paint_type: {
      type: String,
      required: true,
      default:'none'
    },

    prep_req: {
      type: String,
      required: false,
      default:'none'
    },

    paint_req: {
      type: String,
      required: true,
      default:'none'
    },
    recolor: {
      type: String,
      required: true,
      default:'none'
    },

  },


  Wall_type: {
    type: String,
    required: true,
    default: 'custom',
    //required: 'Please provide at least one role'
  },

  Wall_Imges: {
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
  },

  status: {

    paid: {
      type: Boolean,
      default: false,
    },
    price: {
      type: String,
      default: ''
    },

    matched: {
      type: Boolean,
      default: false,
    },

    completed: {
      type: Boolean,
      default: false,
    },

    hasQuote: {
      type: Boolean,
      default: false,
    },

    comment: {
      type: String,
      default:''
    }
  },

  Artist_info: {
    firstName: {
      type: String,
      required: false,
      default: ''
    },
    lastName: {
      type: String,
      required: false,
      default: ''
    },
    ID: {
      type: String,
      required: false,
      default: ''
    }
  },
  price: {
    type: String,
    default: ''
  },
  Artist: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  updated: {
    type: Date
  }

});

mongoose.model('Wall', WallSchema);
