const { Client } = require('pg');
const connStr = 'postgresql://postgres:psg@localhost:5432/fileapp'

exports.get_all_user = function (callback) {
    var result = [];
    var client = new Client({
        connectionString: connStr
    });
    client.connect();
    client.query('SELECT usernm FROM users ORDER BY usernm')
        .then(res => {
            callback(res.rows);
            client.end();
        })
        .catch(err => {
            console.log(err);
        });
};

exports.exist_user = function (usernm, callback) {
    if (!usernm) {
        callback(false);
        return;
    }

    var result = false;
    var client = new Client({
        connectionString: connStr
    });
    client.connect();
    client.query('SELECT 1 FROM users WHERE usernm = $1 LIMIT 1', [usernm])
        .then(res => {
            if (res.rowCount > 0) {
                callback(true);
            } else {
                callback(false);
            }
            client.end();
        })
        .catch(err => {
            console.log(err);
        });
};

exports.add_user = function (usernm, callback) {
    var result = {};

    if (!usernm) {
        result = {
            result: false,
            error: 'input user'
        };
        callback(result);
    } else {
        this.exist_user(usernm, function (exists) {
            if (!exists) {
                // ユーザー追加
                var client = new Client({
                    connectionString: connStr
                });
                client.connect();
                client.query('INSERT INTO users (usernm) VALUES ($1)', [usernm])
                    .then(res => {
                        result = {
                            result: true,
                            error: ''
                        };
                        callback(result);
                    })
                    .catch(err => {
                        result = {
                            result: false,
                            error: 'database error'
                        };
                        callback(result);
                    });
            } else {
                result = {
                    result: false,
                    error: 'already exists'
                };
                callback(result);
            }
        });
    }
}

exports.delete_user = function (usernm, callback) {
    var result = {};

    if (!usernm) {
        result = {
            result: false,
            error: 'input user'
        };
        callback(result);
    } else {
        this.exist_user(usernm, function (exists) {
            if (exists) {
                // ユーザー削除
                var client = new Client({
                    connectionString: connStr
                });
                client.connect();
                client.query('DELETE FROM users WHERE usernm = $1', [usernm])
                    .then(res => {
                        result = {
                            result: true,
                            error: ''
                        };
                        callback(result);
                    })
                    .catch(err => {
                        result = {
                            resutl: false,
                            error: 'database error'
                        };
                        callback(result);
                    });
            } else {
                result = {
                    result: false,
                    error: 'not exist'
                };
                callback(result);
            }
        });
    }
}