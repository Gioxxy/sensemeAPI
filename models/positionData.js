'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = null;


var PositionDataSchema = new Schema({
	email: {
		type: String,
		required: true
	},
	datetime:{
		type: Date,
		required: true
	},
	positionData: {
		type: String,
		required: true    
	}
});

var PositionData = module.exports = mongoose.model('PositionData', PositionDataSchema, 'positionData');

module.exports.storeNewData = function(data, callback){
	PositionData.create(data,callback);
}
module.exports.userData = function(email, callback){
	PositionData.find({'email': email}).exec(callback);
}