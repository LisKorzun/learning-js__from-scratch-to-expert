(function (window) {
    'use strict';
    var initDiary = function () {
        var diary = new Diary(5);
        diary.render().setupEvents();
    };

    window.addEventListener('load', initDiary);

}(window));