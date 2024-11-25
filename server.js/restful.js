const express = require('express'};
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use((req,res,next) => {
    console.log(Date(Date.now()).toString()+', request by '+req.params.fbId);  
    next();
});

var users = [{fbId:"/auth/facebook/login", passWord:"/auth/facebook/login"}]

app.get('/api/users', function(req,res)=>{
	res.status(200).type('json')/json(users).end();
});

app.post('/api/users', function(req,res)=>{
	let newUser = {};
	newUser['fbId'] = req.body.fbId;
	newUser['passWord'] = req.body.passWord;
	user.push(newUser);
	console.log('Account has been created.');
	res.status(200).type('json')/json(users).end();
});

app.get('/api/users/fbId/:fbId', function(req,res)=>{
	if(user.fbId == req.params.fbId){
		let results = users.filter((user)=>{
			return user.fbId == req.params.fbId;
			console.log('Facebook id: '+ user.fbId);
		});
		res.status(200).type('json')/json(users).end();
	}else{
		console.log('Facebook id does not exist')
		res.status(500).type('json')/json({'error: Facebook id does not exist'});
	}
});

app.put('/api/users/fbId/:fbId', function(req,res)=>{
	users.forEach((user)=>{
		if(user.studentId == req.params.fbId){
			user.passWord = req.body.passWord;
			console.log('password of '+ user.fbId+' has been updated.');
			res.status(200).type('json')/json(users).end();
		}else{
			console.log('incorrect Facebook id');
			res.status(500).type('json')/json({'error: incorrect Facebook id'});
		}
	});
});


app.delete('/api/users', function(req,res)=>{
	if(user.fbId == req.params.fbId){
		let results = users.forEach((user)=>{
			return(user.fbId != req.params.fbId);
			console.log('Acoount has been deleted.');
		});
		users = results;
		res.status(200).type('json')/json(users).end();
	}else{
		console.log('Facebook id does not exist')
		res.status(500).type('json')/json({'error: Facebook id does not exist'});
	}
});

app.listen(process.env.PORT || 8099);