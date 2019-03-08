

var express = require('express');
var router = express.Router();
/*const functions = require('firebase-functions');
const {google} = require('googleapis');
const {WebhookClient} = require('dialogflow-fulfillment');*/

/* GET users listing. */

router.get('/hello', function(req, res, next) {
  res.send('respond with a resource hello');
});
router.get('/hi', function(req, res, next) {
  res.send('respond with a resource hi');
});
module.exports = router;
