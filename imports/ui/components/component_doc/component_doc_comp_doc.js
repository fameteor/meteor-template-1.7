import '../icon/icon.js';
import { component_doc_PARMS } from './component_doc_PARMS.js';
import './component_doc_comp_doc.html';


Template.component_doc_comp_doc.helpers({
	/*
	iconList() {
		return Object.keys(iconsList);
	},
	*/
	component_doc_PARMS() {
		return JSON.stringify(component_doc_PARMS, null, 4);
	}
});