/**
    {
        "api":1,
        "name":"SHA512 Hash",
        "description":"Computes the SHA512 hash of your text (Hex encoded)",
        "icon":"fingerprint",
        "tags":"strip,slashes,remove"
    }
**/

var Hashes = require('./scripts/lib/hashes');

function main(state) {
  var SHA512 = new Hashes.SHA512;
  state.text = SHA512.hex(state.text)
}
