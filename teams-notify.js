// ==UserScript==
// @name         Teams Notify
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Try to fix this garbage
// @author       prokopiff@gmail.com
// @match        https://teams.microsoft.com/_
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  console.log("Modifying styles");
  (function() {
    // Create the <style> tag
    var style = document.createElement("style");

    // WebKit hack :(
    style.appendChild(document.createTextNode(""));

    // Add the <style> element to the page
    document.head.appendChild(style);

    style.sheet.insertRule("thread .ts-message .message-body-container { min-width: 250px; }");

  })();

  const CHECK_INTERVAL = 5000;
  const REPEAT_TIMEOUT = 120000;

  var notification = null;

  function notifyMe(msg) {
    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      show(msg)
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission(function (permission) {
        if (permission === "granted") {
          show(msg)
        }
      });
    } else {
      console.log("Notifications were denied");
    }
  }
  function show(msg) {
    if (notification == null) {
      notification = new Notification("Teams", { body: msg });
      setTimeout(function() {
        notification.close();
        notification = null;
      }, REPEAT_TIMEOUT)
    }
  }

  setInterval(function() {
    var message = "";

    var count = 0;
    var badges = $('.activity-badge-count');
    if (badges) {
      for (var i = 0; i < badges.length; ++i) {
        count += +badges[i].innerText;
      }
    }
    if (count > 0) {
      message += count + " new notifications\n";
    }

    var unreadChannels = $('.ts-unread-channel');
    if (unreadChannels && unreadChannels.length > 0) {
      message += unreadChannels.length + " unread channels";
    }
    if (message) {
      notifyMe(message);
    }
  }, CHECK_INTERVAL);

})();
