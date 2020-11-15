/**
    {
        "api":1,
        "name":"SHA256 Hash",
        "description":"Computes the SHA256 hash of your text (Hex encoded)",
        "icon":"fingerprint",
        "tags":"strip,slashes,remove"
    }
**/
var Hashes = require('./scripts/lib/hashes');

function main(state) {
  var SHA256 = new Hashes.SHA256;
  state.text = SHA256.hex(state.text)
}
