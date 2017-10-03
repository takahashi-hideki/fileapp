/*************************************
 * 
 * Web API for file control
 * 
 * /userfile/api/XXXX
 * 
***************************************/

var express = require('express');
var fs = require('fs-extra');
var multer = require('multer');

var router = express.Router();

var func = require('./func.js');

var upload = multer({ dest: './temp/'}).single('uploadfile');

// get session user
router.get('/sessionuser', function(req, res) {
  var result = func.login_check(req, null);
  res.send({ login: result.login, userid: result.userid });
});

// get file list
router.get('/filelist', function(req, res) {
  var result = {};
  if (!req.query.userid) {
    result = {
      files: [],
      error: 'no userid'
    };
    res.send(result);

  } else {
    var login = func.login_check(req, req.query.userid);
    if (!login.login) {
      result = {
        files: [],
        error: 'no session'
      };
      res.send(result);

    } else if (!login.user) {
      result = {
        files: [],
        error: 'changed userid'
      };
      res.send(result);

    } else {
      fs.readdir('./userfile/' + req.query.userid, function (err, files) {
        if (err) {
          result = {
            files: [],
            error: 'get files error'
          };
          console.log(err);
          res.send(result);

        } else {
          result = {
            files: files,
            error: ''
          };
          res.send(result);
        }
      });
    }
  } 
})

// upload file
router.post('/upload', function (req, res) {
  var result = {};
  upload(req, res, function (err) {
    if (err) {
      console.log(err);
      result = {
        result: false,
        error: 'upload error'
      };
      res.send(result);
    } else {
      if (!req.body.userid) {
        result = {
          result: false,
          error: 'no userid'
        };
        res.send(result);
    
      } else {
        var login = func.login_check(req, req.body.userid);
        if (!login.login) {
          result = {
            result: false,
            error: 'no session'
          };
          res.send(result);
        
        } else if (!login.user) {
          result = {
            result: false,
            error: 'changed userid'
          };
          res.send(result);
    
        } else {
          var tempPath = req.file.destination + req.file.filename;
          var savePath = './userfile/' + req.body.userid + '/' + req.file.originalname;
          fs.rename(tempPath, savePath, function (err) {
            if (err) {
              console.log(err);
              result = {
                result: false,
                error: 'file move error(temp->save)'
              };
              res.send(result);
            } else {
              result = {
                result: true,
                error: ''
              };
              res.send(result);
            }
          });
        }
      }
    }
  });
});

// delete file
router.post('/delete', function (req, res) {
  var result = {};

  if (!req.body.userid) {
    result = {
      result: false,
      error: 'no userid'
    };
    res.send(result);

  } else {
    var login = func.login_check(req, req.body.userid);
    if (!login.login) {
      result = {
        result: false,
        error: 'no session'
      };
      res.send(result);
    
    } else if (!login.user) {
      result = {
        result: false,
        error: 'changed userid'
      };
      res.send(result);

    } else {
      var filePath = './userfile/' + req.body.userid + '/' + req.body.filename;
      fs.unlink(filePath, function (err) {
        if (err) {
          if (err.code === 'ENOENT') {
            result = {
              result: false,
              error: 'not exist file'
            };
            res.send(result);

          } else {
            result = {
              result: false,
              error: 'delete error'
            };
            res.send(result);

          }
        } else {
          result = {
            result: true,
            error: ''
          };
          res.send(result);

        }
      });
    }
  }
});

// create directory
router.post('/dircreate', function (req, res) {
  var result = {};
  if (!req.body.userid) {
    result = {
      result: false,
      error: 'no userid'
    };
    res.send(result);

  } else {
    var dirname = './userfile/' + req.body.userid;
    fs.mkdirp(dirname, function (err) {
      if (err) {
        result = {
          result: false,
          error: 'create error'
        };
        res.send(result);

      } else {
        result = {
          result: true,
          error: ''
        };
        res.send(result);

      }
    });
  }
});

// delete directory
router.post('/dirdelete', function (req, res) {
  var result = {};
  if (!req.body.userid) {
    result = {
      result: false,
      error: 'no userid'
    };
    res.send(result);

  } else {
    var dirname = './userfile/' + req.body.userid;
    fs.remove(dirname, function (err) {
      if (err) {
        if (err.code === 'ENOENT') {
          result = {
            result: false,
            error: 'not exist directory'
          };
          res.send(result);

        } else {
          result = {
            result: false,
            error: 'delete error'
          };
          res.send(result);

        }
      } else {
        result = {
          result: true,
          error: ''
        };
        res.send(result);

      }
    });
  }
});

// file download
router.get('/download', function (req, res) {
  var result = {};
  if (!req.query.userid) {
    result = {
      result: false,
      error: 'no userid'
    };
    res.send(result);

  } else {
    var login = func.login_check(req, req.query.userid);
    if (!login.login) {
      result = {
        result: false,
        error: 'no session'
      };
      res.send(result);

    } else if (!login.user) {
      result = {
        result: false,
        error: 'changed userid'
      };
      res.send(result);

    } else {
      if (!req.query.filename) {
        result = {
          result: false,
          error: 'no filename'
        };
        res.send(result);

      } else {
        var filePath = './userfile/' + req.query.userid + '/' + req.query.filename;
        res.download(filePath, req.query.filename, function (err) {
          if (err) {
            console.log(err);
          }
        })
      }
    }
  }
});

module.exports = router;