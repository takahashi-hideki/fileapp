var express = require('express');
var router = express.Router();

var dbFunc = require('./database/func.js');

router.post('/login', function(req, res, next) {
    var result = {};
    // ユーザー名がない場合はユーザー未登録
    if (!req.body.userid) {
        result = {
            result: false,
            error: 'input user.'
        };

        res.json(result);
    } else {
        dbFunc.exist_user(req.body.userid, function(exists) {
            if (exists) {
                // 認証
                req.session.user = { userid: req.body.userid };
        
                result = {
                    result: true,
                    error: ''
                };
        
                res.json(result);
            } else {
                // ユーザー未登録
                result = {
                    result: false,
                    error: 'the user is not registered.'
                };
        
                res.json(result);
            }
        });
    }
});

module.exports = router;