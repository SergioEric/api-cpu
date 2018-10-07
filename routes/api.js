const express = require('express');
const router = express.Router();

const admin = require('../firebase-config');

const db = admin.database();
const ref = db.ref("api/cpu_list");


const cpu = require('../cpu')
/* GET users listing. */
router.get('/process', function(req, res, next) {
  let proceso = new cpu('CpoyFIle','AXNMOJNSODNoINOISNF')
  // let id =proceso.PID
  let info = proceso.info
  ref.push(info)
  res.send(`respond with all process ${ proceso.PID}`);
});

module.exports = router;
