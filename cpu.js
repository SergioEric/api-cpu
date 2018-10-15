const shortid = require('shortid')
// const cron = require("node-cron");
// let clc = require("cli-color");

// const quantum = 5;//numero maximo de reemplazos de caracter por ejecucion
// function fixId(id){
// 	let split = id.split("")
// 	var abc=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","u","v","w","x","y","z"];

// 			if(parseInt(split[0])){
// 				split[0] = abc[createRandomNumber(25)]
// 				return split.join("");

// 			}
// 			return id

// }
// function createRandomNumber(max){
// 		return Math.round(Math.random()*max)
// 	}
// let longTime=0;
class Process{

	constructor(name, char, charToReplace){
		this.pid = this.fixId(shortid.generate())
		this.name = name || 'noname'
		this.priority = this.createRandomNumber(2)
		this.char = char || shortid.generate()
		// this.replaceChar()
		this.charToReplace = charToReplace
		this.status = 0 // [0:listo,1:ejecucion,2:terminado]
		this.positions = []
		this.charReplaced = ''
		// this.runTask = cron.schedule(`*/${time} * * * * *`, function() {
		// 	// console.log(`INFORMACION: "pid": ${ this._pid} "name": ${this.name}`)
		// 	this.replaceChar()
		// })
		// this.stopProcess()
	}
	createRandomNumber(max){
		return Math.round(Math.random()*max)
	}
	fixId(id){
	let split = id.split("")
	var abc=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","u","v","w","x","y","z"];
	// for(let i =0;i<split.length;i++){
			// if(typeof(split[i]) == Number ){
			// 	return i;
			// 	break;
			// }
			if(parseInt(split[0])){
				split[0] = abc[this.createRandomNumber(25)]
				console.log(split)
				return split.join("");

			}
			return id
		// }
}

	get PID(){
		return this.pid
	}
	get info(){
		const json = {
			"pid": this.pid,
			"name": this.name,
			"char": this.char,
			"charToReplace" : this.charToReplace,
			"priority": this.priority,
			"status": this.status
		}
		return json
		// return `pid: ${this.pid} \n name: ${this.name} \n char : ${this.char} \n priority: ${this.priority}`
	}

	// findPositionsToReplace(){
	// 	let splitChar = this.char.split("")
	// 	for (let i=0;i<splitChar.length;i++) {
	// 		// str+= `${splitChar[i]} \n`;
	// 			if(splitChar[i] == this.charToReplace){
	// 					// splitChar[i] = "X"
	// 					this.positions.push(i)
	// 				}
	// 	}
	// 	longTime = this.positions.length
	// 	// return splitChar.join('')
	// }
	// replaceChar(){
	// 	if(longTime == 0){// si se reemplazaron los caracteres

	// 	}else{ 
	// 		let splitChar = this.char.split("")
	// 		let time = 0;

	// 		setInterval(()=>{
	// 			if(time >5){
	// 				clearInterval(this)
	// 			}
	// 			let i =0
	// 			// let t =this.positions.length 
	// 			while(i<5) {
	// 				if(i > this.positions.length) break;
	// 				if(time>5) break;
	// 				// console.log(clc.yellow(`i: ${i} splitC" ${splitChar[i]} positions : ${this.positions[i]}`))
	// 				// console.log(clc.blue(`cambida ${splitChar[this.positions[i]]} por X`))
	// 				splitChar[this.positions[i]] = "X"
	// 				time++
	// 				i++
	// 			}

	// 		}, 1000);
	// 		this.charReplaced = splitChar.join('')
	// 	}
	// 	// return splitChar.join('')
	// }

	set _charToReplace(char){
		this.charToReplace = char 
	}

	get _pid(){
		return this.pid
	}
	get _replacedChar(){
		return this.charReplaced
	}
}
module.exports = Process;