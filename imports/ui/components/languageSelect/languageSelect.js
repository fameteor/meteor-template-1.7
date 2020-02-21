import { Session } from 'meteor/session'
import './languageSelect.html';
import '../../../startup/both/both_PARMS.js';

// ---------------------------------------------------------------
// HELPERS
// ---------------------------------------------------------------
Template.languageSelect.helpers({
	languageList() {
		return both_PARMS.languages;
	},
	i18nLanguageEntry(language) {
		return "comp.languageSelect." + language;
	},
	selectedLanguage() {
		return Session.get("language");
	}
});

// ---------------------------------------------------------------
// EVENTS
// ---------------------------------------------------------------
Template.languageSelect.events({
	'click .languageSelector'(evt, tpl) {
		// Change the session parameter 'language'
		Session.set("language",this.toString());
		// And if user is logged in, change the user language
		if (Meteor.userId()) Meteor.users.update(
			{_id: Meteor.userId()},
			{$set: {"profile.language": this.toString()}}
		);
	}
});