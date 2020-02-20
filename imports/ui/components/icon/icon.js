import fontawesome from '@fortawesome/fontawesome-free/js/all.js';
import './icon.html';
import { icons_PARMS } from './icons_PARMS.js';

Template.icon.helpers({
	iconName(name) {
		return icons_PARMS && icons_PARMS[name];
	},
});


