var GitHubBadge = GitHubBadge || {};

GitHubBadge.Launcher = new function() {
  var filename = "github-badge-launcher"; // without .js

  function requestContent( url, callback ) {
    // inserting via DOM fails in Safari 2.0, so brute force approach
    onLoadStr = (typeof callback == "undefined") ? "" : 'onload="' + callback + '()"';
    document.write('<script ' + onLoadStr + 'type="text/javascript" src="'+url+'"></script>');
  }

  function basePath() {
    var scripts = document.getElementsByTagName("script");
    for (var i=0; i < scripts.length; i++) {
      if (scripts[i].src && scripts[i].src.match(/github-badge-launcher\.js(\?.*)?/)) {
        return scripts[i].src.replace(/github-badge-launcher\.js(\?.*)?/, '');
      }
    }
  }

  this.init = function() {
    var libraries = [
        [typeof jQuery, "ext/jquery"], 
        // ["undefined", "ext/jquery"], 
        [typeof jQuery != "undefined" && typeof jQuery.template, "ext/jquery.template"]
      ];
    var scripts = document.getElementsByTagName("script");
    for (var i=0; i < scripts.length; i++) {
      if (scripts[i].src && scripts[i].src.match(/github-badge-launcher\.js(\?.*)?/)) {
        var path = scripts[i].src.replace(/github-badge-launcher\.js(\?.*)?/, '');
        for (var i=0; i < libraries.length; i++) {
          if (libraries[i][0] == "undefined" || !libraries[i][0]) {
            var url = path + libraries[i][1] + ".js";
            if (i == libraries.length - 1) {
              requestContent(url, "GitHubBadge.Launcher.loadedLibraries");
            } else {
              requestContent(url);
            }
          }
        }
        break;
      }
    }
  }

  this.loadedLibraries = function() {
    if(typeof jQuery == 'undefined' || typeof jQuery.template == 'undefined')
      throw("GitHub Badge requires jQuery and jQuery.template");
    
    GitHubBadge.buildUserBadge();
  }
}


GitHubBadge.Launcher.init();