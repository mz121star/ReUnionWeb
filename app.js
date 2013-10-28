/**
 * Module dependencies.
 */

var express = require('express')
    , routes = require('./routes/routes')
    , user = require('./routes')
    , http = require('http')
    , path = require('path')
    , fs = require('fs')
    , colors = require('colors');

var app = express();
/**
 * 防止进程挂掉
 */

process.on('uncaughtException', function(err) {
    console.log( " UNCAUGHT EXCEPTION " );
    console.log( "[Inside 'uncaughtException' event] " + err.stack || err.message );
});


var myErrorHandler=function( req, res, next){
    if(err)
    // note, using the typical middleware pattern, we'd call next() here, but
    // since this handler is a "provider", i.e. it terminates the request, we
    // do not.
    req.redirect("error.html")
    next();
};
app.configure(function () {
    app.set('port', process.env.PORT || 3000);

    app.set('views', __dirname + '/views');

    app.set('view engine', 'html');
    app.use(express.compress());
    app.use(express.favicon());
    app.use(express.logger('dev'));
     app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser('reunion web'));
    app.use(express.cookieSession({cookie:{ path: '/', httpOnly: true, maxAge: null }}));
   /* app.use(express.session());*/

    app.use(app.router);
   /* app.use(myErrorHandler);*/
/*    app.use(function(err, req, res, next){
        if(err){
        console.error("SORRY!!!!!!");
        res.send(500, 'Something broke!');
            next();
        }

    });*/
    app.use(express.static(path.join(__dirname, 'public')));


    /*  app.use(express.static(path.join(__dirname, 'resources')));
     app.use(express.static(path.join(__dirname, 'views/partials')));*/
});

/*app.configure('development', function () {
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});*/

app.all('/api/*', function(req,res,next){
    console.log("api")
    var s =req.session["user"] ;
    if(s){
        res.set('Cache-Control','max-age:3600,private');
        next();
    }
    else{
        return res.json(401,{error:"Unauthorized"});

    }

});
routes(app);

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
