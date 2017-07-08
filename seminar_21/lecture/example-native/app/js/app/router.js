define([], function () {
    return {
        init: function (options) {
            this.routes = options.routes || [];
            this.currentRoute = {};

            window.addEventListener('hashchange', function () {
                    this.handleUrl(window.location.hash);
                }.bind(this)
            );
            this.handleUrl(window.location.hash);
        },

        findPreviousRoute: function () {
            return this.currentRoute;
        },

        findNewActiveRoute: function (url) {
            return this.routes.find(function (routeItem) {
                return url === routeItem.match;
            });
        },

        handleUrl: function (activeUrl) {
            var url = activeUrl.slice(1);
            var previousRoute = this.findPreviousRoute();
            var newRoute = this.findNewActiveRoute(url);

            Promise.resolve()
                .then(function () {
                    previousRoute && previousRoute.onLeave && previousRoute.onLeave()
                })
                .then(function () {
                    newRoute && newRoute.onEnter && newRoute.onEnter()
                })
                .then(function () {
                    this.currentRoute = newRoute || {};
                    console.log('%c route is changed: current route - ' + (this.currentRoute.match || '#'), 'background: #222; color: #bada55');
                }.bind(this));
        }
    };
});