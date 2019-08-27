var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require('../models/user');
/* GET users listing. */
// router.get('/', function(req, res) {
//   res.send('respond with a resource');
// });

router.post('/register', function (req, res, next) {
  addToDB(req, res);
});

async function addToDB(req, res) {
  var user = new User({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    creation_dt: Date.now()
  });

  try {
    doc = await user.save((error, registeredUser) => {
      if (error) {
        console.log(error);
      } else {
        let payload = { subject: registeredUser._id };
        let token = jwt.sign(payload, 'secretKey');
        return res.status(200).send({ token });
      }
    });
    //return res.status(201).json(doc);
  } catch (err) {
    return res.status(501).json(err);
  }
}

router.post('/login', function (req, res, next) {
  ToCheck(req, res);
});

async function ToCheck(req, res) {
  try {
    User.findOne({ email: req.body.email, password: req.body.password }, function (err, doc) {
      if (err) throw err;
      if (doc) {
        console.log(JSON.stringify(doc));
        let payload = { subject: doc._id };
        let token = jwt.sign(payload, 'secretKey')
        return res.status(200).send({ token })
        //return res.status(201).json(doc);
        //console.log("Found: " + email + ", pass=" + password);
      }
    });
  } catch (err) {
    return res.status(501).json(err);
  }
}




// router.post('/login',function(req,res,next){
//   passport.authenticate('local', function(err, user, info) {
//     if (err) { return res.status(501).json(err); }
//     if (!user) { return res.status(501).json(info); }
//     req.logIn(user, function(err) {
//       if (err) { return res.status(501).json(err); }
//       return res.status(200).json(info);
//     });
//   })(req, res, next);
// });

module.exports = router;
