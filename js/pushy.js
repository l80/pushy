/*! Pushy - v0.9.1 - 2013-9-16
 * Pushy is a responsive off-canvas navigation menu using CSS transforms & transitions.
 * https://github.com/christophery/pushy/
 * by Christopher Yee */

$(function() {
    var pushy = $('.pushy-nav'), //menu css class
        doc = $(document),
        html = $('html'),
        body = $('body'),
        container = $('.pushy-body'), //container css class
        push = $('.push'), //css class to add pushy capability
        siteOverlay = $('.pushy-cloak'), //site overlay
        pushyClass = "pushy-left pushy-open", //menu position & menu open class
        pushyActiveClass = "pushy-active", //css class to toggle site overlay
        containerClass = "container-push", //container open class
        pushClass = "push-push", //css class to add pushy capability
        menuBtn = $('.menu-btn, .pushy a'), //css classes to toggle the menu
        menuSpeed = 200, //jQuery fallback menu speed
        menuWidth = pushy.width() + "px", //jQuery fallback menu width
        isOpen = html.hasClass('pushy-active');

    var documentPreventContentScroll = function(e){
        e.preventDefault();
    };

    var pushyPreventContentScroll = function(e) {
        e.stopPropagation();
    };

    function togglePushy(){
        isOpen = !isOpen;
        html.toggleClass(pushyActiveClass); //toggle site overlay
        pushy.toggleClass(pushyClass);
        container.toggleClass(containerClass);
        push.toggleClass(pushClass); //css class to add pushy capability

        if (isOpen) {
            //fix iphone landscape bug
            html.css('overflow-x', 'hidden');
            html.css('overflow-y', 'hidden');

            doc.on('touchmove', documentPreventContentScroll);
            pushy.on('touchmove', pushyPreventContentScroll);
        } else {
            //fix iphone landscape bug
            html.css('overflow-x', '');
            html.css('overflow-y', '');

            doc.off('touchmove', documentPreventContentScroll);
            pushy.off('touchmove', pushyPreventContentScroll);

            //fix horizontal scroll
            setTimeout(function() {
                body.repaint();
            }, 200);
        }
    }

    function openPushyFallback(){
        html.addClass(pushyActiveClass);
        pushy.animate({left: "0px"}, menuSpeed);
        container.animate({left: menuWidth}, menuSpeed);
        push.animate({left: menuWidth}, menuSpeed); //css class to add pushy capability
    }

    function closePushyFallback(){
        html.removeClass(pushyActiveClass);
        pushy.animate({left: "-" + menuWidth}, menuSpeed);
        container.animate({left: "0px"}, menuSpeed);
        push.animate({left: "0px"}, menuSpeed); //css class to add pushy capability
    }

    if(Modernizr.csstransforms3d){
        //toggle menu
        menuBtn.click(function() {
            togglePushy();
        });
        //close menu when clicking site overlay
        siteOverlay.click(function(){
            togglePushy();
        });
    }else{
        //jQuery fallback
        pushy.css({left: "-" + menuWidth}); //hide menu by default
        container.css({"overflow-x": "hidden"}); //fixes IE scrollbar issue

        //keep track of menu state (open/close)
        var state = true;

        //toggle menu
        menuBtn.click(function() {
            if (state) {
                openPushyFallback();
                state = false;
            } else {
                closePushyFallback();
                state = true;
            }
        });

        //close menu when clicking site overlay
        siteOverlay.click(function(){
            if (state) {
                openPushyFallback();
                state = false;
            } else {
                closePushyFallback();
                state = true;
            }
        });
    }
});