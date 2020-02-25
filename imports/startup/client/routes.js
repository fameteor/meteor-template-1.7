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
	{path: '/', 											mainTpl: 	'routerHome'},
	{path: '/admin/users', 									mainTpl: 	'adminUsers'},
	{path: '/dev/component_doc', 							mainTpl: 	'component_doc'},
	{path: '/dev/component_doc/:componentName/:suffix', 	mainTpl: 	'component_doc'}
];

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
