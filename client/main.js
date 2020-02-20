// Client entry point, imports all client code

import '/imports/startup/client';
import '/imports/startup/both';


// i18n initialisation

Meteor.startup(function () {
	getUserLanguage = function () {
		// Put here the logic for determining the user language
		// If the user has a language, the user's language is choosen
		return "fr";
		// Otherwise defaut language
		
	};

    TAPi18n.setLanguage(getUserLanguage())
		.done(function () {
			// Session.set("showLoadingIndicator", false);
		})
		.fail(function (error_message) {
			// Handle the situation
			console.log(error_message);
		});
  });
