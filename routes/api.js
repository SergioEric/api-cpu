const express = require('express');
const router = express.Router();

const convert1 = require('xml-js');
const admin = require('../firebase-config');

const db = admin.database();
const ref = db.ref("api/");

const _async = require('async');
let stack = []

let getDataFromFirebase =  (callback)=>{
	//
	callback(null,)
}
let formatXML = (callback)=>{
		//
		callback
}
// var data2xml = require('data2xml');

// var convert = data2xml();

var options = {compact: true, ignoreComment: true, spaces: 4,fullTagEmptyElement:true};

const cpu = require('../cpu')
/* HTTP methods */
router.get('/process/select', async (req,res)=>{
	let id = req.query.id
	let snap;
	let singleProcessRef = db.ref(`api/cpu_list/simulation_${id}`)
	_async.waterfall([
		function(callback) {
			//cambiamos ref.on por ref.once
			singleProcessRef.once("value", function(snapshot) {
				// snap = JSON.stringify(snapshot.val())
				console.log(snapshot.val())
				console.log('__________________________________________________________')
				callback(null, snapshot.val())
			}, function (errorObject) {
				callback(errorObject)
			  console.log("The read failed: " + errorObject.code);
			});
		 },
		function(snap, callback) {
			let a = snap;
			let msgsKeys = Object.keys(a);
			// let newObj ={'List':[]}
			let newObj =[]
			let q;
			for(let i=0; i< msgsKeys.length; i++)
			{
				// console.log(msgsKeys[i]);
				if(msgsKeys[i] != 'quantum'){
					let msgType     = msgsKeys[i];
					let msgContent  = a[msgType];
					newObj.push(msgContent)
					// console.log(JSON.stringify(msgContent));
				}else{
					// newObj.push({'quantum':a['quantum']})
					q =a['quantum']
				}

			}
			
			console.log(JSON.stringify(newObj))
			callback(null,{Process:newObj,quantum:q})
		 },
		 function(json,callback){
			let xml = convert1.json2xml(json, options);
			let xml2= `<List>${xml}</List>`
			callback(null,xml2)
		 }
	], function(err, results) {
		// console.log(err)
		res.set('Content-Type', 'text/xml');
		res.send(results)
	});
	// singleProcessRef.on("value", function(snapshot) {
	// 	snap = JSON.stringify(snapshot.val())
	// }, function (errorObject) {
	//   console.log("The read failed: " + errorObject.code);
	// });


	// let xml = convert1.json2xml(snap, options);
	// let xml2= `<List>${xml}</List>`
	// res.set('Content-Type', 'text/xml');
	
	// res.send(xml2)
	// res.render('test', {'data':snap})
})
router.get('/process/all', (req,res)=>{
	let snap;
	// let xml;
	ref.on("value", function(snapshot) {
		snap = JSON.stringify(snapshot.val())
		// xml = convert(snap)
	  console.log(snap);
	}, function (errorObject) {
	  console.log("The read failed: " + errorObject.code);
	});
	// for(let i =0;i <snap.length; i++)
	let result = convert1.json2xml(snap, options);
	res.set('Content-Type', 'text/xml');
	// res.send(result)
	// var xml2 = convert('Message', {
	//   Text: 'Hello, World!'
	// });
	console.log(result)
	// console.log(xml)
	res.send(result)
	// setTimeout(()=>{
	// 	// console.log(xml)
	// 	// res.set('Content-Type', 'application/xml');
	// 	res.send(result)
	// }, 3000)
})

router.post('/process/add', function(req, res, next) {

	let name = req.body.name
	let char = req.body.char
	let charToReplace = req.body.charToReplace
	let id = req.body.id
	let custom_ref = db.ref(`api/cpu_list/simulation_${id}`);
	console.log(req.body)
	if(name & char) return res.status(400).send('Bad Request, name or char missing');
	if(validatedChar(char)) return res.status(400).send('Bad Request,only 255 characters are allowed as maximum');

  let proceso = new cpu(name,char,charToReplace)
  // let id =proceso.PID
  let info = proceso.info
  // ref.child(`simulation_${id}`).push(info)
  let process_id =proceso.PID
  console.log(`/process/add  pid: ${process_id}`)
  custom_ref.child(process_id).set(info)
  res.send(`respond with all process ${ proceso.PID}`);
});


// router.put('/process/:id', (req, res)=>{
// 	if(!req.params.id) return res.status(400).send('Bad Request,id missing');

// 	let processRef = ref.child(req.params.id);
// 	// console.log(processRef.exists())
// 	console.log(processRef)
// 	if(!processRef) return res.status(400).send('Bad Request,id dosnt exists');
// 	let name = req.body.name
// 	let char = req.body.char
// 	processRef.update({
// 	  "name": name,
// 		"char": char,
// 	});
// 	res.send('updated')
// })

// router.delete()

let validatedChar = (char)=>{
	// let splited = char.split("")
	return (char.length >255) ? true : false;
}

module.exports = router;
