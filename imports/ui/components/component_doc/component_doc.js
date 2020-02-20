import './component_doc.html';
import { component_docParms } from './component_docParms.js';

// Components docs import
import './component_doc_DOC.js';
import '../icon/icon_DOC.js';

Template.component_doc.helpers({
	componentsList(suffix) {
		// We list the names of the components having doc
		var componentsList = [];
		// We list all templates ending by suffix, for instance "_doc"
		Object.keys(Template).map(function(key) {
			if (key.endsWith(suffix)) componentsList.push(key.slice(0, key.length - 4))
		});
		return componentsList;
	},
	selectedTemplateName() {
		return FlowRouter.getParam("componentName");
	},
	chaptersList() {
		return component_docParms;
	}
});


