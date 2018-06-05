'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = null;


var UserSchema = new Schema({
	email: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true    
	}
});

var User = module.exports = mongoose.model('User', UserSchema, 'users');

module.exports.allUsers = function(callback){
	User.find({}).select('email').exec(callback);
}
module.exports.user = function(email, callback){
	User.find({'email': email}).exec(callback);
}
module.exports.createUser = function(data, callback){
	User.create(data,callback);
}