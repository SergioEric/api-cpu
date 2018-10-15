const admin = require('../firebase-config');
const cache = require('memory-cache');

const db = admin.database();
const ref = db.ref("api/cpu_list");
const max_simulation = db.ref("api/max_simulation")

class len_simulation{
    constructor(){ }
    getDataFromFirebase(callback){
        max_simulation.once('value', (snapshot)=>{
            if(snapshot.val()){
                console.log(snapshot.val())
                cache.put('max',snapshot.val())
                callback(null,snapshot.val().valueOf())
            }else{
                cache.put('max',-1)
                callback(null,-1)
            }
        })
        
    }
    createList(arg1, callback){
            let max= []
            let i = 1;
            while(i<=arg1) {
                max.push(i)
                // console.log(i)
                i++;
            }
            callback(null,max)
    }
}
module.exports = len_simulation;

