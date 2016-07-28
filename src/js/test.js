var con = console;
/*
var kick = new Tone.MembraneSynth({
	"envelope" : {
		"sustain" : 0,
		"attack" : 0.02,
		"decay" : 0.8
	},
	"octaves" : 10
}).toMaster();

var kickPart = new Tone.Loop(function(time){
	kick.triggerAttackRelease("C2", "8n", time);
}, "2n").start(0);

var snare = new Tone.NoiseSynth({
	"volume" : -5,
	"envelope" : {
		"attack" : 0.001,
		"decay" : 0.2,
		"sustain" : 0
	},
	"filterEnvelope" : {
		"attack" : 0.001,
		"decay" : 0.1,
		"sustain" : 0
	}
}).toMaster();

var snarePart = new Tone.Loop(function(time){
	snare.triggerAttack(time);
}, "2n").start("4n");


var bass = new Tone.MonoSynth({
	"volume" : -10,
	"envelope" : {
		"attack" : 0.1,
		"decay" : 0.1,
		"release" : 0.1,
	},
	"filterEnvelope" : {
		"attack" : 0.001,
		"decay" : 0.01,
		"sustain" : 0.5,
		"baseFrequency" : 200,
		"octaves" : 2.6
	}
}).toMaster();

var bassPart = new Tone.Sequence(function(time, note){
	bass.triggerAttackRelease(note, "8n", time);
// }, ["C2", ["C1", "c2", "C3", "C4"], "E2", ["G2", "G3", "G4", "G5"]]).start(0);
}, [["C1", "c2", "C3", "C4"], ["C1", "c2", "C3", "C#4"]]).start(0);

bassPart.probability = 1;

 */

var delay = new Tone.FeedbackDelay({
	feedback: 1,
	delayTime: 0.5
});

var dist = new Tone.Distortion().toMaster();
var filter = new Tone.AutoFilter({
	"frequency" : 1,
	"depth" : 1
}).start();
// var filter = new Tone.AutoFilter("4n").toMaster().start();

var reverb = new Tone.Freeverb(0.9, 4000)
	.toMaster();
var pitchShift = new Tone.PitchShift({
		"delayTime" : "4n",
		"feedback" : 0.3
	});

var noiseSynth = new Tone.NoiseSynth({
	"volume" : -7,
	// noise: {
	// 	type: "brown",
	// },
	"envelope" : {
		"attack" : 0.1,
		"sustain" : 1
	},
	"filterEnvelope" : {
		"attack" : 0.001,
		"decay" : 1,
		"sustain" : 1,
		"baseFrequency" : 200,
		"octaves" : 2.6
	}
})
// .connect(autoWah)
// .connect(dist)
// .connect(reverb)
.connect(delay)

// .connect(filter)
.toMaster();

// noiseSynth.triggerAttackRelease("8n");
noiseSynth.triggerAttack();


function setOn() {
	con.log("setOn");
	noiseSynth.volume.rampTo(0, 0.1);
};
function setOff() {
	con.log("setOff");
	noiseSynth.volume.rampTo(-Infinity, 0.1);
};


var backOn = function() {
	setOn();
	setTimeout(backOff, 100);
};
var backOff = function() {
	setOff();
	setTimeout(backOn, 500);
};

backOff();



//set the transport
Tone.Transport.bpm.value = 140;
Tone.Transport.start();