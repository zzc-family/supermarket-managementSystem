// 引入模块
const mysql = require('mysql');

// 创建连接对象
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',   // 你自己数据库的用户名
    password: 'root', // 自己数据库的密码
    database: 'supermark_management_system'   // 你自己数据库的名字
});
console.log("数据库连接成功...");
// 连接
conn.connect();
module.exports= conn;