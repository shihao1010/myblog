var _createClass = function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor)
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor
    }
  }();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
var audioCtx = new(window.AudioContext || window.webkitAudioContext)();
var symbols = ['\u2669', '\u266A', ' \u266B', '\u266C'];  //音乐符号
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var cw = canvas.width = window.innerWidth,
  cx = cw / 2;
var ch = canvas.height = window.innerHeight,
  cy = ch / 2;
var w = cw / 12;
var h = ch / 6;
var requestId = null;
var rad = Math.PI / 180;
var rects = [];
var notes = [];
var particles = [];
var Rect = function() {
    function Rect(x, y, freq) {
      _classCallCheck(this, Rect);
      this.w = w;
      this.h = h;
      this.x = x;
      this.y = y;
      this.stop = true;
      this.frequency = freq;
      this.waveform = "triangle";
      this.dur = .75;
      this.initialGain = .15    //音符音量
    }
    _createClass(Rect, [{
      key: 'play',
      value: function play() {
        var _this = this;
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
        this.oscillator.onended = function() {
          return _this.stop = true
        }
      }
    }, {
      key: 'update',
      value: function update(cw, ch) {
        this.w = cw / 12;
        this.h = ch / 6
      }
    }, {
      key: 'isPointInPath',
      value: function isPointInPath(m) {
        var x = this.x * this.w;
        var y = this.y * this.h;
        ctx.beginPath();
        ctx.rect(x, y, this.w, this.h);
        if (ctx.isPointInPath(m.x, m.y) & this.stop) {
          this.play()
        }
      }
    }]);
    return Rect
  }();
for (var y = 0; y < 6; y++) {
  for (var x = 0; x < 12; x++) {
    var freq = frequencies[rects.length];
    var r = new Rect(x, y, freq);
    rects.push(r)
  }
}
var Particle = function() {           //气泡
    function Particle() {
      _classCallCheck(this, Particle);
      this.r = 10 + Math.random() * 10;    //气泡的半径
      this.x = this.r + Math.random() * (cw - this.r);  
      this.y = Math.random() * ch;
      this.speed = .5 + Math.random()*2 //控制气泡上升速度
    }
    _createClass(Particle, [{
      key: 'draw',
      value: function draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);

        ctx.shadowColor = '#7373ff';   //阴影颜色
        ctx.shadowBlur = 10;        //阴影半径

        ctx.fillStyle = grd();
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }, {
      key: 'update',
      value: function update() {
        if (this.y < -this.r) {
          this.y = ch + this.r;
          this.x = this.r + Math.random() * (cw - this.r)
        }
        this.y -= this.speed
      }
    }]);
    return Particle
  }();
for (var i = 0; i < 3; i++){     //循环次数为气泡个数
  var p = new Particle();
  particles.push(p)
}
var Note = function() {       //字符
    function Note(m) {
      _classCallCheck(this, Note);
      this.text = symbols[~~ (Math.random() * symbols.length)];

      this.x = m.x;
      this.y = m.y;
      this.fontSize = 10 + ~~ (Math.random() * 40);     //字符字体的大小
      this.alp = 1;     //字符持续时间
      this.speed = Math.random() + .5;
      this.frames = Math.random() * 360;
      this.angle = Math.sin(frames * rad) * Math.PI / 2
    }
    _createClass(Note, [{
      key: 'draw',
      value: function draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.font = this.fontSize + "px Verdana";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        let text_color='rgba('+parseInt(255*Math.random())+','+parseInt(255*Math.random())+','+parseInt(255*Math.random())+','+ 1 + ')';
        // ctx.fillStyle = grd();
          ctx.fillStyle=text_color;
        //   ctx.fillStyle=this.color;

        // ctx.fillText(this.text, this.x, this.y);     //填充音符
        ctx.fillText(this.text, 0, 0);     //填充音符
        ctx.restore()
      }
    }, {
      key: 'update',
      value: function update() {
        this.frames++;
        this.fontSize += .1;
        this.alp -= .01;
        this.angle = Math.sin(this.frames * rad) * Math.PI / 2;
        this.y -= this.speed;
        this.x += Math.sin(this.frames * rad)
      }
    }]);
    return Note
  }();

function Draw() {
  requestId = window.requestAnimationFrame(Draw);
  ctx.clearRect(0, 0, cw, ch);
  particles.map(function(p) {
    p.update();
    p.draw()
  });
  if($('#music').attr('title')=='点击关闭音符'){
    notes.map(function(n, index) {
        n.update();
        n.draw();
        if (n.alp <= 0) {
            notes.splice(index, 1)
        }
    })
  }

}
function Init() {
  if (requestId) {
    window.cancelAnimationFrame(requestId);
    requestId = null
  }
  cw = canvas.width = window.innerWidth, w = cw / 12;
  ch = canvas.height = window.innerHeight, h = ch / 6;
  rects.map(function(r) {
    return r.update(cw, ch)
  });
  particles.map(function(p) {
    return p.update()
  });
  Draw()
};
setTimeout(function() {
  Init();
  window.addEventListener('resize', Init)
}, 15);

var f1=function(evt) {
    var m = oMousePos(canvas, evt);
    rects.map(function(r) {       //触发声音
        return r.isPointInPath(m)
    });
};

document.body.addEventListener("mousemove",f1);

var f2=function(evt) {
    var m = oMousePos(canvas, evt);
    rects.map(function(r) {       //触发声音
        return r.isPointInPath(m)
    });
    if (Math.random() < .3) {       //触发音符
        var note = new Note(m);
        notes.push(note)
    }
};


function grd() {
  var grd = ctx.createLinearGradient(0, 0, canvas.width, 0);
  grd.addColorStop("0", "#ff65b1");     //气泡颜色
  grd.addColorStop("0.2","#7eff5a");
  grd.addColorStop("0.4","#ff6f40");
  grd.addColorStop("0.6","#dd43ff");
  grd.addColorStop("0.8","#fff655");
  grd.addColorStop("1","#4cd6ff");
  return grd
}
function oMousePos(canvas, evt) {
  var ClientRect = canvas.getBoundingClientRect();
  return {
    x: Math.round(evt.clientX - ClientRect.left),
    y: Math.round(evt.clientY - ClientRect.top)
  }
}


$('#sound').click(function () {
    if($('#sound').attr('title')=='点击关闭声音') {
        if($('#music').attr('title')=='点击关闭音符'){
            notes=[];
            $("#music").removeClass("glyphicon-pause").addClass("glyphicon-play");
            document.body.removeEventListener("mousemove",f2);
            document.body.addEventListener("mousemove",f1);
            $('#music').attr({title:'点击开启音符'});
        }
        document.body.removeEventListener("mousemove",f1);
        $("#sound").removeClass("glyphicon-volume-up").addClass("glyphicon-volume-off");
        $('#sound').attr({title:'点击开启声音'});
    }else{
        document.body.addEventListener("mousemove",f1);
        $("#sound").removeClass("glyphicon-volume-off").addClass("glyphicon-volume-up");
        $('#sound').attr({title:'点击关闭声音'});
    }
});

$('#music').click(function () {
    if($('#music').attr('title')=='点击开启音符') {
        if($('#sound').attr('title')=='点击开启声音') {
            document.body.addEventListener("mousemove",f1); //如果声音关闭，先开启声音
            $("#sound").removeClass("glyphicon-volume-off").addClass("glyphicon-volume-up");
            $('#sound').attr({title:'点击关闭声音'});
        }
        $("#music").removeClass("glyphicon-play").addClass("glyphicon-pause");
        document.body.removeEventListener("mousemove",f1);
        document.body.addEventListener("mousemove",f2);
        $('#music').attr({title:'点击关闭音符'});
    }else{
        notes=[];
        $("#music").removeClass("glyphicon-pause").addClass("glyphicon-play");
        document.body.removeEventListener("mousemove",f2);
        document.body.addEventListener("mousemove",f1);
        $('#music').attr({title:'点击开启音符'});
    }
});