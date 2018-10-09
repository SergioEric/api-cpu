var express = require('express');
var router = express.Router();

const admin = require('../firebase-config');

const db = admin.database();
const ref = db.ref("api/cpu_list");


router.get('/add', function(req, res, next) {
	let max = [1,2,3,4,5,6]
  res.render('simulation_add', { title: 'Agregar simulacion', max:max});
});

router.post('/add', (req, res, next)=>{
	let id = req.body.id
	let quantum = parseInt(req.body.quantum)
	//api/cpu_list/simulation_1/q
	let newRef = ref.child(`simulation_${id}`).update({quantum:quantum})
	res.status(200).send('simulation updated')
})

module.exports = router;
