var express = require('express');
var bodyParser = require('body-parser');

var cluster = require('cluster');

var configDB = require('./config/database.js');
var configServer = require('./config/server.js');

// CREATE EXPRESS APP
var app = express();

// SET LISTENING PORT FROM ENVIRONMENT VARIABLE (WEBSERVER) OR DEFAULT
app.set('port', process.env.PORT || configServer.port);


// REGISTER ALL MIDDLEWARE HERE
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({limit: '50mb', strict: false}));
app.use(express.static(__dirname + '/public'));

// IMPORT ALL ROUTES
require('./routes.js')(app);



// USE CLUSTERING AND RUN WORKER PROCESSES FOR EACH CORE
var workers = {};
if(cluster.isMaster){
    for (var i = 0; i < require('os').cpus().length; i++) {
        newWorker();
    };
    cluster.on('death', function(worker) {
        console.log('Worker process %d stopped functioning, spawning new process', worker.process.pid);
        delete workers[worker.process.pid];
        newWorker();
    });
} else {

    // START SERVER AND LISTENING
    app.listen(app.get('port'), function() {
        console.log('Server listening on port: ' + app.get('port'));
    });
};




function newWorker() {
    var worker = cluster.fork();
    workers[worker.process.pid] = worker;
    console.log('Spawned new worker process: %d', worker.process.pid);
    return worker;
};
