define(['radio', 'router', 'routerConfig', 'modules/menu', 'modules/canvas'],
    function (radio, router, routerConfig, menu, canvas) {
        return {
            init: function () {
                router.init(routerConfig);
                menu.init();
                canvas.init();
            }
        };
    });
