var request = require('request');
var Q = require('q');
var config = require('konfig')().app;
var Minutedock = function (apiKey) {

    var self = this;
    this.apiKey = apiKey;

    this.api = {
        accounts:{
            all:function () {
                return self.request('accounts.json', "GET");
            },
            active:function () {
                return self.request('accounts/current.json', "GET");
            }
        },
        users:{
            all:function (accountID) {
                var data = { account_id:accountID }
                return self.request('users.json', "GET", data);
            }
        },
        entries:{
            current:function () {
                return self.request('entries/current.json', "GET");
            },
            update:function (id, data) {
                var form_data = { entry:data };
                return self.request('entries/' + id + '.json', "PUT", form_data);
            },
            start:function () {
                return self.request('entries/current/start.json', "POST");
            },
            pause:function () {
                return self.request('entries/current/pause.json', "POST");

            },
            log:function () {
                return self.request('entries/current/log.json', "POST");
            },
            new:function (accountID, data) {
                var form_data = {
                    entry:data,
                    account_id:accountID
                };
                return self.request('entries.json', "POST", form_data);
            },
            search:function (data) {
                return self.request('entries.json', "GET", data);
            },
            delete:function (entryId) {
                return self.request('entries/' + entryId + '.json', "DELETE");
            }
        },
        contacts:{
            all:function (accountID) {
                var data = { account_id:accountID };
                return self.request('contacts.json', "GET", data);
            },
            new:function (accountID, data) {
                var form_data = {
                    contact:data,
                    account_id:accountID
                };
                return self.request('contacts.json', "POST", form_data);
            },
            update:function (id, data) {
                var form_data = { contact:data };
                return self.request('contacts/' + id + '.json', "PUT", form_data);
            }
        },
        tasks:{
            all:function (accountID) {
                var data = {account_id:accountID };
                return self.request('tasks.json', "GET", data);
            },
            new:function (accountID, data) {
                var form_data = {
                    task:data,
                    account_id:accountID
                };
                return self.request('tasks.json', "POST", form_data);
            },
            update:function (id, data) {
                var form_data = { task:data };
                return self.request('tasks/' + id + '.json', "PUT", form_data);
            },
            delete:function (id) {
                return self.request('tasks/' + id + '.json', "DELETE");
            },
            archive:function (id) {
                return self.request('tasks/' + id + '/archive.json', "POST");
            }
        },
        projects:{
            all:function (accountID) {
                var data = { account_id:accountID };
                return self.request('projects.json', "GET", data);
            },
            new:function (accountID, data) {
                var form_data = {
                    project:data,
                    account_id:accountID
                };
                return self.request('projects.json', "POST", form_data);
            },
            update:function (id, data) {
                var form_data = { project:data };
                return self.request('projects/' + id + '.json', "PUT", form_data);
            },
            delete:function (id) {
                return self.request('projects/' + id + '.json', "DELETE");
            },
            archive:function (id) {
                return self.request('projects/' + id + '/archive.json', "POST");
            }
        }
    };

    return this.api;
};

Minutedock.prototype.request = function (path, method, form_data) {
   
    var data = form_data || { };
    data["api_key"] = this.apiKey;

    var options = {
        "uri" : config["minutedock.base.uri"] + path,    
        "method":method,
        "json" : data,
        "qs" : data
    };

    var deferred = Q.defer();
    request(options, function (error, res, body) {
        if(error){
            console.error('Request error: ' + error + ' ' + options.uri);
            deferred.reject({'status':res.statusCode});                    
            return;            
        }
        if (res.statusCode != 200) {
            console.error('MinuteDock API error: ' + res.statusCode + ' ' + options.uri);
            deferred.reject({'status':res.statusCode});                    
            return;
        }
        deferred.resolve(body);                
    });
    return deferred.promise;
};

module.exports = Minutedock;