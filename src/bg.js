var $dcss = "";

function fetchCSS(cb) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://diagnosticss.github.io/css/diagnosticss.css", true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      $dcss = xhr.responseText;
      cb();
    }
  }
  xhr.send();
}

function insertCSS() {
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true
    },
    function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { dcss: $dcss, allFrames: true });
    }
  );
};

function setIcon(isEnabled, tabId) {
  var icon_path = (isEnabled ? 'enabled' : 'disabled') + '_icon19.png';
  chrome.browserAction.setIcon({ tabId: tabId, path: icon_path });
}

chrome.browserAction.onClicked.addListener(function(){
  if ($dcss.length < 3) {
    fetchCSS(insertCSS);
  } else {
    insertCSS();
  }
});

chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.method == 'setIcon') {
    setIcon(request.data.enabled, sender.tab.id);
  }
});

