var https = require('https');

var Minutedock = function (authCredentials) {

    var self = this;
    this.authCredentials = authCredentials;

    this.api = {
        accounts:{
            all:function (callback) {
                return self.request('accounts.json', "GET", function (err, accounts) {
                    callback(err, accounts);
                });
            },
            active:function (callback) {
                return self.request('accounts/current.json', "GET", function (err, account) {
                    callback(err, account);
                });
            }
        },
        users:{
            all:function (accountID, callback) {
                var data = { account_id:accountID }
                return self.request('users.json', "GET", data, function (err, accounts) {
                    callback(err, accounts);
                });
            }
        },
        entries:{
            current:function (callback) {
                return self.request('entries/current.json', "GET", function (err, accounts) {
                    callback(err, accounts);
                });
            },
            update:function (id, data, callback) {
                var form_data = { entry:data };
                return self.request('entries/' + id + '.json', "PUT", form_data, function (err, accounts) {
                    callback(err, accounts);
                });
            },
            start:function (callback) {
                return self.request('entries/current/start.json', "POST", function (err, entry) {
                    callback(err, entry);
                });
            },
            pause:function (callback) {
                return self.request('entries/current/pause.json', "POST", function (err, entry) {
                    callback(err, entry);
                });

            },
            log:function (callback) {
                return self.request('entries/current/log.json', "POST", function (err, entry) {
                    callback(err, entry);
                });
            },
            new:function (accountID, data, callback) {
                var form_data = {
                    entry:data,
                    account_id:accountID
                };
                return self.request('entries.json', "POST", form_data, function (err, accounts) {
                    callback(err, accounts);
                });
            },
            search:function (data, callback) {
                return self.request('entries.json', "GET", data, function (err, accounts) {
                    callback(err, accounts);
                });
            }
        },
        contacts:{
            all:function (accountID, callback) {
                var data = { account_id:accountID };
                return self.request('contacts.json', "GET", data, function (err, accounts) {
                    callback(err, accounts);
                });
            },
            new:function (accountID, data, callback) {
                var form_data = {
                    contact:data,
                    account_id:accountID
                };
                return self.request('contacts.json', "POST", form_data, function (err, accounts) {
                    callback(err, accounts);
                });
            },
            update:function (id, data, callback) {
                var form_data = { contact:data };
                return self.request('contacts/' + id + '.json', "PUT", form_data, function (err, accounts) {
                    callback(err, accounts);
                });
            }
        },
        tasks:{
            all:function (accountID, callback) {
                var data = {account_id:accountID };
                return self.request('tasks.json', "GET", data, function (err, accounts) {
                    callback(err, accounts);
                });
            },
            new:function (accountID, data, callback) {
                var form_data = {
                    task:data,
                    account_id:accountID
                };
                return self.request('tasks.json', "POST", form_data, function (err, accounts) {
                    callback(err, accounts);
                });
            },
            update:function (id, data, callback) {
                var form_data = { task:data };
                return self.request('tasks/' + id + '.json', "PUT", form_data, function (err, accounts) {
                    callback(err, accounts);
                });
            },
            delete:function (id, callback) {
                return self.request('tasks/' + id + '.json', "DELETE", function (err, accounts) {
                    callback(err, accounts);
                });
            },
            archive:function (id, callback) {
                return self.request('tasks/' + id + '/archive.json', "POST", function (err, accounts) {
                    callback(err, accounts);
                });
            }
        },
        projects:{
            all:function (accountID, callback) {
                var data = { account_id:accountID };
                return self.request('projects.json', "GET", data, function (err, accounts) {
                    callback(err, accounts);
                });
            },
            new:function (accountID, data, callback) {
                var form_data = {
                    project:data,
                    account_id:accountID
                };
                return self.request('projects.json', "POST", form_data, function (err, accounts) {
                    callback(err, accounts);
                });
            },
            update:function (id, data, callback) {
                var form_data = { project:data };
                return self.request('projects/' + id + '.json', "PUT", form_data, function (err, accounts) {
                    callback(err, accounts);
                });
            },
            delete:function (id, callback) {
                return self.request('projects/' + id + '.json', "DELETE", function (err, accounts) {
                    callback(err, accounts);
                });
            },
            archive:function (id, callback) {
                return self.request('projects/' + id + '/archive.json', "POST", function (err, accounts) {
                    callback(err, accounts);
                });
            }
        }
    };

    return this.api;
};

Minutedock.prototype.request = function (path, method, form_data, callback) {

    var data = { };
    if (arguments.length == 3) {
        callback = form_data;
    } else {
        data = form_data;
    }
    
    var urlPath = "/api/v1/" + path;
    if (method === "GET") {
        urlPath += "?";
        if (data["account_id"]) urlPath += "&account_id=" + data["account_id"];
    }

    var dataString = JSON.stringify(data);

    var headers = {
        'Content-Type':'application/json',
        'Content-Length':dataString.length,
        'Authorization' : 'Basic ' + this.authCredentials
    };

    var options = {
        "host":'minutedock.com',
        "path":urlPath,
        "method":method,
        "headers":headers
    };

    var req = https.request(options, function (res) {
        var json = '';
        res.on('data',function (chunk) {
            json = chunk.toString();
        }).on('end', function () {
                if (res.statusCode != 200) {
                    console.error('MinuteDock API error: ' + res.statusCode + ' ' + options.path);
                    callback(true, {'status':res.statusCode});
                    return;
                }
                callback(false, JSON.parse(json));
            });
    });

    req.write(dataString);
    req.end();
};

module.exports = Minutedock;