/**
	{
		"api":1,
		"name":"Minify CSS",
		"description":"Cleans and minifies CSS stylesheets.",
		"author":"Ivan",
		"icon":"broom",
		"tags":"css,minify,clean,indent",
        "bias": -0.1
	}
**/

var { cssmin } = require('./scripts/lib/vkBeautify');


function main(state) {
	state.text = cssmin(state.text)	
}
