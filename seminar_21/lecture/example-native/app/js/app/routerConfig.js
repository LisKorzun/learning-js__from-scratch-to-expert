define(['jquery'],
    function ($) {
        return {
            routes: [
                {
                    match: '',
                    onEnter: function () {
                        console.log('onEnter home');
                        $('.section-home').css({display: 'block'});
                    },
                    onLeave: function () {
                        console.log('onLeave home');
                        $('.main-section-item').css('display', 'none');
                    }
                },
                {
                    match: 'canvas',
                    onEnter: function () {
                        console.log('onEnter canvas');
                        $('.section-canvas').css({display: 'block'});
                    },
                    onLeave: function () {
                        console.log('onLeave canvas');
                        $('.main-section-item').css('display', 'none');
                    }
                }
            ]
        }
    });