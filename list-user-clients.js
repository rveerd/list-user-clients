/*jslint node: true*/
'use strict';

var https = require('https');
var getopt = require('posix-getopt');

var app = {
    host: 'localhost',
    
    port: 443,
    
    token: 'my-rhoconnect-token',
    
    getClientsForUser: function (user, callback) {
        var options, req;

        options = {
            hostname: this.host,
            port: this.port,
            path: '/rc/v1/users/' + user + '/clients',
            method: 'GET',
            headers: {
                'X-RhoConnect-API-TOKEN': this.token
            },
            rejectUnauthorized: false
        };

        req = https.request(options, function (res) {
            res.setEncoding('utf8');

            res.on('data', function (data) {
                if (typeof callback !== 'undefined') {
                    callback(JSON.parse(data)); // FIXME: Catch exceptions.
                }
            });

            res.on('error', function (err) {
                console.error(err);
            });
        });

        req.on('error', function (err) {
            console.error(err);
        });

        req.end();
    },

    getUsers: function (callback) {
        var options, req;

        options = {
            hostname: this.host,
            port: this.port,
            path: '/rc/v1/users',
            method: 'GET',
            headers: {
                'X-RhoConnect-API-TOKEN': this.token
            },
            rejectUnauthorized: false
        };

        req = https.request(options, function (res) {
            res.setEncoding('utf8');

            res.on('data', function (data) {
                if (typeof callback !== 'undefined') {
                    callback(JSON.parse(data)); // FIXME: Catch exceptions.
                }
            });

            res.on('error', function (err) {
                console.error(err);
            });
        });

        req.on('error', function (err) {
            console.error(err);
        });

        req.end();
    },

    config: function (argv) {
        var parser, option;

        parser = new getopt.BasicParser('h:(host)p:(port)t:(token)', argv);
        while ((option = parser.getopt()) !== undefined) {
            switch (option.option) {
            case 'h':
                this.host = option.optarg;
                break;

            case 'p':
                this.port = option.optarg;
                break;

            case 't':
                this.token = option.optarg;
                break;

            default:
                return;
            }
        }
    },
    
    run: function (argv) {
        app.config(argv);
        
        app.getUsers(function (users) {
            users.forEach(function (user) {
                app.getClientsForUser(user, function (clients) {
                    if (clients.length > 0) {
                        clients.forEach(function (client) {
                            console.log(user + ':' + client + (clients.length > 1 ? '+' : ''));
                        });
                    } else {
                        console.log(user + ':');
                    }
                });
            });
        });
    }
};

app.run(process.argv);
