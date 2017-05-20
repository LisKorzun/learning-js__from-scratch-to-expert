(function (window) {
    'use strict';
    var init = function () {
        new List('.to-do-list');
    };

    window.addEventListener('load', init);

}(window));