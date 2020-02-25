import fontawesome from '@fortawesome/fontawesome-free/js/all.js';
import './icon.html';
import '../../../startup/client/client_PARMS.js';

Template.icon.helpers({
	iconName(name) {
		if (client_PARMS && client_PARMS.icons) return client_PARMS.icons[name];
	},
});


