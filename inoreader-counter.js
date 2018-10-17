// ==UserScript==
// @name         Inoreader counter fix
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Inoreader counter fix
// @author       prokopiff@gmail.com
// @match        https://www.inoreader.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const NEW_MAX_UNREAD = 10000;
    max_unread = NEW_MAX_UNREAD;
    console.log("max_unread was set to " + NEW_MAX_UNREAD);
})();
