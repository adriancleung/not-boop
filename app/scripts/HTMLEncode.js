/**
	{
		"api":1,
		"name":"HTML Encode",
		"description":"Encodes HTML entities in your text",
		"author":"See Source",
		"icon":"HTML",
		"tags":"html,encode,web"
	}
**/

var { encode } = require('./scripts/lib/he');

function main(input) {
	input.text = heEncode(input.text)
}
