(function (window) {
    'use strict';
    var init = function () {
        var list = new List('.to-do-list');
        if (list.el) {
            list.setupEvents();
        }
    };

    window.addEventListener('load', init);

}(window));