/**
	{
		"api":1,
		"name":"Format CSS",
		"description":"Cleans and format CSS stylesheets.",
		"author":"Ivan",
		"icon":"broom",
		"tags":"css,prettify,clean,indent",
        "bias": -0.1
	}
**/

var { css } = require('./scripts/lib/vkBeautify');


function main(state) {
	state.text = css(state.text)	
}
