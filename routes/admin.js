const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  res.render('admin/index' ,{
    layout: 'main'
  })
});

module.exports = router;