app.set('view engine', 'ejs');

app.get('/', function(req, res){res.render('index', {title:"Home Page"});});

var express = require('express');
var app = express();
function greetingMSG(){
	var today = new Date();
	var hour = today.getHours();
	if(hour > 18){
		message = 'Good evening';
	}
	else if(hour > 12){
		message = 'Good afternoon';
	}
	else{
		message = 'Good morning';
	}
	return message
}
app.get('/', function(req, res){res.render({greeting, greetingMSG()});});

app.get('/', function(req, res){res.render({user.name});});