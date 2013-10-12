var exec = require('child_process').exec,
    child;
 exports.shell=function(cmd,callback){
     child = exec(cmd,
         function (error, stdout, stderr) {
             if(stdout)

             callback(stdout);
            if(stderr)
                callback(stderr);
             if (error !== null) {
                 callback(error);
             }
         });
 }
