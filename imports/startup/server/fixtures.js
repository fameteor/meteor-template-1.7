// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { Links } from '../../api/links/links.js';

Meteor.startup(() => {
	// Default ROLES creation ------------------------------------
	const rolesList = [
		"ADMIN",
		"DEV"
	];
	
	/* next version of alanning roles (not supported with that mongo version)
	rolesList.forEach(function(role) {
		Roles.createRole(role, {unlessExists: true});
	});
	*/
		
	// Default users creation ------------------------------------
    const initialUsersList = [
		{email:"admin@orange.com", 	password:"adminadmin",	alias: "ADMIN", roles:["CAN_ADMIN_USERS"], 							language : "fr"},
		{email:"dev@orange.com", 	password:"devdev",	 	alias: "DEV",	roles:["CAN_ADMIN_USERS","CAN_USE_DEV_MENU"], 		language : "en"},
	];

	if (Meteor.users.find().count() === 0) {
		initialUsersList.forEach(function(user) {
			const userId = Accounts.createUser(
					{
						"email": 			user.email,
						"password" : 		user.password
					}
				)
				// We add the alias
				Meteor.users.update({_id: userId}, {$set: {
						'profile.alias':user.alias,
						'profile.language':user.language
				}});
				// We update the roles
				Roles.addUsersToRoles(userId, user.roles);
		});
		console.log("Default users created.")
	}
	else console.log("Default users already exists.")
});
