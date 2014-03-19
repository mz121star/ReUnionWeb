var tool=require("./../libs/adminTool");
var path = require('path');
var querystring = require('querystring');
var URL = require('url'),
  http = require('http')
exports.admintool = function (req, res) {
      var cmd= req.body.cmd;
    tool.shell(cmd,function(d){
        res.send(d)
    })
}
exports.admin = function (req, res) {
    var s =req.session["user"] ;
    if(s.name!=="super"){
        res.redirect('login');
        return;
    }
    var html = path.normalize(__dirname + '/../views/admin.html');
    res.sendfile(html);
}
/**
 * HTTP Post请求
 * @param host 主机名
 * @param path 请求路径
 *  @param port 端口
 * @param data 请求的body参数
 * @param callback 回调函数，接受返回的数据
 * @constructor
 */
var HTTPPost = function (host, path, port, data, callback) {
    var result = "";
    var post_data =data;
    console.log(post_data.length);
    var options = {
        hostname:host,
        port:port || 80,
        path:path || "/",
        method:'POST',
        headers:{
            'Content-Type':"text/xml; charset=utf-8",
            'Content-Length':post_data.length,
            'User-Agent':"reunion",
            'Keep-Alive':true,
            'timeout':300000  ,
            'SOAPAction': 'http://192.168.112.119:977/dispatch#hello'
        }
    };


    var req = http.request(options, function (res) {
        // console.log('STATUS: ' + res.statusCode);
        // console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            result+=chunk;
        });
        res.on('end', function (chunk) {

            console.log("over:"+result);
            callback(result);

        });
    });

    req.on('error', function (e) {
        console.log('problem with request: ' + e.message);
    });

// write data to request body
    req.write(post_data + '\n');
    req.end();

};
exports.soap=function(req,res){



    var name=req.body.name;
    var soapstr='<?xml version="1.0" encoding="UTF-8"?><soap:Envelope soap:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><soap:Body><hello xmlns="http://192.168.112.119:977/dispatch"><c-gensym3 xsi:type="xsd:string">'+name+'</c-gensym3></hello></soap:Body></soap:Envelope>';
    HTTPPost("192.168.112.119","/dispatch",977,soapstr,function(d){
        console.log(d)
    })
}