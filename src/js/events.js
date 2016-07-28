const events = {
	trigger: (eventName) => {
		var e = new Event(eventName);
		// con.log("trigger", e);
		window.dispatchEvent(e);
	},
	on: (eventName, callback, params) => {
		// con.log("on...", eventName);
		if (params) {
			window.addEventListener(eventName, () => {
				callback(params()); // haha, this is ugly as all fuck. there's probably a library that does this <- HILARIOUS!
			});
		} else {
			window.addEventListener(eventName, callback);
		}
		// window.addEventListener(eventName, () => con.log("event", eventName));
	},
	next: 'next',
	reset: 'reset',
	settingsUpdated: 'settingsUpdated',
}
export default events;