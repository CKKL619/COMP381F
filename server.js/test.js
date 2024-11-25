var express             = require('express'),
    app                 = express(),
    passport            = require('passport'),
    FacebookStrategy    = require('passport-facebook').Strategy,
    session             = require('express-session');

app.set('view engine', 'ejs');

const express = require('express'};
const app = express();
const bodyParser = require('body-parser');

var users = [{fbId:"/auth/facebook/login/username", passWord:"/auth/facebook/login/password"}]

app.use(bodyParser.urlencoded({extended: true}));
 
app.use((req,res,next) => {
    console.log(Date(Date.now()).toString()+', request by '+req.params.fbId);  
    next();
});

const isLoggedIn = (req,res,next) => {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
}

app.get("/login", function (req, res) {
	res.status(200).render('login');
});
app.get("/auth/facebook", passport.authenticate("facebook", { scope : "email" }));
app.get("/auth/facebook/callback",
    passport.authenticate("facebook", {
        successRedirect : "/content",
        failureRedirect : "/",
        failureFlash : true
}));


app.get('/', isLoggedIn,  (req,res) => {
    res.redirect('/content');
})

app.get("/content", isLoggedIn, function (req, res) {
    res.render('list', {user: req.user});
});

app.get("/logout", function(req, res) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

app.get('/*', (req,res) => {
    res.status(404).render('info', {message: `${req.path} - Error request!` });
})

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
		res.status(200).json(users).end();
	}else{
		console.log('Facebook id does not exist')
		res.status(500).json({msg: 'error: Facebook id does not exist'});
	}
});

app.put('/api/users/fbId/:fbId', function(req,res)=>{
	users.forEach((user)=>{
		if(user.studentId == req.params.fbId){
			user.passWord = req.body.passWord;
			console.log('password of '+ user.fbId+' has been updated.');
			res.status(200).json(users).end();
		}else{
			console.log('incorrect Facebook id');
			res.status(500).json({msg: 'error: incorrect Facebook id'});
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
		res.status(200).json(users).end();
	}else{
		console.log('Facebook id does not exist')
		res.status(500).json({msg: 'error: Facebook id does not exist'});
	}
});

const port = process.env.PORT || 8099;
app.listen(port, () => {console.log(`Listening at http://localhost:${port}`);});
