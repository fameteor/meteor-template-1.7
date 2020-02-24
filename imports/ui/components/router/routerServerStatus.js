import './routerServerStatus.html';
import '../icon/icon.js';


Template.routerServerStatus.helpers({
	status() {
		return Meteor.status().status;
	},
});


