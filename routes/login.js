var express = require('express');

var router = express.Router();

/* GET admin login page. */
router.get('/', function(req, res, next) {
    res.render("index.html");

});

module.exports = router;