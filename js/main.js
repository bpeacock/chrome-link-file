/*
** file: js/main.js
** description: javascript code for "html/main.html" page
*/

function init_main () {
  $('html').hide().fadeIn('slow');

  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var tab = tabs[0];

    $('form input[name=name]').val(tab.title);
    $('form input[name=url]').val(tab.url);
  });

  $('form').submit(function(e) {
    e.preventDefault();

    var blob = new Blob([
          '<html><head><meta http-equiv="refresh" content="0; url=',
          e.target.url.value,
          '"></head></html>'
        ], {type: "text/plain"});

    chrome.downloads.download({
      url:      URL.createObjectURL(blob),
      filename: e.target.name.value + '.html'
    });
  });
}

//bind events to dom elements
document.addEventListener('DOMContentLoaded', init_main);