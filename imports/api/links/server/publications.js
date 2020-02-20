// All links-related publications

import { Meteor } from 'meteor/meteor';
import { Links } from '../links.js';

Meteor.publish('users.meOrAllForAdmin', function () {
	// If ADMIN, all users are published
	if (Roles.userIsInRole(this.userId, 'ADMIN')) return Meteor.users.find(
		{},
		fields : {
			emails: 1,
			profile: 1,
			createdAt: 1,
			roles: 1,
			status: 1			
		}
	);
	// Otherwise, only the connected user is published
	else return Meteor.users.find(
		{_id: this.userId},
		{fields: {"profile":1}}
	);
});
