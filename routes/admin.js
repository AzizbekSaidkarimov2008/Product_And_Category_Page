const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')

/* GET users listing. */
router.get('/', auth, function(req, res, next) {
  // res.send('respond with a resource');
  res.render('admin/index' ,{
    layout: 'main'
  })
});

module.exports = router;