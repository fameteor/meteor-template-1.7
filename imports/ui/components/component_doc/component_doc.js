import './component_doc.html';
import { component_docParms } from './component_docParms.js';

// Components docs import
import './component_doc_DOC.js';
import '../icon/icon_DOC.js';
import '../languageSelect/languageSelect_comp_doc.js';

Template.component_doc.helpers({
	componentsList(suffix) {
		console.log(suffix)
		// We list the names of the components having doc
		var componentsList = [];
		// We list all templates ending by suffix, for instance "_doc"
		

		Object.keys(Template).map(function(key) {
			console.log(key)
			console.log(suffix)
			console.log(key.endsWith(suffix))
			if (key.endsWith(suffix)) componentsList.push(key.slice(0, key.length - suffix.length))
		});
		return componentsList;
	},
	selectedDocTemplateName() {
		return FlowRouter.getParam("componentName") + FlowRouter.getParam("suffix");
	},
	selectedTemplateName() {
		return FlowRouter.getParam("componentName");
	},
	selectedSuffixName() {
		return FlowRouter.getParam("suffix");
	},
	chaptersList() {
		console.log(component_docParms)
		return component_docParms;
	}
});


