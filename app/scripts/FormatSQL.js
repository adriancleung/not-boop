/**
	{
		"api":1,
		"name":"Format SQL",
		"description":"Cleans and format SQL queries.",
		"author":"Ivan",
		"icon":"broom",
		"tags":"mysql,sql,prettify,clean,indent",
        "bias": -0.1
	}
**/

var { sql } = require('./scripts/lib/vkBeautify');


function main(state) {
	state.text = sql(state.text)	
}
