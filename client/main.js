// Client entry point, imports all client code
import { Session } from 'meteor/session'
// import { AccountsUIBootstrap3 } from 'meteor/accounts-ui-bootstrap-3'



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
		// Change the language for the login UI
		accountsUIBootstrap3.setLanguage(currentLanguage);
		
		// ???????????????????????????????????????
		// To be optimized
		// ???????????????????????????????????????
		
		// We change the languages for all schemas
		Object.keys(schemas).forEach(function(value) {
			schemas[value].messageBox.language = currentLanguage;
		});
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
				console.log("Reroute executed");
			}
		}
		// On logout
		else {
			// We force the welcome screen (also log-in screen)
			if (!initialisationState) {
				console.log("Logout and route to /")
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
	
	let hlp_count = function(element) {
		if (Array.isArray(element)) return element.length;
		else if (element instanceof Mongo.Collection.Cursor) return element.count();
	};
	UI.registerHelper('hlp_count', hlp_count);
	
	// ----------------------------------------
	// AUTOFORM hooks -------------------------
	AutoForm.hooks({
		// For the users
		// ==============================================
		"insertUserForm" : {
			// Called when any submit operation succeeds
			onSuccess: function(formType, result) {
				// We close the popup
				$('.modal').modal('hide');
				// We display the success popup
				toastr.success(TAPi18n.__("comp.adminUsersEditModal.insertSuccessMsg"));
			},
			// Called when any submit operation fails
			onError: function(formType, error) {
				// We display the error popup
				// If server error, a reason must exist
				if (error.reason) toastr.warning(TAPi18n.__("comp.adminUsersEditModal.insertErrorMsg") + TAPi18n.__(error.reason));
				else toastr.warning(TAPi18n.__("comp.adminUsersEditModal.insertErrorMsg") + error);
			}
		},
		"modifyUserForm" : {
			// Called when any submit operation succeeds
			onSuccess: function(formType, result) {
				// We close the popup
				$('.modal').modal('hide');
				// We display the success popup
				toastr.success(TAPi18n.__("comp.adminUsersEditModal.modifySuccessMsg"));
			},
			// Called when any submit operation fails
			onError: function(formType, error) {
				// We display the error popup
				// If server error, a reason must exist
				if (error.reason)  toastr.warning(TAPi18n.__("comp.adminUsersEditModal.modifyErrorMsg") + TAPi18n.__(error.reason));
				else toastr.warning(TAPi18n.__("comp.adminUsersEditModal.modifyErrorMsg") + error);
			}
		},
	});
	

  });
