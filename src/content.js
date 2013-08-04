chrome.runtime.onMessage.addListener(function(request) {
  var inserted = document.getElementById('diagnosticss');

  if (inserted) {
    inserted.remove();
  } else {
    var css = document.createElement('style');
    css.type = 'text/css';
    css.id = 'diagnosticss';
    css.innerText = request.dcss;
    document.body.appendChild(css);
  }

  chrome.extension.sendMessage({
    method: 'setIcon',
    data: { enabled: !inserted }
  });
});
