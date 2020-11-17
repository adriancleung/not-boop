// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const { dialog } = require('electron').remote;
const Fuse = require('fuse.js');
const SCRIPTS = require('./scripts');

const loadDependencies = function () {
  var dependencies = [
    'scripts/lib/base64.js',
    'scripts/lib/hashes.js',
    'scripts/lib/he.js',
    'scripts/lib/js-yaml.js',
    'scripts/lib/lodash.boop.js',
    'scripts/lib/vkBeautify.js',
  ];
  for (var i = 0; i < dependencies.length; i++) {
    var scriptTag = document.createElement('script');
    scriptTag.src = dependencies[i];
    document.body.appendChild(scriptTag);
  }
};

const loadJS = function (url, implementationCode, location) {
  var scriptTag = document.createElement('script');
  scriptTag.src = url;
  scriptTag.onload = implementationCode;
  location.appendChild(scriptTag);
};

const unloadJS = function () {
  let script_list = document.getElementsByTagName('script');
  for (var i = 0; i < script_list.length; i++) {
    if (!(script_list[i].src === '')) {
      document.body.removeChild(script_list[i]);
      i--;
    }
  }
};

const transformText = function () {
  obj = {
    text: document.getElementById('maintext').value,
    postInfo: info => {
      dialog.showMessageBox({ type: 'info', message: info, icon: null });
    },
    postError: error => {
      dialog.showMessageBox({ type: 'error', message: error, icon: null });
    },
  };
  main(obj);
  document.getElementById('maintext').value = obj.text;
  unloadJS();
};

document.addEventListener('readystatechange', event => {
  if (event.target.readyState === 'complete') {
    loadDependencies();
    document.getElementById('maintext').focus();
  }
});

window.addEventListener('keydown', e => {
  if (process.platform === 'darwin') {
    if (e.metaKey && e.key.toLowerCase() === 'b') {
      openModal();
    }
  } else {
    if (e.ctrlKey && e.key.toLowerCase() === 'b') {
      openModal();
    }
  }

  if (e.key === 'Escape') {
    closeModal();
    document.getElementById('maintext').focus();
  }
});

var modal = document.getElementById('searchModal');
var searchText = document.getElementById('searchText');
var span = document.getElementsByClassName('close')[0];
const options = {
  includeScore: true,
  includeMatches: true,
  location: 0,
  threshold: 0.4,
  distance: 100,
  keys: ['title'],
};
const fuse = new Fuse(SCRIPTS, options);

const openModal = function () {
  modal.style.display = 'block';
  searchText.focus();
};

const closeModal = function() {
  modal.style.display = 'none';
}

span.onclick = function (e) {
  closeModal();
};

searchText.oninput = function () {
  let results = fuse.search(searchText.value);
  let searchItems = document.getElementsByTagName('li');
  let searchList = document.getElementById('searchList');
  for (let i = 0; i < searchItems.length; i++) {
    searchItems[i].remove();
    i--;
  }

  for (let i = 0; i < results.length; i++) {
    let item = document.createElement('li');
    let link = document.createElement('a');
    let text = document.createTextNode(results[i].item.title);
    link.appendChild(text);
    link.onclick = function (e) {
      loadJS(
        'scripts/' + results[i].item.fileName,
        transformText,
        document.body
      );
      closeModal();
      document.getElementById('maintext').focus();
    };
    item.appendChild(link);
    searchList.appendChild(item);
  }
};

window.onclick = function (event) {
  if (event.target == modal) {
    closeModal();
  }
};
