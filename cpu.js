const shortid = require('shortid')
// const cron = require("node-cron");
// let clc = require("cli-color");

// const quantum = 5;//numero maximo de reemplazos de caracter por ejecucion
let longTime=0;
class Process{

	constructor(name, char){
		this.pid = shortid.generate() || 'adveave'
		this.name = name || 'noname'
		this.priority = this.createRandomPriority()
		this.char = char || shortid.generate()
		// this.replaceChar()
		this.charToReplace = 'A'
		this.status = 0 // [0:listo,1:ejecucion,2:terminado]
		this.positions = []
		this.charReplaced = ''
		// this.runTask = cron.schedule(`*/${time} * * * * *`, function() {
		// 	// console.log(`INFORMACION: "pid": ${ this._pid} "name": ${this.name}`)
		// 	this.replaceChar()
		// })
		// this.stopProcess()
	}
	createRandomPriority(){
		return Math.round(Math.random()*2)
	}

	get PID(){
		return `the id is : ${this.pid}`
	}
	get info(){
		const json = {
			"pid": this.pid,
			"name": this.name,
			"char": this.char,
			"priority": this.priority,
			"status": this.status
		}
		return json
		// return `pid: ${this.pid} \n name: ${this.name} \n char : ${this.char} \n priority: ${this.priority}`
	}

	findPositionsToReplace(){
		let splitChar = this.char.split("")
		for (let i=0;i<splitChar.length;i++) {
			// str+= `${splitChar[i]} \n`;
				if(splitChar[i] == this.charToReplace){
						// splitChar[i] = "X"
						this.positions.push(i)
					}
		}
		longTime = this.positions.length
		// return splitChar.join('')
	}
	replaceChar(){
		if(longTime == 0){// si se reemplazaron los caracteres

		}else{ 
			let splitChar = this.char.split("")
			let time = 0;

			setInterval(()=>{
				if(time >5){
					clearInterval(this)
				}
				let i =0
				// let t =this.positions.length 
				while(i<5) {
					if(i > this.positions.length) break;
					if(time>5) break;
					// console.log(clc.yellow(`i: ${i} splitC" ${splitChar[i]} positions : ${this.positions[i]}`))
					// console.log(clc.blue(`cambida ${splitChar[this.positions[i]]} por X`))
					splitChar[this.positions[i]] = "X"
					time++
					i++
				}

			}, 1000);
			this.charReplaced = splitChar.join('')
		}
		// return splitChar.join('')
	}

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