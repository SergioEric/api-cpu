const express = require('express');
const router = express.Router();

const convert1 = require('xml-js');
const admin = require('../firebase-config');

const db = admin.database();
const ref = db.ref("api/");

var data2xml = require('data2xml');

var convert = data2xml();

var options = {compact: true, ignoreComment: true, spaces: 4, fullTagEmptyElement:true};

const cpu = require('../cpu')
/* HTTP methods */
router.get('/process/:id', async (req,res)=>{
	let id = req.params.id
	let pid = req.params.pid
	let snap;
	let singleProcessRef = db.ref(`api/cpu_list/simulation_${id}`)
	singleProcessRef.on("value", function(snapshot) {
		snap = JSON.stringify(snapshot.val())
	  console.log(snap);
	}, function (errorObject) {
	  console.log("The read failed: " + errorObject.code);
	});
	let xml = convert1.json2xml(snap, options);
	let xml2= `<List>${xml}</List>`
	res.set('Content-Type', 'text/xml');
	
	res.send(xml2)
})
router.get('/process/all', async (req,res)=>{
	let snap;
	let xml;
	ref.on("value", function(snapshot) {
		snap = JSON.stringify(snapshot.val())
		xml = convert(snap)
	  console.log(snap);
	}, function (errorObject) {
	  console.log("The read failed: " + errorObject.code);
	});
	// for(let i =0;i <snap.length; i++)
	let result = convert1.json2xml(snap, options);
	res.set('Content-Type', 'text/xml');
	// res.send(result)
	var xml2 = convert('Message', {
	  Text: 'Hello, World!'
	});
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
	let id = req.body.id
	let custom_ref = db.ref(`api/cpu_list/simulation_${id}`);
	console.log(req.body)
	if(name & char) return res.status(400).send('Bad Request, name or char missing');
	if(validatedChar(char)) return res.status(400).send('Bad Request,only 255 characters are allowed as maximum');
  let proceso = new cpu(name,char)
  // let id =proceso.PID
  let info = proceso.info
  // ref.child(`simulation_${id}`).push(info)
  let process_id =proceso.PID
  console.log(`/process/add  pid: ${process_id}`)
  custom_ref.child(process_id).set(info)
  res.send(`respond with all process ${ proceso.PID}`);
});


router.put('/process/:id', (req, res)=>{
	if(!req.params.id) return res.status(400).send('Bad Request,id missing');

	let processRef = ref.child(req.params.id);
	// console.log(processRef.exists())
	console.log(processRef)
	if(!processRef) return res.status(400).send('Bad Request,id dosnt exists');
	let name = req.body.name
	let char = req.body.char
	processRef.update({
	  "name": name,
		"char": char,
	});
	res.send('updated')
})

// router.delete()

let validatedChar = (char)=>{
	// let splited = char.split("")
	return (char.length >255) ? true : false;
}

module.exports = router;
