var express = require('express');
var router = express.Router();
var serveIndex = require('serve-index');
var path = require('path');
var jade = require('jade');
var consolidate = require('consolidate');
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.raw());
app.use(bodyParser.text());

router.post('/api',async(req,res)=>{
  res.json({
    name:'cuong',
    age:20
    
  })
})
//Parameters
var users = {
  'azat': {
    email: 'hi@azat.co',
    website: 'http://azat.co',
    blog: 'http://webapplog.com'
  }
};
var findUserByUsername = function (username, callback) {
  // Perform database query that calls callback when it's done
  // This is our fake database
  if (!users[username])
    return callback(new Error(
      'No user matching '
      + username
    )
    );
  return callback(null, users[username]);
};

router.get('/v1/users/:username', function (request, response, next) {
  var username = request.params.username;
  findUserByUsername(username, function (error, user) {

    console.log('userinfo ')
    console.log(user)
    if (error) return next(error); 
    return response.render('user', );
  });
});
router.get('/v1/admin/:username', function (request, response, next) {
  var username = request.params.username;
  findUserByUsername(username, function (error, user) {
    if (error) return next(error);
    return response.render('admin', user);
  });
});

//

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
//Enhancing the App
router.get('/name/:user_name', function (req, res) {
  res.status(200);
  res.set('Content-Type', 'text/html');
  res.end('<html><body>' +
    '<h1>Hello ' + req.params.user_name + '</h1>' +
    '</body></html>'
  );
});


router.get('/users', function (request, response) {
  response.send('users');
});

router.get('/users/:id', function (request, response) {
  response.send('users is' + request.params.id);
});
// router.get('*', function (request, response) {
//   response.end('Hello World trong *');
// });

//request.params
router.get('/params/:role/:name/:status', function(req, res) {
  console.log('role is:',req.params.role);
  });
//request.body
router.post('/body', function(req, res){
  console.log(req.body);
  res.end(JSON.stringify(req.body)+'\r\n');
  });

  //api
  router.post('/api/dang-nhap', function(req,res){
  if(req.body.username=='tmduc' && req.body.password=='123'){
    var token = jwt.sign({ten :'Tran Minh Duc'},'tmduc01',{algorithm :'HS256',expiresIn:'3h'})
    res.json({access_token:token});
  }else{
    res.send("Dang nhap that bai");
  }
});

router.use(function(req,res,next){
  if(req.headers && req.headers.authorization && String(req.headers.authorization.split(' ')[0]).toLowerCase()==='bearer'){
    var token = req.headers.authorization.split(' ')[1];
    jwt.verify(token,'tmduc01',function(err,decode){
      if(err)
        return res.status(403).send({
          message:'Token invalid'
        });
        else
        return next();
    });
  }
  else{
    return res.status(403).send({
      message: "Unauthorized"
    }
    )}
});

router.get('/api/test', function(req,res){
  res.send("hello");
});
// ... Define the routes

module.exports = router;
