var Post = function(tab,message) {
  var port = chrome.tabs.connect(tab.id, {});
  port.postMessage(message);
};

function storeLastCommand(msg) {
  var tab = arguments[arguments.length-1];
  Settings.add({ currentKeys : msg.currentKeys, times : msg.times });
}

function runScript(msg) {
  var tab = arguments[arguments.length-1];
  var code = msg.code;
  chrome.tabs.executeScript(tab.id, {code: code})
}

function externalEditor(msg) {
  var tab = arguments[arguments.length-1],index;
  var xhr = new XMLHttpRequest();
  var url = 'http://127.0.0.1:20000';
  xhr.open("POST", url, true);
  xhr.onreadystatechange = function() {
    if(xhr.readyState == 4 && xhr.status == 200) {
      var port = chrome.tabs.connect(tab.id, {});
      port.postMessage({ action : "InsertMode.externalEditorCallBack", edit_id : msg.edit_id, value : xhr.responseText });
    }
  };

  xhr.setRequestHeader("Content-type", "text/plain");
  xhr.send(JSON.stringify({'method':'open_editor','editor': Option.get("editor"), 'data' : msg.data}));
}

// notify new version
// var appVersion = "0.3.3";
// function checkFirstTime() {
// 	if (!Settings.get("firstTime")) {
//     Settings.add({ firstTime : true});
//     Settings.add({ version : appVersion});
//     Settings.add({ hotkeys : defaultVimKeyBindings });
//     return true;
// 	}
// 	return false;
// }
//
// function checkNewVersion() {
// 	if (Settings.get("version") != appVersion) {
//     Settings.add({version : appVersion});
// 	}
// }
//
// if (!checkFirstTime()) { checkNewVersion(); } //add to init

////////////////////////////////////////////////////////////////////////////////
// Popup Page
////////////////////////////////////////////////////////////////////////////////
function closePopup() {
	window.close();
}

function openOptions() {
	closePopup();
	extension.openOptions();
}

function openHelpWebsite() {
	closePopup();
	chrome.tabs.create({
		url: "https://github.com/jinzhu/vrome#readme"
	});
}

function openChromeStore() {
	closePopup();
	chrome.tabs.create({
		url: "https://chrome.google.com/webstore/detail/godjoomfiimiddapohpmfklhgmbfffjj/details"
	});
}

function openIssuesPage() {
	closePopup();
	chrome.tabs.create({
		url: "https://github.com/jinzhu/vrome/issues"
	});
}

function openSourcePage() {
	closePopup();
	chrome.tabs.create({
		url: "https://github.com/jinzhu/vrome"
	});
}
