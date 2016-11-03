var express = require('express');

var router = express.Router();

/* GET simple search page. */
 router.get('/', function(req, res, next) {

     res.send("Please return to the main page");
 });

module.exports = router;
