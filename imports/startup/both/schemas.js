import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

import { both_PARMS, both_PARMS_optionsList } from './both_PARMS.js';

SimpleSchema.extendOptions(['autoform']);

schemas = {};

schemas.userForm = new SimpleSchema({
	"alias":  {
		type: String,
		label: function() { return TAPi18n.__("both.schemas.userForm.alias");},
		autoform: {
			autocomplete: "off"
		},
		optional: 	false,
	},
    "email": {
		type: String,
		regEx: SimpleSchema.RegEx.Email,
		label: function() { return TAPi18n.__("both.schemas.userForm.email");},
		autoform: {
			autocomplete: "off"
		},
		optional: 	false,
	},
    "password": {
		type: String,
		label: function() { return TAPi18n.__("both.schemas.userForm.password");},
		min: 6,
		autoform: {
			autocomplete: "off",
			placeholder:"6 caractères min."
		},
		optional: 	false,
	},
	"roles": {
		type: Array,
		label: function() { return TAPi18n.__("both.schemas.userForm.roles");},
		autoform: {
			type: 'select-checkbox',
			options:  function() {return both_PARMS_optionsList("permissions")},
		},
		optional: 	true,
	},
	"roles.$": {
		type:	 	String,
		label: function() { return TAPi18n.__("both.schemas.userForm.roles");},
		allowedValues: both_PARMS.permissions,
		optional: 	true,
	}	
},{tracker:Tracker})