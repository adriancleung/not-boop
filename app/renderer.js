// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const { dialog } = require('electron').remote;

const loadDependencies = function() {
  var dependencies = [
    'scripts/lib/base64.js',
    'scripts/lib/hashes.js',
    'scripts/lib/he.js',
    'scripts/lib/js-yaml.js',
    'scripts/lib/lodash.boop.js',
    'scripts/lib/vkBeautify.js',
  ]
  for (var i = 0; i < dependencies.length; i++) {
    var scriptTag = document.createElement('script');
    scriptTag.src = dependencies[i];
    document.body.appendChild(scriptTag);
  }
}

const loadJS = function(url, implementationCode, location) {
  var scriptTag = document.createElement('script');
  scriptTag.src = url;
  scriptTag.onload = implementationCode;
  location.appendChild(scriptTag);
}

const unloadJS = function() {
  let script_list = document.getElementsByTagName('script');
  for (var i = 0; i < script_list.length; i++) {
    if (!(script_list[i].src === '')) {
      document.body.removeChild(script_list[i]);
      i--;
    }
  }
}

const transformText = function() {
  obj = {
    text: document.getElementById("maintext").value,
    postInfo: (info) => {dialog.showMessageBox({type: 'info', message: info, icon: null})},
    postError: (error) => {dialog.showMessageBox({type: 'error', message: error, icon: null})},
  }
  main(obj)
  document.getElementById("maintext").value = obj.text;
  unloadJS()
}

document.addEventListener('readystatechange', event => {
  if (event.target.readyState === 'complete') {
    loadDependencies();
    document.getElementById("maintext").focus();
  }
})

window.addEventListener('keydown', e => {
  if (process.platform === 'darwin') {
    if (e.metaKey && e.key.toLowerCase() === 'b') {
      loadJS('scripts/CountCharacters.js', transformText, document.body)
      e.preventDefault();
    }
  } else {
    if (e.ctrlKey && e.key.toLowerCase() === 'b') {
      // Open Modal
      e.preventDefault();
    }
  }
})