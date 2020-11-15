/**
	{
		"api":1,
		"name":"Minify XML",
		"description":"Cleans and minifies XML/HTML documents.",
		"author":"Ivan",
		"icon":"broom",
		"tags":"html,minify,clean,indent",
        "bias": -0.1
	}
**/

var { xmlmin } = require('./scripts/lib/vkBeautify');


function main(state) {
	state.text = xmlmin(state.text)	
}
