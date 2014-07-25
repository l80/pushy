/*! Pushy - v0.9.1 - 2013-9-16
 * Pushy is a responsive off-canvas navigation menu using CSS transforms & transitions.
 * https://github.com/christophery/pushy/
 * by Christopher Yee */


//www.eccesignum.org/blog/solving-display-refreshredrawrepaint-issues-in-webkit-browsers
(function ($) {
    $.fn.repaint = function () {
        this.hide();
        this.get(0).offsetHeight; // no need to store this anywhere, the reference is enough
        this.show();
    }
})(jQuery);

$.pushy = function (options) {

    options = $.extend({
        onOpen: function() {},
        onClose: function() {}
    }, options);

    var pushy = $('.pushy-nav'), //menu css class
        doc = $(document),
        html = $('html'),
        body = $('body'),
        menu = $('.menu'),
        push = $('.push'), //css class to add pushy capability
        siteOverlay = $('.pushy-cloak'), //site overlay
        pushyLeftActiveClass = "pushy-left-active", //css class to toggle site overlay
        pushyRightActiveClass = "pushy-right-active", //css class to toggle site overlay
        menuSpeed = 200; //jQuery fallback menu speed


    var documentPreventContentScroll = function(e){
        e.preventDefault();
    };

    var pushyPreventContentScroll = function(e) {
        e.stopPropagation();
    };

    function isLeftOpen() {
        return html.hasClass('pushy-left-active');
    }

    function isRightOpen() {
        return html.hasClass('pushy-right-active');
    }

    function togglePushyLeft() {
        html.removeClass(pushyRightActiveClass).toggleClass(pushyLeftActiveClass);
        pushyClasses();
    };

    function togglePushyRight() {
        html.removeClass(pushyLeftActiveClass).toggleClass(pushyRightActiveClass);
        pushyClasses();
    };

    function openPushy() {

        options.onOpen(pushy);

        //fix iphone landscape bug
        html.css('overflow-x', 'hidden');
        html.css('overflow-y', 'hidden');

        doc.on('touchmove', documentPreventContentScroll);
        pushy.on('touchmove', pushyPreventContentScroll);
    };

    function closePushy() {
        options.onClose(pushy);

        //fix iphone landscape bug
        html.css('overflow-x', '');
        html.css('overflow-y', '');

        doc.off('touchmove', documentPreventContentScroll);
        pushy.off('touchmove', pushyPreventContentScroll);

    };

    function pushyClasses() {

        if (isLeftOpen() || isRightOpen()) {
            openPushy();
        } else {
            closePushy();
        }
    };

    pushy.height(pushy.height() - menu.outerHeight());

    if (Modernizr.csstransforms3d) {
        //close menu when clicking site overlay
        siteOverlay.on('click', function () {
            if(isLeftOpen()) {
                togglePushyLeft();
            } else {
                togglePushyRight();
            }
        });
    }

    return {
        toggleLeft: togglePushyLeft,
        toggleRight: togglePushyRight
    }
};