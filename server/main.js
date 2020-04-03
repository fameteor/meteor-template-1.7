Meteor.startup(() => {
		
	// Default users creation ------------------------------------
    const initialUsersList = [
	
		// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		// DO NOT MODIFY the EMAIL of the main administrator (admin@orange.com) : 
		// It is used to avoid to be modified (users creation and modification methods).
		// We need to keep it in ordre to have a "bootstrap" admin in case of users management errors
		// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		
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
	
	
	// Publications -----------------------------------------------------
	Meteor.publish('users.meOrAllForAdmin', function () {
		// If CAN_ADMIN_USERS, all users are published
		if (Roles.userIsInRole(this.userId, 'CAN_ADMIN_USERS')) return Meteor.users.find(
			{},
			{
				fields : {
					emails: 1,
					profile: 1,
					createdAt: 1,
					roles: 1,
					status: 1			
				}
			}
		);
		// Otherwise, only the connected user is published
		else return Meteor.users.find(
			{_id: this.userId},
			{fields: {"profile":1}}
		);
	});
	
	console.log("Users publication done.")
	
	// Methods ----------------------------------------------------------
	Meteor.methods({
		'addUser'(form) {
			// if the user is allowed to manage users
			if (Roles.userIsInRole(Meteor.userId(), 'CAN_ADMIN_USERS')) {
				// We create the user
				var userId = Accounts.createUser({email: form.email, password: form.password});
				// We update the users alias
				if (Meteor.users.update(
					{_id: userId},
					{
						$set: {
							'profile.alias': form.alias,
						}
					}
				) === 1) {
					// We set the roles to the user
					if (form.roles && form.roles.length != 0) Roles.setUserRoles(userId, form.roles);
					return "ok";
				} else throw new Meteor.Error("server.error.mongoInsertionFailure", "server.error.mongoInsertionFailure");
			} else throw new Meteor.Error("server.error.notAllowedToCreateUser", "server.error.notAllowedToCreateUser");
		},
		'modifyUser'(form) {
			// if the user is allowed to manage users
			if (Roles.userIsInRole(Meteor.userId(), 'CAN_ADMIN_USERS')) {

				// ????????????????????????????
				// ADMIN mail roles and alias should not be modified
				// ????????????????????????????

				var userInEditionId = form._id;
				var modifier = form && form.modifier && form.modifier.$set;
				// If the password is changed, we modify it
				if (modifier.password != "******") Accounts.setPassword(userInEditionId, modifier.password);
				// We change the alias and profile and email
				Meteor.users.update({_id: userInEditionId}, {
					$set: {
						'emails.0.address': modifier && modifier.email,
						'profile.alias': modifier && modifier.alias
					}
				});
				// We set the roles to the user
				if (modifier.roles && modifier.roles.length != 0) 	Roles.setUserRoles(userInEditionId, modifier.roles);
				else 												Roles.setUserRoles(userInEditionId, []);

				var usedRoles = modifier && modifier.roles;
				if (usedRoles) {
					Roles.setUserRoles(userInEditionId, usedRoles);
				}
				return "ok";
			} else throw new Meteor.Error("server.error.notAllowedToModifyUser", "server.error.notAllowedToModifyUser");
		},
		'removeUser'(id) {
			// if the user is allowed to manage users
			if (Roles.userIsInRole(Meteor.userId(), 'CAN_ADMIN_USERS')) {
				var user = Meteor.users.findOne(id);
				if (user) {
					if (Meteor.userId() === user._id) throw new Meteor.Error("server.error.selfDeletionNotAllowed", "server.error.selfDeletionNotAllowed");
					else {
						if (user.emails
							&& user.emails[0]
							&& user.emails[0].address
							&& user.emails[0].address != "admin@orange.com") {
							// Check for pointing objects
							if (true) {
								return Meteor.users.remove({_id: id});
							}
							else {
								throw new Meteor.Error("server.error.linksExistForThisUser", "server.error.linksExistForThisUser");
							}
						} else throw new Meteor.Error("server.error.adminCannotBeDeleted", "server.error.adminCannotBeDeleted");
					}
				} else throw new Meteor.Error("server.error.userDoesNotExist", "server.error.userDoesNotExist");
			} else throw new Meteor.Error("server.error.notAllowedToDeleteUser", "server.error.notAllowedToDeleteUser");
		},
	});
	
	console.log("Methods initialised.")
	
	console.log("Server started -----------------------------")

});
