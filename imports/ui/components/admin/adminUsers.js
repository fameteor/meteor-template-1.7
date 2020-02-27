import './adminUsers.html';

Template.adminUsers.helpers({
	usersList() {
		return Meteor.users.find({},{sort: { "profile.alias": 1 }}).fetch();
	},
	email() {
		return this.emails && this.emails[0] && this.emails[0].address;
	},
	roleTranslation(role) {
		return TAPi18n.__("both.both_PARMS.permissions." + role);
	},
	deleteButtonTitle() {
		// If there is no object pointing on this user
		if (true) {
			if (Meteor.user()._id === this._id) {
				return TAPi18n.__("comp.adminUsers.noSelfDeletionMsg");
			}
			else {
				if (	this.emails 
						&& this.emails[0] 
						&& this.emails[0].address 
						&& this.emails[0].address ==="admin@orange.com") {
					return TAPi18n.__("comp.adminUsers.noAdminDeletionMsg");
				}
				else return TAPi18n.__("comp.adminUsers.deleteButton");
			}
		}
		else return TAPi18n.__("comp.adminUsers.deletionImpossibleMsg");
	},
	deleteButtonDisabled() {
		if (true) {
			if (Meteor.user()._id === this._id) {
				return "disabled";
			}
			else {
				if (	this.emails 
						&& this.emails[0] 
						&& this.emails[0].address 
						&& this.emails[0].address ==="admin@orange.com") {
					return "disabled";
				}
			}
		}
		else return "disabled";
	},
});