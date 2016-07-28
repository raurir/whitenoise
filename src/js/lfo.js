import ev from "./events.js";
const lfo = (() => {

	// var reverb = new Tone.Freeverb(0.7, 2200).toMaster();

	// var distortion = new Tone.Distortion(0.1).toMaster();

	// var phaser = new Tone.Phaser({
	// 	"frequency" : 12,
	// 	"octaves" : 1,
	// 	"baseFrequency" : 17000
	// }).toMaster();

	var generators = [];
	var settings = [];

	let createFilteredNoise = (options) => {
		var filter = new Tone.AutoFilter({
			"frequency" : options.frequency,
			"depth" : 0.6,
			"min" : options.min,
			"max" : options.max
		}).toMaster().start();
		var noise = new Tone.Noise({
			type: options.type,
			"volume" : -Infinity,
		})
		// .connect(reverb)
		// .connect(distortion)
		// .connect(phaser)
		.connect(filter)
		.start();

		// setInterval(function() {
		// 	var newSpeed = Math.random() * 20;
		// 	filter.frequency.rampTo(newSpeed, 1.5);
		// }, options.timeout);

		// var newSpeed = options.frequency * 2;
		// filter.frequency.rampTo(newSpeed, 20);

		noise.volume.rampTo(-1, 2);

		generators.push({filter, noise});
	}

	let next = () => {
		generators.forEach((generator, index) => {
			con.log("settings", settings, index);
			var newFrequency = randInt(1, 8);
			settings[index].frequency = newFrequency;
			generator.filter.frequency.rampTo(newFrequency, 2);
		});
		ev.trigger(ev.settingsUpdated);
	}

	let reset = () => {
		generators.forEach((generator) => {
			generator.noise.volume.rampTo(-1/0, 1);
		});
		setTimeout(() => {
			generate(4);
		}, 1200);
	}

	let randNumber = (min, max) => {
		return Math.random() * (max - min) + min;
	}

	let randInt = (min, max) => {
		return Math.round(randNumber(min, max));
	}

	let getType = () => {
		var types = ["white", "brown", "pink"];
		return types[Math.floor(Math.random() * 3)];
	}

	let generate = (oscillators) => {
		generators = [];
		settings = Array.from(new Array(oscillators), (undefined,index) => {
			let min = randInt(1000, 24000);
			let max = randInt(min, 164000)
			return {
				frequency: 1 + index * 2,//randNumber(2, 12),
				type: getType(),
				min: min,
				max: max
			}
		});
		// con.log(settings);
		settings.forEach(createFilteredNoise);
		ev.trigger(ev.settingsUpdated);
	}

	setTimeout(() => {
		generate(3);
	}, 100);

	return {
		next,
		reset,
		getSettings: ()=> settings
	}

})();
export default lfo;