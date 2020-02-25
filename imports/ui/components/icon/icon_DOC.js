import './icon.js';
import '../../../startup/client/client_PARMS.js';
import './icon_DOC.html';

Template.icon_DOC.helpers({
	iconList() {
		return Object.keys(client_PARMS && client_PARMS.icons);
	},
	iconListJS() {
		return JSON.stringify(client_PARMS && client_PARMS.icons, null, 4);
	}
});