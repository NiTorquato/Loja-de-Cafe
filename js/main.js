(function($) {
    "use strict";

    // Menu
    var windows = $(window);
    var stick = $(".header-sticky");
    windows.on('scroll', function() {
        var scroll = windows.scrollTop();
        if (scroll < 245) {
            stick.removeClass("sticky");
        } else {
            stick.addClass("sticky");
        }
    });

    // Slider Carousel
    $('.slider-carousel').owlCarousel({
        loop: true,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        smartSpeed: 2500,
        items: 1,
        nav: true,
        navText: ["<i class= 'zmdi zmdi-chevron-left'></i>", "<i class= 'zmdi zmdi-chevron-right'></i>"],
        dots: true,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 1,
            },
            1000: {
                items: 1,
            }
        }
    })    
})
 