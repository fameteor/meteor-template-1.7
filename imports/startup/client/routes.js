import { FlowRouter } from 'meteor/kadira:flow-router';
import { Session } from 'meteor/session';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
import '../../ui/layouts/body/body.js';
import '../../ui/components/admin/adminUsers.js';
import '../../ui/components/router/routerHome.js';
import '../../ui/components/router/routerNotFound.js';
import '../../ui/components/component_doc/component_doc.js';

// ROUTES DEFINITION -----------------------------------------
const routesList = [
	{path: '/', 											mainTpl: 	'routerHome', 		permissions: null},
	{path: '/admin/users', 									mainTpl: 	'adminUsers', 		permissions: ["CAN_ADMIN_USERS"]},
	{path: '/dev/component_doc', 							mainTpl: 	'component_doc', 	permissions: ["CAN_USE_DEV_MENU"]},
	{path: '/dev/component_doc/:componentName/:suffix', 	mainTpl: 	'component_doc', 	permissions: ["CAN_USE_DEV_MENU"]}
];

// GLOBAL SUBSCRIPTIONS --------------------------------------
Session.setDefault("waitingStatus", true);
Session.setDefault("waitingMsg", "chargement des données");

// Global subscriptions
FlowRouter.subscriptions = function(params, queryparams) {
	this.register('users.meOrAllForAdmin', Meteor.subscribe('users.meOrAllForAdmin'));
}

Tracker.autorun(function() {
	if (FlowRouter.subsReady()) {
		Session.set('waitingStatus', false);
	}
});

// ROUTES CHECK FOR PERMISSIONS ------------------------------

var permissionsControl = function() {
	const currentRouteParms = routesList.find(function(route) {
		return route.path === FlowRouter.current().route.pathDef;
	});
	if (currentRouteParms) {
		if (currentRouteParms.permissions) {
			if (!Roles.userIsInRole(Meteor.userId(),currentRouteParms.permissions)) {
				console.error("Unauthorised access to " + FlowRouter.current().route.pathDef);
				FlowRouter.go('/');
			}
			else return true;
		}
		else return true;
	}
	else {
		console.error("Unauthorised access to " + FlowRouter.current().route.pathDef + " (No route parm fits.)");
		FlowRouter.go('/');
	}
}

// ROUTES LOGGING --------------------------------------------

var routesLogging = function() {
	// If you want to log the routes used by your users
	// console.log("Log route : " + FlowRouter.current().path);		
}

// Checks and logs for all routes ----------------------------
FlowRouter.triggers.enter([permissionsControl,routesLogging]);


// ROUTES SETUP ----------------------------------------------
// Set up all routes in the app
routesList.forEach(function(route) {
	FlowRouter.route(
		route.path, 
		{
			// name: 'example',
			action() {
				BlazeLayout.render('App_body', { main: route.mainTpl });
			}
		}
	);
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'routerNotFound' });
  },
};
