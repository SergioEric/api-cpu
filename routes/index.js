var express = require('express');
var router = express.Router();

const admin = require('../firebase-config');

const db = admin.database();

const max_simulation = db.ref("api/max_simulation")

const cache = require('memory-cache');
const len_simulation = require('./len_simulation');
const async = require('async')

let len =new len_simulation()
/* GET home page. */
router.get('/', function(req, res, next) {
  async.waterfall([len.getDataFromFirebase,len.createList], (err, result)=>{
    res.render('index', { title: 'API on Express', max:result});
  })

});

module.exports = router;
