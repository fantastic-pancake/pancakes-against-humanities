import _ from "lodash";

const context = require.context("./", false, /\.js$/);
const components = context
	.keys() // module names for each one of these components
	.filter(name => name.indexOf("index") == -1) // we don't want the file to include itself
	.map(name => context(name).default);

	// now we convert the array  [{id: 1, comp: ef}, {id: 2, comp: fewf}] to something easier on the eyes

export default _.zipObject(
	components.map(c => c.id),
	components.map(c => c.component));