import './serverStatus.html';
import '../icon/icon.js';


Template.serverStatus.helpers({
	status() {
		return Meteor.status().status;
	},
});


