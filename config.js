/**
 * Created with JetBrains WebStorm.
 * User: c-sailor.zhang
 * Date: 1/23/13
 * Time: 2:24 PM
 * To change this template use File | Settings | File Templates.
 */
module.exports={
    cookieSecret:'reunion',
      connectionstring:'mongodb://reunion:reunion@127.0.0.1:27017/local',
    // connectionstring:'mongodb://localhost/njblog'
   // connectionstring:'mongodb://njblog:njblog@linus.mongohq.com:10062/NJBlog' ,
    emailSection:{
        /***
         * SMTP Server
         */
        SMTPServer:"smtp.126.com",
        AuthUser:"PacteraReunion@126.com",
        AuthPassword:"Hisoft",
        /***
         * 发件人信息
         */
        From: "Reunion ✔ <PacteraReunion@126.com>",
        /***
         * 邮件标题前缀
         */
        PreTitle:"Reunion Report-"
    }
};