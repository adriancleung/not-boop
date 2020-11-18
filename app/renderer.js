const { dialog, getCurrentWindow } = require('electron').remote;
const Fuse = require('fuse.js');
const SCRIPTS = require('./scripts');
const win = getCurrentWindow();
const modal = document.getElementById('searchModal');
const searchText = document.getElementById('searchText');
const span = document.getElementsByClassName('close')[0];
const options = {
  includeScore: true,
  includeMatches: true,
  location: 0,
  threshold: 0.4,
  distance: 100,
  keys: ['title'],
};
const fuse = new Fuse(SCRIPTS, options);

const init = () => {
  if (process.platform === 'darwin') {
    document.getElementById('titlebar').style.display = 'none';
  }
  document.getElementById('min-button').addEventListener('click', event => {
    win.minimize();
  });
  document.getElementById('max-button').addEventListener('click', event => {
    win.maximize();
  });
  document.getElementById('restore-button').addEventListener('click', event => {
    win.unmaximize();
  });
  document.getElementById('close-button').addEventListener('click', event => {
    win.close();
  });

  toggleMaxRestoreButtons();
  win.on('maximize', toggleMaxRestoreButtons);
  win.on('unmaximize', toggleMaxRestoreButtons);
};

const toggleMaxRestoreButtons = () => {
  if (win.isMaximized()) {
    document.body.classList.add('maximized');
  } else {
    document.body.classList.remove('maximized');
  }
};

const loadDependencies = () => {
  let dependencies = [
    'scripts/lib/base64.js',
    'scripts/lib/hashes.js',
    'scripts/lib/he.js',
    'scripts/lib/js-yaml.js',
    'scripts/lib/lodash.boop.js',
    'scripts/lib/vkBeautify.js',
  ];
  for (let i = 0; i < dependencies.length; i++) {
    let scriptTag = document.createElement('script');
    scriptTag.src = dependencies[i];
    document.body.appendChild(scriptTag);
  }
};

const loadJS = (url, implementationCode, location) => {
  let scriptTag = document.createElement('script');
  scriptTag.src = url;
  scriptTag.onload = implementationCode;
  location.appendChild(scriptTag);
};

const unloadJS = () => {
  let script_list = document.getElementsByTagName('script');
  for (let i = 0; i < script_list.length; i++) {
    if (!(script_list[i].src === '')) {
      document.body.removeChild(script_list[i]);
      i--;
    }
  }
};

const transformText = () => {
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

const openModal = () => {
  modal.style.display = 'block';
  searchText.value = '';
  clearList();
  searchText.focus();
};

const closeModal = () => {
  modal.style.display = 'none';
};

const clearList = () => {
  let searchItems = document.getElementsByTagName('li');
  for (let i = 0; i < searchItems.length; i++) {
    searchItems[i].remove();
    i--;
  }
}

document.addEventListener('readystatechange', event => {
  if (event.target.readyState === 'complete') {
    init();
    loadDependencies();
    document.getElementById('maintext').focus();
  }
});

window.onbeforeunload = () => {
  win.removeAllListeners();
};

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

span.onclick = () => {
  closeModal();
};

searchText.oninput = () => {
  clearList();
  let results = fuse.search(searchText.value);
  let searchList = document.getElementById('searchList');

  for (let i = 0; i < results.length; i++) {
    let item = document.createElement('li');
    let link = document.createElement('a');
    let text = document.createTextNode(results[i].item.title);
    link.appendChild(text);
    link.onclick = () => {
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

window.onclick = event => {
  if (event.target == modal) {
    closeModal();
  }
};
