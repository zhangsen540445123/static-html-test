/* ---------------------------------------------- /*
 * Preloader
 /* ---------------------------------------------- */
(function(){
    jQuery(window).on('load', function() {
        jQuery('.loader').fadeOut();
        jQuery('.page-loader').delay(350).fadeOut('slow');
    });

   jQuery(document).ready(function() {

        /* ---------------------------------------------- /*
         * Scroll top
         /* ---------------------------------------------- */

        jQuery(window).scroll(function() {
            if (jQuery(this).scrollTop() > 100) {
                jQuery('.scroll-up').fadeIn();
            } else {
                jQuery('.scroll-up').fadeOut();
            }
        });

        jQuery('a[href="#totop"]').click(function() {
            jQuery('html, body').animate({ scrollTop: 0 }, 'slow');
            return false;
        });


        /* ---------------------------------------------- /*
         * Initialization General Scripts for all pages
         /* ---------------------------------------------- */

        var homeSection = jQuery('.home-section'),
            navbar      = jQuery('.navbar-custom'),
            navHeight   = navbar.height(),
            worksgrid   = jQuery('#works-grid'),
            width       = Math.max(jQuery(window).width(), window.innerWidth),
            mobileTest  = false;

        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            mobileTest = true;
        }

        buildHomeSection(homeSection);
        navbarAnimation(navbar, homeSection, navHeight);
        navbarSubmenu(width);
        hoverDropdown(width, mobileTest);

        jQuery(window).resize(function() {
            var width = Math.max(jQuery(window).width(), window.innerWidth);
            buildHomeSection(homeSection);
            hoverDropdown(width, mobileTest);
        });

        jQuery(window).scroll(function() {
            effectsHomeSection(homeSection, this);
            navbarAnimation(navbar, homeSection, navHeight);
        });

        /* ---------------------------------------------- /*
         * Set sections backgrounds
         /* ---------------------------------------------- */

        var module = jQuery('.home-section, .module, .module-small, .side-image');
        module.each(function(i) {
            if (jQuery(this).attr('data-background')) {
                jQuery(this).css('background-image', 'url(' + jQuery(this).attr('data-background') + ')');
            }
        });

        /* ---------------------------------------------- /*
         * Home section height
         /* ---------------------------------------------- */

        function buildHomeSection(homeSection) {
            if (homeSection.length > 0) {
                if (homeSection.hasClass('home-full-height')) {
                    homeSection.height(jQuery(window).height());
                } else {
                    homeSection.height(jQuery(window).height() * 0.85);
                }
            }
        }


        /* ---------------------------------------------- /*
         * Home section effects
         /* ---------------------------------------------- */

        function effectsHomeSection(homeSection, scrollTopp) {
            if (homeSection.length > 0) {
                var homeSHeight = homeSection.height();
                var topScroll = jQuery(document).scrollTop();
                if ((homeSection.hasClass('home-parallax')) && (jQuery(scrollTopp).scrollTop() <= homeSHeight)) {
                    homeSection.css('top', (topScroll * 0.55));
                }
                if (homeSection.hasClass('home-fade') && (jQuery(scrollTopp).scrollTop() <= homeSHeight)) {
                    var caption = jQuery('.caption-content');
                    caption.css('opacity', (1 - topScroll/homeSection.height() * 1));
                }
            }
        }

        /* ---------------------------------------------- /*
         * Navbar submenu
         /* ---------------------------------------------- */

        function navbarSubmenu(width) {
            if (width > 767) {
                jQuery('.navbar-custom .navbar-nav > li.dropdown').hover(function() {
                    var MenuLeftOffset  = jQuery('.dropdown-menu', jQuery(this)).offset();
                    var Menu1LevelWidth = jQuery('.dropdown-menu', jQuery(this)).width();
                    if (width - MenuLeftOffset < Menu1LevelWidth * 2) {
                        jQuery(this).children('.dropdown-menu').addClass('leftauto');
                    } else {
                        jQuery(this).children('.dropdown-menu').removeClass('leftauto');
                    }
                    if (jQuery('.dropdown', jQuery(this)).length > 0) {
                        var Menu2LevelWidth = jQuery('.dropdown-menu', jQuery(this)).width();
                        if (width - MenuLeftOffset - Menu1LevelWidth < Menu2LevelWidth) {
                            jQuery(this).children('.dropdown-menu').addClass('left-side');
                        } else {
                            jQuery(this).children('.dropdown-menu').removeClass('left-side');
                        }
                    }
                });
            }
        }

		/* ---------------------------------------------- /*
         * Transparent navbar animation
         /* ---------------------------------------------- */

        function navbarAnimation(navbar, homeSection, navHeight) {
            var topScroll = jQuery(window).scrollTop();
            if (navbar.length > 0 && homeSection.length > 0) {
                if(topScroll >= navHeight) {
                    navbar.removeClass('navbar-transparent');
                } else {
                    navbar.addClass('navbar-transparent');
                }
            }
        }

		
        /* ---------------------------------------------- /*
         * Navbar hover dropdown on desctop
         /* ---------------------------------------------- */

        function hoverDropdown(width, mobileTest) {
            if ((width > 767) && (mobileTest !== true)) {
                jQuery('.navbar-custom .navbar-nav > li.dropdown, .navbar-custom li.dropdown > ul > li.dropdown').removeClass('open');
                var delay = 0;
                var setTimeoutConst;
                jQuery('.navbar-custom .navbar-nav > li.dropdown, .navbar-custom li.dropdown > ul > li.dropdown').hover(function() {
                        var jQuerythis = jQuery(this);
                        setTimeoutConst = setTimeout(function() {
                            jQuerythis.addClass('open');
                            jQuerythis.find('.dropdown-toggle').addClass('disabled');
                        }, delay);
                    },
                    function() {
                        clearTimeout(setTimeoutConst);
                        jQuery(this).removeClass('open');
                        jQuery(this).find('.dropdown-toggle').removeClass('disabled');
                    });
            } else {
                jQuery('.navbar-custom .navbar-nav > li.dropdown, .navbar-custom li.dropdown > ul > li.dropdown').unbind('mouseenter mouseleave');
                jQuery('.navbar-custom [data-toggle=dropdown]').not('.binded').addClass('binded').on('click', function(event) {
                    event.preventDefault();
                    event.stopPropagation();
                    jQuery(this).parent().siblings().removeClass('open');
                    jQuery(this).parent().siblings().find('[data-toggle=dropdown]').parent().removeClass('open');
                    jQuery(this).parent().toggleClass('open');
                });
            }
        }

        /* ---------------------------------------------- /*
         * Navbar collapse on click
         /* ---------------------------------------------- */

        jQuery(document).on('click','.navbar-collapse.in',function(e) {
            if( jQuery(e.target).is('a') && jQuery(e.target).attr('class') != 'dropdown-toggle' ) {
                jQuery(this).collapse('hide');
            }
        });
		
		
		/* ---------------------------------------------- /*
         * Slider JS
         /* ---------------------------------------------- */
		if( jQuery('.hero-slider').length > 0 ) {
			jQuery('.hero-slider').flexslider( {
				animation: "fade",
				animationSpeed: 1000,
				animationLoop: true,
				slideshow: true, //autoplay
				slideshowSpeed: 4000,
				pauseOnHover: false,
				touch: true,
				keyboard: true,
				prevText: '',
				nextText: '',
			
				before: function(slider) {
					jQuery('.titan-caption').fadeOut().animate({top:'-80px'},{queue:false, easing: 'swing', duration: 700});
					slider.slides.eq(slider.currentSlide).delay(500);
					slider.slides.eq(slider.animatingTo).delay(500);
				},
				after: function(slider) {
					jQuery('.titan-caption').fadeIn().animate({top:'0'},{queue:false, easing: 'swing', duration: 700});
				},
				useCSS: true
			});
		}
    });
})(jQuery);