var express = require('express');
var app = express();

//https://github.com/mongodb/node-mongodb-native
//http://mongodb.github.io/node-mongodb-native/2.0/api/Collection.html
var mongo = require('mongodb').MongoClient;
port = 8019;

//route definition
app.get('/buildings', function(req, response) {  
	// Connect to the db
  	mongo.connect("mongodb://localhost:27017/rooms/", function(err, db) {
			
    	//continue if there is no error
		if(!err)
    	{
			var collection = db.collection('requests');
              
 			collection.distinct('building', function(err, results){
                response.json({results: results});
                response.end();
			});
		}
	});
 });


app.get('/rooms/:building', function(req, response) {  
	// Connect to the db
  	mongo.connect("mongodb://localhost:27017/rooms/", function(err, db) {
			
    	//continue if there is no error
		if(!err)
    	{
			var building = req.params.building;

			var collection = db.collection('requests');
              
 			collection.distinct('room', {building: building}, function(err, results){
                response.json({results: results});
                response.end();
			});
		}
	});
 });


//route definition
app.get('/type/:building/:room', function(req, response) {  
	// Connect to the db
  	mongo.connect("mongodb://localhost:27017/rooms/", function(err, db) {
			
    	//continue if there is no error
		if(!err)
    	{
			var building = req.params.building;
			var room = req.params.room;

			var collection = db.collection('requests');
              
 			collection.distinct('type', {building: building, room: room}, function(err, results){
                response.json({results: results});
                response.end();
			});
		}
	});
 });


//route definition
app.get('/unapprovedRequests', function(req, response) {  
	// Connect to the db
  	mongo.connect("mongodb://localhost:27017/rooms/", function(err, db) {
			
    	//continue if there is no error
		if(!err)
    	{
			var collection = db.collection('requests');
              
 			collection.find({approved: 0}).toArray(
				function(err, results){
	                response.json({results: results});
	                response.end();
				}
			);
		}
	});
 });



//route definition
app.get('/approvedRequests', function(req, response) {  
	// Connect to the db
  	mongo.connect("mongodb://localhost:27017/rooms/", function(err, db) {
			
    	//continue if there is no error
		if(!err)
    	{
			var collection = db.collection('requests');
              
 			collection.find({approved: 1}).toArray(
				function(err, results){
	                response.json({results: results});
	                response.end();
				}
			);
		}
	});
 });



//route definition
app.put('/approveRequest', function(req, response) {  
	// Connect to the db
  	mongo.connect("mongodb://localhost:27017/rooms/", function(err, db) {
			
    	//continue if there is no error
		if(!err)
    	{
			var id = req.body.id;

			var collection = db.collection('requests');
              
 			collection.update({_id: id}, {approved: 1}, function(err, results){
                response.json({results: results});
                response.end();
			});
		}
	});
 });



//route definition
app.delete('/disapproveRequest', function(req, response) {  
	// Connect to the db
  	mongo.connect("mongodb://localhost:27017/rooms/", function(err, db) {
			
    	//continue if there is no error
		if(!err)
    	{
			var id = req.body.id;

			var collection = db.collection('requests');
              
 			collection.delete({_id: id}, function(err, results){
                response.json({results: results});
                response.end();
			});
		}
	});
 });

//route definition
app.post('/makeRequest', function(req, response) {  
	// Connect to the db
  	mongo.connect("mongodb://localhost:27017/rooms/", function(err, db) {
			
    	//continue if there is no error
		if(!err)
    	{
        	var newRequest = {
				building: req.body.building,
            	room: req.body.room,
            	firstName: req.body.firstName,
            	lastName: req.body.lastName,
            	startTime: req.body.startTime,
            	stopTime: req.body.stopTime,
            	date: req.body.date
            };

			var collection = db.collection('requests');
              
 			collection.insert(newRequest, function(err, results){
                response.json({results: results});
                response.end();
			});
		}
	});
 });


//route definition
app.post('/validateUser/', function(req, response) {  
	// Connect to the db
  	mongo.connect("mongodb://localhost:27017/rooms/", function(err, db) {
			
    	//continue if there is no error
		if(!err)
    	{
			var user = req.body.user;
            var password = req.body.password;

			var collection = db.collection('users');
              
 			collection.find({user: user, password: password}).toArray(
            	function(err, results){
                	response.json({results: results});
                	response.end();
				}
            );
		}
	});
 });

app.listen(port);
console.log('Running API on port ' + port);
