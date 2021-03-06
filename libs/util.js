var xss = require('xss');
var moment = require('moment');
exports.format_date = function (date, friendly) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();

    if (friendly) {
        var now = new Date();
        var mseconds = -(date.getTime() - now.getTime());
        var time_std = [ 1000, 60 * 1000, 60 * 60 * 1000, 24 * 60 * 60 * 1000 ];
        if (mseconds < time_std[3]) {
            if (mseconds > 0 && mseconds < time_std[1]) {
                return Math.floor(mseconds / time_std[0]).toString() + ' 秒前';
            }
            if (mseconds > time_std[1] && mseconds < time_std[2]) {
                return Math.floor(mseconds / time_std[1]).toString() + ' 分钟前';
            }
            if (mseconds > time_std[2]) {
                return Math.floor(mseconds / time_std[2]).toString() + ' 小时前';
            }
        }
    }

    //month = ((month < 10) ? '0' : '') + month;
    //day = ((day < 10) ? '0' : '') + day;
    hour = ((hour < 10) ? '0' : '') + hour;
    minute = ((minute < 10) ? '0' : '') + minute;
    second = ((second < 10) ? '0' : '') + second;

    thisYear = new Date().getFullYear();
    year = (thisYear === year) ? '' : (year + '-');
    return year + month + '-' + day + ' ' + hour + ':' + minute;
};

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

exports.escape = function (html) {
    var codeSpan = /(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm;
    var codeBlock = /(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=~0))/g;
    var spans = [];
    var blocks = [];
    var text = String(html).replace(/\r\n/g, '\n')
        .replace('/\r/g', '\n');

    text = '\n\n' + text + '\n\n';

    text = text.replace(codeSpan, function (code) {
        spans.push(code);
        return '`span`';
    });

    text += '~0';

    return text.replace(codeBlock, function (whole, code, nextChar) {
        blocks.push(code);
        return '\n\tblock' + nextChar;
    })
        .replace(/&(?!\w+;)/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/`span`/g, function () {
            return spans.shift();
        })
        .replace(/\n\tblock/g, function () {
            return blocks.shift();
        })
        .replace(/~0$/, '')
        .replace(/^\n\n/, '')
        .replace(/\n\n$/, '');
};

/**
 * 过滤XSS攻击代码
 *
 * @param {string} html
 * @return {string}
 */
exports.xss = function (html) {
    return xss(html);
};


var randomRange = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};
var getColor = function () {
    this.colors = ["#4572a7", "#aa4643", "#89a54e", '#80699b'];
    this.index = 1

};
getColor.prototype.getOne = function () {
    var color = this.colors[this.index % 4];
    this.index++;

    return color;
}
var getcolor = new getColor();
exports.randomColor = function () {
    return getcolor.getOne();
};
/*
 exports.dateRange = function (start, end) {
 var result=[];
 var startDate = new Date(start), endDate = new Date(end);
 var size=endDate.getDate()-startDate.getDate();
 for (var i = 0; i <=size; i++) {
 var d=moment(startDate).add('days',i).format("YYYY-MM-DD");
 result.push(new Date(d).getMonth()+1+"/"+new Date(d).getDate());
 }
 return result;
 }*/

exports.dateRange = function (start, end) {
    var result = [];
    var startDate = moment(start), endDate = moment(end);
    var diff = endDate.diff(startDate, "days") <= 30 ? endDate.diff(startDate, "days") : 30;
    for (var i = 0; i <= diff; i++) {
        var d = moment(start).add('days', i).format("MM/DD");
        result.push(d);
    }
    return result;
}
/***
 * 根据区间最大值（max），获取以开始时间为基准的结束日期，
 * @param start
 * @param end
 * @param max
 */
exports.getEndDate = function (start, end, max) {
    var startDate = moment(start), endDate = moment(end);
    console.log(startDate);
    console.log(endDate);
    var dd = endDate.diff(startDate, "days");
    console.log(dd);
    var expectEnd = moment(startDate).add("days", max).format();
    console.log(expectEnd);
    var rend = (dd <= max ? endDate.format(): expectEnd);

    return rend;
}
/*
 exports.randomColor=function(){

 var colors=["#ea342f","#063c81","#008b00","#9d4d99","#fdb200","#1174ba","#04cfc3","#df498c","#fde200","00bbf6"];
 */
/*  var color = randomRange(0, 0xC5BF27);
 return '#' + ('000000' + color.toString(16)).slice(-6);*//*


 }*/
