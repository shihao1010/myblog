// Using WebAudiApi frequencies
//https://codepen.io/enxaneta/pen/6a6b7c1091cc242b6210630cf11538f0

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

//const frequencies = [4186.01, 3951.07, 3729.31, 3520.00, 3322.44, 3135.96, 2959.96, 2793.83, 2637.02, 2489.02, 2349.32, 2217.46, 2093.00, 1975.53, 1864.66, 1760.00, 1661.22, 1567.98, 1479.98, 1396.91, 1318.51, 1244.51, 1174.66, 1108.73, 1046.50, 987.767, 932.328, 880.000, 830.609, 783.991, 739.989, 698.456, 659.255, 622.254, 587.330, 554.365, 523.251, 493.883, 466.164, 440.000, 415.305, 391.995, 369.994, 349.228, 329.628, 311.127, 293.665, 277.183, 261.626, 246.942, 233.082, 220.000, 207.652, 195.998, 184.997, 174.614, 164.814, 155.563, 146.832, 138.591, 130.813, 123.471, 116.541, 110.000, 103.826, 97.9989, 92.4986, 87.3071, 82.4069, 77.7817, 73.4162, 69.2957, 65.4064, 61.7354, 58.2705, 55.0000, 51.9130, 48.9995, 46.2493, 43.6536, 41.2035, 38.8909, 36.7081, 34.6479];

const symbols = ['\u2669','\u266a',' \u266b','\u266c'];

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let cw = canvas.width = window.innerWidth,
  cx = cw / 2;
let ch = canvas.height = window.innerHeight,
  cy = ch / 2;

let w = cw/12;
let h = ch/6;

let requestId = null;
const rad = Math.PI / 180;

const rects = [];
const notes = [];
const particles = [];

class Rect{
  constructor(x,y,freq){
    this.w = w
    this.h = h;
    this.x = x;
    this.y = y;
    // audio
    this.stop = true;
    this.frequency = freq;// la frecuencia
    this.waveform = "triangle";// la forma de onda
    this.dur = .75;// la duración en segundos
    this.initialGain = .15;
  }
  
  play(){
   this.oscillator = audioCtx.createOscillator();
   this.gain = audioCtx.createGain();
   this.gain.gain.value = this.initialGain; 
   this.oscillator.type = this.waveform;
   this.oscillator.frequency.value = this.frequency;  
   this.gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + this.dur);
   this.oscillator.connect(this.gain);
   this.gain.connect(audioCtx.destination);
   this.oscillator.start(audioCtx.currentTime);
   this.stop = false;
   this.oscillator.stop(audioCtx.currentTime + this.dur); 
   this.oscillator.onended = ()=>this.stop = true;
  }  
  
  update(cw,ch){
    this.w = cw/12;
    this.h = ch/6;
  }
  
  isPointInPath(m){
    let x = this.x*this.w;
    let y = this.y*this.h;
    ctx.beginPath();
    ctx.rect(x,y,this.w,this.h);
    if (ctx.isPointInPath(m.x, m.y) & this.stop){this.play()}
  }
}

for(let y = 0; y < 6; y++){
  for(let x = 0; x < 12; x++){
    let freq = frequencies[rects.length];
    let r = new Rect(x,y,freq);
    
    rects.push(r);
  }
}

class Particle{
  constructor(){
  this.r = 50 + Math.random()*100;
  this.x = this.r + Math.random() * (cw - this.r);
  this.y = Math.random() * ch;
  this.speed = .5 + Math.random()*2;
  }
  draw(){
    ctx.beginPath();
    ctx.arc(this.x, this.y,this.r,0,2*Math.PI);
    ctx.fillStyle = grd();
    ctx.fill();
  }
  update(){
    if(this.y < -this.r){
      this.y = ch + this.r;
      this.x = this.r + Math.random() * (cw - this.r);
    }
    this.y -= this.speed;
  }
}

for(let i = 0;i < 20; i++){
  let p = new Particle();
  particles.push(p)
}

class Note{
  constructor(m){
    this.text = symbols[~~(Math.random()*symbols.length)];
    this.x = m.x;
    this.y = m.y;
    this.fontSize = 10+ ~~(Math.random()*40);
    this.alp = 1;
    this.speed = Math.random() +.5;
    this.frames = Math.random()*360;
    this.angle = Math.sin(frames*rad) * Math.PI/2;
  }
  
  draw(){
    ctx.save(); 
    ctx.translate(this.x,this.y); 
    ctx.rotate(this.angle);
    ctx.font = this.fontSize+"px Verdana";
    ctx.textAlign="center";
    ctx.textBaseline="middle";
    ctx.fillStyle = `rgba(0, 0, 0, ${this.alp})`;
    ctx.fillText(this.text,0,0);
    ctx.restore();
  }
  
  update(){
    this.frames ++;
    this.fontSize +=.1;
    this.alp -=.01;
    this.angle = Math.sin(this.frames*rad) * Math.PI/2;
    this.y -= this.speed;
    this.x += Math.sin(this.frames*rad);   
  }
}

function Draw() {
requestId = window.requestAnimationFrame(Draw);
ctx.clearRect(0,0,cw,ch);

particles.map((p) => {
    p.update();
    p.draw();
}); 
notes.map((n,index) => {
     n.update();
     n.draw();
     if(n.alp <=0){notes.splice(index, 1);}
   });

}


function Init() {
	if (requestId) {
		window.cancelAnimationFrame(requestId);
		requestId = null;
}


cw = canvas.width = window.innerWidth,w = cw/12;
ch = canvas.height = window.innerHeight,h = ch/6;
rects.map((r) => r.update(cw,ch));
particles.map((p) => p.update());
Draw();
};

setTimeout(function() {
		Init();
		window.addEventListener('resize', Init, false);
}, 15);

canvas.addEventListener("mousemove",function(evt){
  let m = oMousePos(canvas, evt);
  rects.map((r) => r.isPointInPath(m));//sound
  
  if(Math.random() < .4){//notes
  let note = new Note(m);
  notes.push(note);}
});

function grd(){
  let grd = ctx.createLinearGradient(0, 0, canvas.width, 0);
  grd.addColorStop(0,"#ff8701");
	grd.addColorStop(1,"#ffac02");
  return grd;
}


function oMousePos(canvas, evt) {
  var ClientRect = canvas.getBoundingClientRect();
  return { //objeto
    x: Math.round(evt.clientX - ClientRect.left),
    y: Math.round(evt.clientY - ClientRect.top)
  }
}// JavaScript Document