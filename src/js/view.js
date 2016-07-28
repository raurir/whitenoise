import ev from "./events.js";
const view = (() => {

	const button = (text, eventName) => {
		let b = document.createElement("button");
		b.innerText = text;
		b.addEventListener("click", () => {ev.trigger(eventName);});
		return b;
	}

	const empty = (el) => {
		while(el.childNodes.length) {
			el.removeChild(el.firstChild);
		}
	}

	const div = (text) => {
		let d = document.createElement("div");
		if (text) d.innerText = text;
		return d;
	}

	var bn = button("morph", ev.next);
	var br = button("reset", ev.reset);

	const buttonsDiv = div();
	buttonsDiv.appendChild(bn);
	buttonsDiv.appendChild(br);
	document.body.appendChild(buttonsDiv);

	const settingsDiv = div();
	document.body.appendChild(settingsDiv);


	let showSettings = (settings) => {
		// con.log("showSettings", this);
		empty(settingsDiv);
		settings.forEach((setting) => {
			con.log(setting);
			var d = div(`frequency: ${setting.frequency} / type: ${setting.type} / min: ${setting.min} / max: ${setting.max}`);
			settingsDiv.appendChild(d);
			{}

		})
	}

	return {
		showSettings: showSettings
	}

})();
export default view;