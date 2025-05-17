jQuery(document).ready(function ($) {
    fixHeader();
    $(window).resize(function () {
        fixHeader();
    });

    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('#backToTop').fadeIn();
        } else {
            $('#backToTop').fadeOut();
        }
    });

    $('#backToTop').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 600);
        return false;
    });

    $('#menuToggle').click(function () {
        $('#mainMenu').toggleClass('active');
    });

    const $nav = $('#navigation');
    const navHeight = $nav.outerHeight();
    const $sections = $('main section');
    const $links = $('.menu li a');

    function updateActiveMenu() {
        const scrollTop = $(window).scrollTop();
        const scrollOffset = scrollTop + navHeight + 1;

        let activeId = null;

        $sections.each(function () {
            const $section = $(this);
            const sectionTop = $section.offset().top;

            if (scrollOffset >= sectionTop) {
                activeId = $section.attr('id');
            }
        });

        // 🔁 fallback explícito: no topo, forçar o primeiro item
        if (scrollTop <= 10) {
            activeId = $sections.first().attr('id');
        }

        if ($(window).scrollTop() + $(window).height() >= $(document).height() - 10) {
            activeId = $sections.last().attr('id');
        }

        console.log(activeId);
        // Atualiza o menu
        $links.removeClass('active');
        if (activeId) {
            $links.filter(`[href="#${activeId}"]`).addClass('active');
        }
    }

    $(window).on('scroll', updateActiveMenu);
    updateActiveMenu();


    $('.menu li a[href^="#"]').on('click', function (e) {
        e.preventDefault();

        const targetId = $(this).attr('href');
        const $target = $(targetId);

        if ($target.length) {
            const targetOffset = $target.offset().top - navHeight;

            $('html, body').animate({
                scrollTop: targetOffset
            }, 500);
        }
    });
});

function fixHeader() {
    let headerHeight = jQuery('#navigation').outerHeight();
    headerHeight += 40;
    jQuery('body').css({ "margin-top": headerHeight + 'px' });
}