import './routerPrevNext.html';
import './routerPrevNext.css';
import '../icon/icon.js';


Template.routerPrevNext.events = {
	// Boutons de navigation
	"click #previousButton" : function(e,tpl) {
		e.preventDefault();
		window.history.back();		
	},
	"click #nextButton" : function(e,tpl) {
		e.preventDefault();
		window.history.forward();		
	}
};


