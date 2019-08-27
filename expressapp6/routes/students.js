var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var Student = require('../models/student');

router.post('/create', function (req, res, next) {
    createstudent(req, res);
});

async function createstudent(req, res) {
    var student = new Student({
        rollno: req.body.rollno,
        studentname: req.body.studentname,
        age: req.body.age,
        total: req.body.total,
        creation_dt: Date.now()
    });

    try {
        doc = await student.save((error, registeredstudent) => {
            if (error) {
                console.log(error);
            } else {
                // let payload = { subject: registeredUser._id };
                // let token = jwt.sign(payload, 'secretKey');
                return res.status(200).json(registeredstudent);
            }
        });
        //return res.status(201).json(doc);
    } catch (err) {
        return res.status(501).json(err);
    }
}

router.get('/read', function (req, res, next) {
    readstudent(req, res);
});

async function readstudent(req, res) {
    try {
        Student.find({}, function (err, doc) {
            if (err) throw err;
            if (doc) {
                // return res.status(200).send({ token })
                //console.log(JSON.stringify(doc));
                return res.status(200).json(doc);
                //console.log("Found: " + email + ", pass=" + password);
            }
        });
    } catch (err) {
        return res.status(501).json(err);
    }
}

router.put('/update', function (req, res, next) {
    updatestudent(req, res);
});

async function updatestudent(req, res) {
    
    var myquery = { rollno: req.body.rollno };
    var newvalues = { $set: {studentname: req.body.studentname, age: req.body.age, total: req.body.total } };
  
    try {

        Student.updateOne(myquery,newvalues, (err, doc)=>{
            if (err) throw err;
            console.log("1 document updated");
            return res.status(200).json(doc);
            
        });
    } catch (err) {
        return res.status(501).json(err);
    }
}


router.delete('/delete/:id', function (req, res, next) {
    deletestudent(req, res,req.params.id);
});

async function deletestudent(req, res,id) {
    
    var myquery = { rollno: id };
    try {
        Student.deleteOne(myquery,(err, doc)=>{
            if (err) throw err;
            console.log("1 document deleted !");
            return res.status(200).json(doc);
        });
    } catch (err) {
        return res.status(501).json(err);
    }
}


module.exports = router;
