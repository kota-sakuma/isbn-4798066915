const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
  const data = {
    title: 'Hello!',
    message: 'これは、サンプルで追加したページです。'
  }
  res.render('hello', data);
});

module.exports = router;
