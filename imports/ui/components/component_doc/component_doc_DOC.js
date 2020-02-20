import '../icon/icon.js';
import { component_docParms } from './component_docParms.js';
import './component_doc_DOC.html';


Template.component_doc_DOC.helpers({
	/*
	iconList() {
		return Object.keys(iconsList);
	},
	*/
	component_docParms() {
		return JSON.stringify(component_docParms, null, 4);
	}
});