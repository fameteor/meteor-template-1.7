// Client entry point, imports all client code
import { Session } from 'meteor/session'
// import { AccountsUIBootstrap3 } from 'meteor/accounts-ui-bootstrap-3'
import '/imports/startup/client';
import '/imports/startup/both';


// i18n initialisation

Meteor.startup(function () {
	// To avoid logout
	let initialisationState = true; 
	// Set the language
	Session.setDefault("language", client_PARMS.defaultLanguage);
	// Set and reset the language anytime it is changed
	Tracker.autorun(function() {
		var currentLanguage = Session.get("language");
		TAPi18n.setLanguage(currentLanguage);
		accountsUIBootstrap3.setLanguage(currentLanguage);
	});
	// Run on login / logout
	Tracker.autorun(function() {
		// On login
		if (Meteor.user()) {
			// Set the language
			if (	Meteor.user().profile
					&& Meteor.user().profile.language) {
				Session.set("language", Meteor.user().profile.language);
			}
			// Reroute to initial requested route if set
			if (Session.get("rerouteAfterLogin")) {
				FlowRouter.go(Session.get("rerouteAfterLogin"));
				Session.set("rerouteAfterLogin", null);
				console.log("end reroute");
			}
		}
		// On logout
		else {
			// We force the welcome screen (also log-in screen)
			if (!initialisationState) {
				console.log("logout and route to /")
				FlowRouter.go('/');
			}
		}
	});
	initialisationState = false; 
		
	// -----------------------------------------
	// Global helpers
	UI.registerHelper('hlp_eq', function(a,b) {
		return (a === b);
	});
	UI.registerHelper('hlp_sessionVar', function(name) {
		return Session.get(name);
	});
	

  });
