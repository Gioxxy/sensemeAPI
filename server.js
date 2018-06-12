var express    = require('express');        // call express
var app        = express();                 // define app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var mongoDB = require('mongodb');
var router = express.Router();              // Instance of the express Router

//Import Models
var User = require("./models/user");
var PositionData = require("./models/positionData");


//Configure app to use bodyParser()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', express.static(__dirname + '/public'));

port = process.env.PORT || 3000;

//Connection
mongoose.connect('mongodb://IOxxy:Gionny99@ds139690.mlab.com:39690/senseme');
	
mongoose.Promise = global.Promise;

var db = mongoose.connection;

//GET
// Ritorna tutte le email e gli id di tutti gli utenti
router.route('/allUsers').get(function(req, res) {
    User.allUsers(function(err, users) {
        if (err) res.send(err);

        res.json(users);
    });
});

// Ritorna id, email e positionData di un utente
router.route('/userData/:email').get(function(req, res) {

    PositionData.userData(req.params.email, function(err, data) {
        if (err) res.send(err);

        res.json(data);
    });
});

//POST
// Crea un nuovo utente data l'email e password
router.route('/createUser').post(function(req, res) {

	console.log("* createUser" + req.body.email);

	var data = {
		            "email": req.body.email,
		            "password": req.body.password
		        };

	
    User.createUser(data, function(err, user) {
        if (err) res.send(err);
        
		res.json(user);
    });
});

//Login utente
router.route('/login').post(function(req, res) {
	var data = {
		            "email": req.body.email,
		            "password": req.body.password
		        };

    User.user(data, function(err, user) {
        if (err) res.send(err);

        res.json(user);
    });
});

// Salva una nuova serie di posizioni data l'email e la serie
router.route('/storeNewData').post(function(req, res) {

	var data = {
		            "email": req.body.email,
		            "datetime": new Date(),
		            "positionData": req.body.positionData
		        };

	
    PositionData.storeNewData(data, function(err, positionData) {
        if (err) res.send(err);
        
		res.json(positionData);
    });
});

//Gestisce tutte le eccezioni non previste
process.on('uncaughtException', function(err) {
  console.log('Caught exception: ' + err);
});


app.use('/api', router);
app.listen(port);
console.log('todo list RESTful API server started on: ' + port);