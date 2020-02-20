import './icon.js';
import { icons_PARMS } from './icons_PARMS.js';
import './icon_DOC.html';

Template.icon_DOC.helpers({
	iconList() {
		return Object.keys(icons_PARMS);
	},
	iconListJS() {
		return JSON.stringify(icons_PARMS, null, 4);
	}
});