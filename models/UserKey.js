
'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var schema = Schema( {
  createdAt: Date,
  ownerId: ObjectId  // if they register and claim this userid
} );

module.exports = mongoose.model( 'UserKey', schema );
