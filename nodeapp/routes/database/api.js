/*************************************
 * 
 * Web API for get data from database
 * 
 * /database/api/XXXX
 * 
***************************************/

var express = require('express');
var axios = require('axios');
var router = express.Router();

var func = require('./func.js');

// get all users list
router.get('/users', function(req, res) {
    func.get_all_user(function (result) {
        res.send(result);
    });
});

// check exist user
router.get('/existuser', function(req, res) {
    func.exist_user(req.query.usernm, function (result) {
        res.send(result);
    });
});

// add user
router.post('/adduser', function(req, res) {
    func.add_user(req.body.usernm, function (result) {
        if (result.result) {
            axios.post('/userfile/api/dircreate', {
                userid: req.body.usernm
            })
            .then(function (response) {
                res.send(result);
            })
            .catch(function (error) {
                console.log(error);
                res.send(result);
            });
        } else {
            res.send(result);
        }
    });
});

// delete user
router.post('/deluser', function(req, res) {
    func.delete_user(req.body.usernm, function (result) {
        if (result.result) {
            axios.post('/userfile/api/dirdelete', {
                userid: req.body.usernm
            })
            .then(function (response) {
                res.send(result);
            })
            .catch(function (error) {
                console.log(error);
                res.send(result);
            });
        } else {
            res.send(result);
        }
    });
});

module.exports = router;