var express = require('express');
var router = express.Router();

const admin = require('../firebase-config');

const db = admin.database();
const ref = db.ref("api/cpu_list");
const max_simulation = db.ref("api/max_simulation");

const len_simulation = require('./len_simulation');

const async = require('async')

let s_len = new len_simulation();
router.get('/update', function(req, res, next) {
	async.waterfall([s_len.getDataFromFirebase,s_len.createList],(err, result)=>{
		res.render('simulation_update', { title: 'Agregar simulacion', max:result});
	})
});

router.post('/update', (req, res, next)=>{
	let id = req.body.id
	let quantum = parseInt(req.body.quantum)
	//api/cpu_list/simulation_1/q
	let max;
	async.waterfall([function(callback){
		ref.once('value').then((snapshot)=>{
			let value = snapshot.hasChild(`simulation_${id}`)
			// let max_value_sim = snapshot.hasChild('max_simulation')
			// if(!max_simulation){
			// 	max_simulation.set(1)
			// }
			console.log(`hasChild: ${value}`)
			callback(null, value)
		})
		/*
				ref.child(`simulation_${id}`).update({quantum:quantum}).then(()=>{
			callback(null)
		}).catch(error=>{
			callback(error)
		})
		*/
	},function(arg1, callback){
		if(arg1){//si existe la referencia
			ref.child(`simulation_${id}`).update({quantum:quantum}).then(()=>{
				callback(null)
			}).catch(error=>{
				callback(error)
			})
		}else{
			//si no se crea
			ref.child(`simulation_${id}`).set({quantum:quantum}).then(()=>{
				callback(null, false)
			})
		}

	},function(arg1,callback){
		if(!arg1){//para aumentar el valor de max_simulation
			max_simulation.once('value', (snapshot)=>{
				if(snapshot.val()){
					callback(null,snapshot.val().valueOf())
				}else{
					callback(null,-1)
				}
			})
		}else{
			callback(null,'pass')
		}
	}, function(arg1, callback){
		if(arg1 == 'pass') callback(null,'simulation updated')
		if(arg1>0){
			max = arg1 + 1
			console.log(max)
			db.ref('api').update({max_simulation:max})
		}else{// si es la primera simulacion en agregarse
			max_simulation.set(1)
		}
		callback(null,'se actualizo el maximo de simulaciones')
	}],(error, result)=>{
		res.status(200).send(result)
	})
})

router.post('/clean',(req, res, next)=>{
	async.waterfall([function(callback){
		//borramos todos los datos de la base de datos
		ref.remove().then(()=>{
			callback(null)
		}).catch(error=>{
			callback(error)
		})
	},function(callback){
		//agregamos el valor por defecto de 1
		max_simulation.set(1)
	}],(e,result)=>{
		res.status(200).send('Base de datos limpia')
	})
})

module.exports = router;
