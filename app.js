var express     = require('express');

var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');
var dotenv    = require('dotenv');


var app         = express();

// DEFINE MODEL
var Book = require('./models/book');
var router = require('./routes')(app, Book);

dotenv.config({ 
  path: './.env' 
});


// [ CONFIGURE mongoose ]
// CONNECT TO MONGODB SERVER
mongoose
.connect(process.env.DB_URL, {
useUnifiedTopology: true,
useNewUrlParser: true,
})
.then(() => console.log('DB Connected!'))
.catch(err => {
console.log(`DB Connection Error: ${err.message}`);
});



// [CONFIGURE APP TO USE bodyParser]
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// [CONFIGURE SERVER PORT]
var port = parseInt(process.env.PORT);

// [CONFIGURE ROUTER]
var router = require('./routes')(app)

// [RUN SERVER]
var server = app.listen(port, function(){
 console.log("Express server has started on port " + port)
});