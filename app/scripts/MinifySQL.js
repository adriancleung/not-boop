/**
	{
		"api":1,
		"name":"Minify SQL",
		"description":"Cleans and minifies SQL queries.",
		"author":"Ivan",
		"icon":"broom",
		"tags":"mysql,sql,minify,clean,indent",
        "bias": -0.1
	}
**/

var { sqlmin } = require('./scripts/lib/vkBeautify');


function main(state) {
	state.text = sqlmin(state.text)	
}
