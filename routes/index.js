var express = require('express');
var router = express.Router();
var votifier = require('votifier-send');
var config = require('../config/config')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Onaynay' });
});

router.post('/', function(req, res, next) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  var settings = {
    key: config.pubkey,
    host: config.host,
    port: config.port,
    data: {
      user: req.body.username,
      site: config.sitename,
      addr: ip,
      timestamp: new Date().getTime()
    }
  }

  votifier.send(settings, (err) => {
    if(err) console.log(err);

    console.log(req.body)
    res.status(200).send("OK")
  })


})

module.exports = router;
