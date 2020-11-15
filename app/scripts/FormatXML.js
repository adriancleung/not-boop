/**
	{
		"api":1,
		"name":"Format XML",
		"description":"Cleans and format XML/HTML documents.",
		"author":"Ivan",
		"icon":"broom",
		"tags":"html,prettify,clean,indent",
        "bias": -0.1
	}
**/

var { xml } = require('./scripts/lib/vkBeautify');


function main(state) {
	state.text = xml(state.text)	
}
