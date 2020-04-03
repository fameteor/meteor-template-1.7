import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

schemas_languageInitialisation= function(instance) {
	instance.setDefaultMessages({
	initialLanguage: 'fr',
	messages: {
		fr: {
			required: '{{{label}}} est obligatoire',
			minString: '{{{label}}} doit faire au moins {{min}} caractères',
			maxString: '{{{label}}} doit faire au plus {{max}} characters',
			minNumber: '{{{label}}} doit-être supérieur à {{min}}',
			maxNumber: '{{{label}}} doit-être inférieur à {{max}}',
			minNumberExclusive: '{{{label}}} doit-être strictement supérieur à {{min}}',
			maxNumberExclusive: '{{{label}}} doit-être strictement inférieur à {{max}}',
			minDate: '{{{label}}} ne doit pas être antérieur à {{min}}',
			maxDate: '{{{label}}} de doit pas être postérieur à {{max}}',
			badDate: '{{{label}}} n\'est pas une date valide',
			minCount: 'Vous devez préciser au moins {{minCount}} valeurs',
			maxCount: 'Il ne peut y avoir plus de {{maxCount}} valeurs',
			noDecimal: '{{{label}}} doit être un entier',
			notAllowed: '{{{value}}} n\'est pas une valeur autorisée',
			expectedType: '{{{label}}} doit être un type {{dataType}}',
			keyNotInSchema: '{{name}} n\'est pas une valeur autorisée',
			regEx({ label, regExp }) {
                switch (regExp) {
                    case (instance.RegEx.Email.toString()):
                    case (instance.RegEx.EmailWithTLD.toString()):
                        return "Cette adresse e-mail est incorrecte";
                    case (instance.RegEx.Domain.toString()):
                    case (instance.RegEx.WeakDomain.toString()):
                        return "Ce champ doit être un domaine valide";
                    case (instance.RegEx.IP.toString()):
                        return "Cette adresse IP est invalide";
                    case (instance.RegEx.IPv4.toString()):
                        return "Cette adresse IPv4 est invalide";
                    case (instance.RegEx.IPv6.toString()):
                        return "Cette adresse IPv6 est invalide";
                    case (instance.RegEx.Url.toString()):
                        return "Cette URL is invalide";
                    case (instance.RegEx.Id.toString()):
                        return "Cet identifiant alphanumérique est invalide";
                    case (instance.RegEx.ZipCode.toString()):
                        return "Ce code ZIP est invalide";
                    case (instance.RegEx.Phone.toString()):
                        return "Ce numéro de téléphone est invalide";
                    default:
                        return "Ce champ a échoué la validation par Regex";
                }
            },
		},
	},
});
	
	
}

// Initialisation ------------------------------------------------------------
schemas_languageInitialisation(SimpleSchema);
SimpleSchema.extendOptions(['autoform','link']);
schemas = {};

// Schemas definitions -------------------------------------------------------
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
},{tracker:Tracker});



schemas.essai = new SimpleSchema({
	"alias":  {
		type: String,
		label: "essai",
		autoform: {
			autocomplete: "off"
		},
		link: {
			collection:	"Links",
			linkType: 	"ID"
		},
		optional: 	false,
	},
	"createdAt": {
		type: Date,
		autoValue: function() {
			if (this.isInsert) {
				return new Date();
			} else if (this.isUpsert) {
				return {$setOnInsert: new Date()};
			} else {
				this.unset();  // Prevent user from supplying their own value
			}
		}
	}
},{tracker:Tracker});

	