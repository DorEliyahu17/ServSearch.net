var express = require('express');

var router = express.Router();

router.get('/', function(req, res, next) {
    res.send("404 Not Found");
});

/* GET admin home page. */
router.get('/home', function(req, res, next) {
    res.render("index.html");
});

/* GET bugs for admin page. */
router.get('/bugs', function(req, res, next) {
    res.render("index.html");
});

/* GET to-do admin page. */
router.get('/todo', function(req, res, next) {
    res.render("index.html");
});

/* GET DBs status admin page. */
router.get('/compare', function(req, res, next) {
    res.render("index.html");
});

module.exports = router;