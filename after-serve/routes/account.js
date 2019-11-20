var express = require('express');
var router = express.Router();
var multer = require('multer');

// 引入数据库连接模块
const conn = require('./port/conn')

// 统一处理跨域问题
router.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header("Access-Control-Allow-Headers", "authorization"); // 允许前端携带的头部信息
    next()
});

/*------------------------------------------*/
// 引入jwt
const jwt = require('jsonwebtoken');
// expressJwt 用于验证token的有效性
const expressJwt = require('express-jwt');
// 秘钥
const secretKey = 'itsource';


// 使用中间件验证token合法性
router.use(expressJwt ({
    secret:  secretKey
}).unless({
    path: ['/account/checkLogin','/account/upload']  // 不需要验证token的地址
}))


// 拦截器
router.use(function (err, req, res, next) {
    // 如果用户的请求 没有携带token 那么错误类型是 UnauthorizedError
    if (err.name === 'UnauthorizedError') {
        // 如果前端请求不带token 返回错误
        res.status(401).send('无效的token...');
    }
})
/*------------------------------------------*/
var storage = multer.diskStorage({
    destination: 'public/upload/account', //
    filename: function (req, file, cb) {
        // 处理文件格式
        var fileFormat =(file.originalname).split(".");

        // 获取当前时间戳 用于重命名
        var filename = new Date().getTime();
        cb(null, filename + "." + fileFormat[fileFormat.length - 1]); // 拼接文件名
    }
});


/* 检查用户身份 */
router.post('/checkLogin', (req, res) => {
    let {acc, pwd} = req.body;
    console.log(acc,pwd)
    if ( !(acc && pwd) ) {
        res.send({code: 0, msg: "参数错误!"})
        return;
    }

    const sql = `select * from users where acc="${acc}" and pwd="${pwd}"`;
    conn.query(sql, (err, data) => {
        if (err) throw err;
        console.log(data)
        if (data.length) {
            /*------------------------------------------*/
            // 取出用户信息

            const userInfo = { ...data[0] };
            //生成token
            const token = jwt.sign(userInfo, secretKey, {
                expiresIn:  60 * 60 * 2 // token过期时间
            })
            /*------------------------------------------*/

            res.send({code: 1, msg: '欢迎你，登录成功', token})
        } else {
            res.send({code: 0, msg: '登录失败，请检查用户名或密码'})
        }
    })
})

/* 添加账号接口 */
router.post('/accountAdd', (req, res) => {
    // 接收前端参数
    let {acc,pwd,accGroup} = req.body;
    console.log(req.body)
   // 防止前端不传参数
      if ( !(acc && pwd && accGroup) ) {

          res.send({code: 0, msg: "参数错误，注意你的请求参数哟!"})
          return
      }

      // 操作数据库
      // 1. 准备sql
      const sql = `insert into users(acc, pwd, accGroup,imgUrl) values("${acc}", "${pwd}", "${accGroup}","default.jpg")`;
      // 2. 执行sql
      conn.query(sql, (err, data) => {
          if (err) throw err;
          if (data.affectedRows > 0) {
              res.send({code: 1, msg: "添加账号成功,哈哈!"})
          } else {
              res.send({code: 0, msg: "添加账号失败,呵呵!"})
          }
      })
})

/* 账号列表（涉及分页）*/
router.get('/accountList', (req, res) => {
    // 接收参数 (当前页 每页条数) （后端： 接收前端两个参数）
    let { currentPage, reports } = req.query;
    console.log(currentPage, reports)
    if ( !(currentPage && reports) ) {
        return res.send({code: 0, msg: "参数错误，注意你的请求参数哟!"})
    }
    // 后端： 返回给前端， 2个参数， 数据总条数  当前页页的数据
    let total;

    // 准备sql
    let sql = `select * from users order by ctime desc`;
    // 执行sql
    conn.query(sql, (err, data) => {
        if (err) throw err;
        total = data.length; // 计算总条数

        // 拼接分页sql
        let n = (currentPage - 1) * reports;
        sql += ` limit ${n}, ${reports}`;

        // 执行分页sql
        conn.query(sql, (err, data) => {
            if (err) throw err;

            res.send({ total, data }) // 响应数据给前端
        })

    })
})

/* 删除 */
router.get('/accountdel', (req, res) => {
    let { id } = req.query;

    if (!id) {
        return res.send({code: 0, msg: "参数错误，注意你的请求参数哟!"})
    }

    // 操作数据库
    const sql = `delete from users where id = ${id}`;
    conn.query(sql, (err, data) => {
        if (err) throw err;
        if (data.affectedRows > 0) {
            res.send({code: 1, msg: "删除成功，嘻嘻!"})
        } else {
            res.send({code: 0, msg: "删除删除失败，哦豁!"})
        }
    })
})

/* 批量删除 */
router.get('/accountbatchdel', (req, res) => {
    let { ids } = req.query;  // 接收参数 接收一个数组
    ids = JSON.parse(ids) // 转为数组

    if (!ids.length) {
        res.send({code: 0, msg: "参数错误，注意你的请求参数哟!"})
        return
    }

    // 操作数据库
    const sql = `delete from users where id in (${ids.join(',')})`;
    conn.query(sql, (err, data) => {
        if (err) throw err;
        if (data.affectedRows > 0) {
            res.send({code: 1, msg: '批量删除成功,gg'})
        } else {
            res.send({code: 0, msg: '批量删除失败,哦豁'})
        }
    })
})

/* 编辑(修改账号) */
router.post('/accountedit', (req, res) => {
    let { acc, accGroup, id } = req.body

    if ( !(acc && accGroup && id) ) {
        res.send({code: 0, msg: "参数错误，注意你的请求参数哟!"})
        return
    }

    // 操作数据库
    const sql = `update users set acc="${acc}", accGroup="${accGroup}" where id=${id}`;
    conn.query(sql, (err, data) => {
        if (err) throw err;
        if (data.affectedRows > 0) {
            res.send({code: 1, msg: "修改成功"})
        } else {
            res.send({code: 0, msg: "修改失败"})
        }
    })
})

/*检查旧密码是否正确*/
router.get('/checkoldpwd', (req, res) => {
    let { oldPwd } = req.query;

    if (!oldPwd) {
        res.send({code: 0, msg: "参数错误!"})
        return;
    }
    if (oldPwd === req.user.pwd) {
        res.send({code: '1', msg: '旧密码正确'})
    } else {
        res.send({code: "0", msg: '原密码错误'})
    }
})

/* 修改密码 */
router.post('/passwordedit', (req, res) => {
    let { newPwd } = req.body;

    if ( !newPwd ) {
        res.send({code: 0, msg: "参数错误!"})
        return;
    }

    const sql = `update users set pwd="${newPwd}" where id=${req.user.id}`;
    conn.query(sql, (err, data) => {
        if (err) throw err;
        if (data.affectedRows > 0) {
            res.send({code: 1, msg: '修改密码成功，请重新登录!'})
        } else {
            res.send({code: 0, msg: '修改密码失败!'})
        }
    })
})


/* 个人中心 */
router.get('/accountinfo', (req, res) => {

    const sql = `select * from users where id=${req.user.id}`;
    conn.query(sql, (err, data) => {
        if (err) throw err;
        if (data.length) {
            res.send({ accountInfo: data[0] })
        }
    })
})
// 上传对象
var upload = multer({
    storage
});
// 头像上传
router.post('/upload', upload.single('file'), (req, res) => {
    let { filename } = req.file;
    res.send({ code: 0, msg:"上传成功!", imgUrl: filename })
})

/* 修改用户头像 */
router.get('/avataredit', (req, res) => {
    let { imgUrl } = req.query;

    if ( !imgUrl ) {
        res.send({code: 0, msg: "参数错误!"})
        return;
    }

    const sql = `update users set imgUrl="${imgUrl}" where id=${req.user.id}`;

    console.log(sql)
    conn.query(sql, (err, data) => {
        if (err) throw err;

        if (data.affectedRows > 0) {
            res.send({code: 1, msg: '头像成功!'})
        } else {
            res.send({code: 0, msg: '修改头像失败!'})
        }
    })
})


module.exports = router;