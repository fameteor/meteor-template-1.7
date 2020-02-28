// Parameters common to server and clientInformation

export const both_PARMS = {
	"permissions" : [
		"CAN_ADMIN_USERS",
		"CAN_USE_DEV_MENU"
	],
};

// Function to build an array of {value,label} with localized labels for a both_PARMS property
// Ex : both_PARMS_optionsList("permissions")

export function both_PARMS_optionsList(paramName) {
	if (paramName in both_PARMS) {
		return both_PARMS[paramName].map(function(value) {
			return {
				"value": value,
				"label": TAPi18n.__("both.both_PARMS.permissions." + value)
			};
		});	
	}
	else console.log("both_PARMS_optionsList function error : " + paramName + " do not exists in /imports/startup/both/both_PARMS.js");
}