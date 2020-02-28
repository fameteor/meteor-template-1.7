import './presence.html';

Template.presence.helpers({
	connectedUser : function() {
		return (this.status && this.status.online === true );
	}
});