window.con = console;
import lfo from "./lfo.js";
import view from "./view.js";
import ev from "./events.js";
ev.on(ev.next, lfo.next);
ev.on(ev.reset, lfo.reset);
ev.on(ev.settingsUpdated, view.showSettings, lfo.getSettings);