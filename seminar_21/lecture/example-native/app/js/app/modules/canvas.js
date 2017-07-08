define(['underscore', 'jquery', 'util', 'text!templates/canvas.html'],
    function (_, $, util, canvasTpl) {
        return {
            init: function () {
                this.template = _.template(canvasTpl);
                this.currentState = false;
                this.$el = $('.section-canvas');
                this.name = 'module-canvas';

                util.getData('GET', 'data/canvas-examples.json', this.success.bind(this));
            },

            success: function (data) {
                this.render(data);
                this.setupEvents();
            },
            render: function (data) {
                this.$el.html(this.template(data));
            },

            setupEvents: function () {
                this.$el.on('click', function (e) {
                    var $heroMenuItem = $(e.target).closest('.hero-menu-item');
                    if ($heroMenuItem.length) {
                        this.$el.find('.hero-menu-item').each(function () {
                            $(this).removeClass('is-active');
                        });
                        $heroMenuItem.addClass('is-active');
                        this.$el.find('.module-item').each(function () {
                            $(this).removeClass('show');
                        });
                        this.displayElement($heroMenuItem);
                    }
                    if ($(e.target).is('.module-menu-item')) {
                        this.$el.find('.module-menu-item').each(function () {
                            $(this).removeClass('is-active');
                        });
                        $(e.target).addClass('is-active');
                        this.$el.find('.module-content-item').each(function () {
                            $(this).removeClass('show');
                        });
                        this.displayElement($(e.target));
                    }
                    var $tabItem = $(e.target).closest('.module-tab-item');
                    if ($tabItem.length) {
                        this.$el.find('.module-tab-item').each(function () {
                            $(this).removeClass('is-active');
                        });
                        $tabItem.addClass('is-active');
                        this.$el.find('.module-menu').each(function () {
                            $(this).removeClass('show');
                        });
                        this.$el.find('.module-content-item').each(function () {
                            $(this).removeClass('show');
                        });
                        this.displayElement($tabItem);
                    }
                }.bind(this))
            }
            ,
            displayElement: function ($el) {
                this.$el.find('#' + $el.data('target')).addClass('show');
            }
        }
    });