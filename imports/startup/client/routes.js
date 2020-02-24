import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
import '../../ui/layouts/body/body.js';
import '../../ui/components/router/routerLogin.js';
import '../../ui/components/router/routerHome.js';
import '../../ui/components/router/routerNotFound.js';
import '../../ui/components/component_doc/component_doc.js';

// Global subscriptions
FlowRouter.subscriptions = function(params, queryparams) {
	this.register('users.meOrAllForAdmin', Meteor.subscribe('users.me'));
}

// Set up all routes in the app
FlowRouter.route('/', {
	// name: 'App.home',
	action() {
		BlazeLayout.render('App_body', { main: 'routerHome' });
	}
});

FlowRouter.route('/dev/component_doc', {
	// name: 'App.home',
	action() {
		BlazeLayout.render('App_body', { main: 'component_doc'});
	}
});

FlowRouter.route('/dev/component_doc/:componentName/:suffix', {
	// name: 'App.home',
	action() {
		BlazeLayout.render('App_body', { main: 'component_doc'});
	}
});



FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'routerNotFound' });
  },
};
