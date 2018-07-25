const A4 = 440;   //琴符声音
let scale = [];
let frequencies = [];

class Octave{
  constructor(a){
  this.b      = a *  Math.pow(2, 2/12);   
  this.aSharp = a *  Math.pow(2, 1/12);
  this.a = a;
  this.gSharp = a *  Math.pow(2, -1/12); 
  this.g      = a *  Math.pow(2, -2/12); 
  this.fSharp = a *  Math.pow(2, -3/12); 
  this.f      = a *  Math.pow(2, -4/12); 
  this.e      = a *  Math.pow(2, -5/12); 
  this.dSharp = a *  Math.pow(2, -6/12); 
  this.d      = a *  Math.pow(2, -7/12); 
  this.cSharp = a *  Math.pow(2, -8/12);  
  this.c      = a *  Math.pow(2, -9/12); 
  }
}

for(let i = -2; i < 4; i++){
  let a = A4 * Math.pow(2, i);
  let octave = new Octave(a);
  scale.push(octave);
}

scale.map((o) => {
  for( var note in o){
       frequencies.push(o[note]); 
    }
});
frequencies.sort((a,b) => a-b);
frequencies.reverse();
// console.log("frequencies: ",frequencies);

