/**
 * Created by mikiz on 13/05/2018.
 */

var refresh_time = 3000;//3 sec
window.store = [];
var oldf = console.log;

getParameterByName = function (name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
};

nerdMode = function () {
    var style = '<style>html,body {' +
        'margin: 0;' +
        '}' +
        '.nerd-mode {' +
        'width: 100%;' +
        'min-height: 50px;' +
        'background: white;' +
        'border: 10px solid black;' +
        'position: fixed;' +
        'bottom: 0;' +
        'direction: ltr;' +
        'box-sizing: border-box;' +
        'text-align: left;' +
        'padding: 10px;' +
        '}</style>';

    var consoleEl = '<div class="nerd-mode"><ol></ol></div>';

    document.body.innerHTML += style;
    document.body.innerHTML += consoleEl;


    window.store.push('Welcome to the jungle baby  ...');
    old_store = window.store;
    document.querySelector('.nerd-mode ol').innerHTML += '<li>' + JSON.stringify(window.store[0]) + '</li>';

    setInterval(function () {
        if (JSON.stringify(window.store) !== JSON.stringify(old_store)) {
            document.querySelector('.nerd-mode ol').innerHTML = '<li>' + window.store.join("</li><li>") + '</li>';
            old_store = JSON.parse(JSON.stringify(window.store));
        }
    }, refresh_time);
};

if (getParameterByName('nerd-mode') === '1') {
    nerdMode();
}

console.log = function () {
    store.push(arguments[0]);
    if (window.location.origin !== 'https://app.reshet.tv' || getParameterByName('nerd-mode') > 0) {
        oldf.apply(console, arguments);
    }
};

/*polyfill - filter*/
if (!Array.prototype.filter) {
    Array.prototype.filter = function (func, thisArg) {
        'use strict';
        if (!((typeof func === 'Function' || typeof func === 'function') && this))
            throw new TypeError();

        var len = this.length >>> 0,
            res = new Array(len), // preallocate array
            t = this, c = 0, i = -1;
        if (thisArg === undefined)
            while (++i !== len)
                // checks to see if the key was set
                if (i in this)
                    if (func(t[i], i, t))
                        res[c++] = t[i];
                    else
                        while (++i !== len)
                            // checks to see if the key was set
                            if (i in this)
                                if (func.call(thisArg, t[i], i, t))
                                    res[c++] = t[i];

        res.length = c; // shrink down array to proper size
        return res;
    };
}

(function () {
    if (window.onerror) {
        var old_prototype = window.onerror.prototype;
        var old_onerror = window.onerror;
    }
    window.onerror = function (errorMsg, url, lineNumber, callback) {
        old_onerror.apply(this, arguments);

        var err = [errorMsg, url, lineNumber];
        err = err.filter(Boolean);

        console.log(errorRow('Error occured: ' + err.join(' ,')));//or any message
        if (callback) callback();
        return false;
    };
    if (old_prototype) {
        window.onerror.prototype = old_prototype;
    }

})();


errorRow = function (err) {
    return '<b style="color:red">' + err + '</b>'
};

