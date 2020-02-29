export function schemas_languageInitialisation(instance) {
	instance.setDefaultMessages({
	initialLanguage: 'fr',
	messages: {
		fr: {
			required: 'Ce champ est obligatoire',
			minString: 'Ce champ doit faire au moins {{min}} caractères',
			maxString: 'Ce champ doit faire au plus {{max}} characters',
			minNumber: 'Ce champ doit-être supérieur à {{min}}',
			maxNumber: 'Ce champ doit-être inférieur à {{max}}',
			minNumberExclusive: 'Ce champ doit-être strictement supérieur à {{min}}',
			maxNumberExclusive: 'Ce champ doit-être strictement inférieur à {{max}}',
			minDate: 'Ce champ ne doit pas être antérieur à {{min}}',
			maxDate: 'Ce champ de doit pas être postérieur à {{max}}',
			badDate: 'Ce champ n\'est pas une date valide',
			minCount: 'Vous devez préciser au moins {{minCount}} valeurs',
			maxCount: 'Il ne peut y avoir plus de {{maxCount}} valeurs',
			noDecimal: 'Ce champ doit être un entier',
			notAllowed: 'Valeur non autorisée pour ce champ',
			expectedType: 'Ce champ doit être un type {{dataType}}',
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