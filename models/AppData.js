/*
  This collection holds key/value pairs
  for a particular user and a particular app
  It is designed to be used as a cloud store
  for mobile apps. The user's need to first login
  to this website and get a PIN which they then
  enter into their app and it identifies them
*/
'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var schema = Schema( {
  valueKey: String,
  value: String,
  createdAt: Date,
  userKey:String,
  appKey: String,
} );

module.exports = mongoose.model( 'AppData', schema );
