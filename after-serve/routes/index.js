var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.send("服务器已启动...")
});

module.exports = router;
