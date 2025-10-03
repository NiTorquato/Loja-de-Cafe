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
    function initCustomSlider() {
        const slides = document.querySelectorAll('.single-slide');
        if (slides.length === 0) return; 
        
        const nextButton = document.querySelector('.next-slide');
        const prevButton = document.querySelector('.prev-slide');
        const dotsContainer = document.querySelector('.slider-dots');
        let currentSlide = 0;
        let slideInterval;
        const intervalTime = 3000; // Tempo de troca entre slides (3 segundos)

        // 1. Função principal para exibir o slide
        function showSlide(index) {
            // Remove as classes ativas do slide e do dot atual
            document.querySelector('.active-slide')?.classList.remove('active-slide');
            document.querySelector('.active-dot')?.classList.remove('active-dot');

            // Atualiza o índice, garantindo o loop (0, 1, ..., último, 0, 1, ...)
            currentSlide = (index + slides.length) % slides.length;

            // Adiciona as classes ativas ao novo slide e dot
            slides[currentSlide].classList.add('active-slide');
            // Busca o dot com o índice correspondente
            dotsContainer.querySelector(`.dot[data-index="${currentSlide}"]`).classList.add('active-dot');
        }

        // 2. Funções de Navegação e Auto-Slide
        function nextSlide() {
            showSlide(currentSlide + 1);
        }

        function resetInterval() {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, intervalTime); // Reinicia o auto-slide
        }

        // 3. Criação e Listeners dos Dots
        slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.setAttribute('data-index', index);
            if (index === 0) {
                dot.classList.add('active-dot');
            }
            dot.addEventListener('click', () => {
                resetInterval();
                showSlide(index);
            });
            dotsContainer.appendChild(dot);
        });

        // 4. Listeners para os botões de seta
        if (prevButton) prevButton.addEventListener('click', () => { resetInterval(); showSlide(currentSlide - 1); });
        if (nextButton) nextButton.addEventListener('click', () => { resetInterval(); nextSlide(); });

        // Inicia o auto-slide
        resetInterval();
    }
    
    // Inicializar o slider customizado quando o documento estiver pronto (mantendo o uso do jQuery)
    $(window).on('load', function() {
        initCustomSlider();
    });

    // Testimonial Carousel
    function initTestimonialSlider() {
        const testimonials = document.querySelectorAll('.testimonial-carousel .single-tesimonial');
        if (testimonials.length === 0) return; 
        
        const dotsContainer = document.querySelector('.testimonial-dots');
        let currentTestimonial = 0;
        let slideInterval;
        const intervalTime = 2000; // Tempo de troca (3 segundos)

        // 1. Função principal para exibir o testemunho
        function showTestimonial(index) {
            // Remove as classes ativas
            document.querySelector('.active-testimonial')?.classList.remove('active-testimonial');
            dotsContainer.querySelector('.active-dot')?.classList.remove('active-dot');

            // Atualiza o índice, garantindo o loop
            currentTestimonial = (index + testimonials.length) % testimonials.length;

            // Adiciona as classes ativas
            testimonials[currentTestimonial].classList.add('active-testimonial');
            dotsContainer.querySelector(`.dot[data-index="${currentTestimonial}"]`).classList.add('active-dot');
        }

        // 2. Criação e Listeners dos Dots
        testimonials.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.setAttribute('data-index', index);
            if (index === 0) {
                dot.classList.add('active-dot');
            }
            dot.addEventListener('click', () => {
                // Ao clicar, para e reinicia o auto-slide
                clearInterval(slideInterval);
                showTestimonial(index);
                slideInterval = setInterval(nextTestimonial, intervalTime); 
            });
            dotsContainer.appendChild(dot);
        });
        
        // 3. Funções de Auto-Slide (Próximo Testemunho)
        function nextTestimonial() {
            showTestimonial(currentTestimonial + 1);
        }

        // 4. Inicia o auto-slide
        slideInterval = setInterval(nextTestimonial, intervalTime);

        // Garante que o primeiro slide esteja ativo ao carregar
        if (!document.querySelector('.active-testimonial')) {
            testimonials[0].classList.add('active-testimonial');
        }
    }
    
    // Altere a chamada do $(window).on('load', function() { ... }) para incluir a nova função:
    $(window).on('load', function() {
        initCustomSlider(); // (Carrossel Principal)
        initTestimonialSlider(); // (Carrossel de Testemunhos) <--- Adicione esta linha
    });

    // Blog Carousel
    $('.blog-carousel').owlCarousel({
        loop: true,
        items: 3,
        dots: false,
        nav: false,
        responsive:{
            0:{
                items:1
            },
            480:{
                items:1
            },
            768:{
                items:2
            },
             992:{
                items:2
            },
             1200:{
                items:3
            }
        }
    });

    // JQuery MeanMenu
    $('.main-menu nav').meanmenu({
        meanScreenWidth: "991", 
        meanMenuContainer: '.mobile-menu'
    });

    // Mail Chimp
    $('#mc-form').ajaxChimp({
        language: 'en',
        callback: mailChimpResponse,
        url: 'http://themeshaven.us8.list-manage.com/subscribe/post?u=759ce8a8f4f1037e021ba2922&amp;id=a2452237f8'
    });

    function mailChimpResponse(resp) {
        if (resp.result === 'success') {
            $('.mailchimp-success').html('' + resp.msg).fadeIn(900);
            $('.mailchimp-error').fadeOut(400);
        } else if(resp.result === 'error') {
            $('.mailchimp-error').html('' + resp.msg).fadeIn(900);
        }
    }

    // Counter Up
    $('.counter').counterUp({
        delay: 70,
        time: 5000
    });

    // ScrollUp
    $.scrollUp({
        scrollText: '<i class="fa fa-angle-up"></i>',
        easingType: 'linear',
        scrollSpeed: 900,
        animation: 'fade'
    });

    new WOW().init();

    $('.datepicker').datepicker();
    
})(jQuery);