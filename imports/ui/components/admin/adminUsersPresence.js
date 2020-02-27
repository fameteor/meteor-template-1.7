import './adminUsersPresence.html';

Template.adminUsersPresence.helpers({
	connectedUser : function() {
		if (this.status && this.status.online == true )	return true;
		else 											return false;
	}
});