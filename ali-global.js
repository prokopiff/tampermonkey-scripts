// ==UserScript==
// @name         Aliexpress - Go to global site
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       prokopiff@gmail.com
// @match        https://*.aliexpress.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    setTimeout(function() {
        console.log("Going to global site");
        var link = document.getElementsByClassName('link-goto-globalsite');
        link.length && link[0].click();
    }, 1000);
})();
