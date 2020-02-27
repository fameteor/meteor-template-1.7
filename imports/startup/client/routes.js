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

// Session variables -----------------------------------------
Session.setDefault("waitingStatus", true);
Session.setDefault("waitingMsg", "client.dataLoadingMsg");
Session.setDefault("rerouteAfterLogin", null);


// FlowRouter defered initialisation when Roles publication OK
// -----------------------------------------------------------
FlowRouter.wait();

Tracker.autorun(function() {
	// Wair for roles to initialize
	if (Roles.subscription.ready() && !FlowRouter._initialized) {
		console.log("FlowRouter initialisation")
		FlowRouter.initialize();
	}
});

// GLOBAL SUBSCRIPTIONS --------------------------------------
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
	// If logged in, check for permissions
	if (Meteor.userId()) {
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
			console.error("No route parm fits for " + FlowRouter.current().route.pathDef);
			FlowRouter.go('/');
		}
	}
	// If not logged in and if no reroute set, route to / with reroute on logging to requested URL
	else {
		if (!Session.get("rerouteAfterLogin")) Session.set("rerouteAfterLogin",FlowRouter.current().path);
		console.log(Session.get("rerouteAfterLogin"));
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
