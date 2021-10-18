
'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var schema = Schema( {
  name: String,
  key: String,
  createdAt: Date,
  ownerId: ObjectId
} );

module.exports = mongoose.model( 'AppKey', schema );
