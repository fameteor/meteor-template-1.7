// Client entry point, imports all client code
import { Session } from 'meteor/session'
import '/imports/startup/client';
import '/imports/startup/both';


// i18n initialisation

Meteor.startup(function () {
	
	// Set the language
	Session.setDefault("language", client_PARMS.defaultLanguage);
	// Set and reset the language anytime it is changed
	Tracker.autorun(function() {
		var currentLanguage = Session.get("language");
		TAPi18n.setLanguage(currentLanguage);
		console.log('Language changed to : ' + currentLanguage);
	});
	// Run on login / logout
	Tracker.autorun(function() {
		// On login
		if (Meteor.user()) {
			if (	Meteor.user().profile
					&& Meteor.user().profile.language) {
				Session.set("language", Meteor.user().profile.language);
			}
		}
		// On logout
		else {
			
		}
	});
	
	// -----------------------------------------
	// Global helpers
	UI.registerHelper('hlp_eq', function(a,b) {
		return (a === b);
	});
	

  });
