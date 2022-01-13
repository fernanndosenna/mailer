var express = require("express")
var router = express.Router();
var SendEmail = require('./Email')


router.get('/sendEmail', 
     SendEmail.sendHtml
);



module.exports = router;

