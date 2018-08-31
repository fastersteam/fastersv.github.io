
function scroll_to(clicked_link, nav_height) {
	var element_class = clicked_link.attr('href').replace('#', '.');
	var scroll_to = 0;
	if(element_class != '.top-content') {
		element_class += '-container';
		scroll_to = $(element_class).offset().top - nav_height;
	}
	if($(window).scrollTop() != scroll_to) {
		$('html, body').stop().animate({scrollTop: scroll_to}, 1000);
	}
}


jQuery(document).ready(function() {

	/*
	    Navigation
	*/
	$('a.scroll-link').on('click', function(e) {
		e.preventDefault();
		scroll_to($(this), $('nav').outerHeight());
	});
	// toggle "navbar-no-bg" class
	$('.top-content').waypoint(function() {
		$('nav').toggleClass('navbar-no-bg');
	}, {
		offset: function() {
					return -$(this).outerHeight() + $('nav').outerHeight();
				}
	});

    /*
	    Scroll to top
	*/
    $('.scroll-to-top a').on('click', function(e) {
		e.preventDefault();
		var scroll_to = 0;
		if($(window).scrollTop() != scroll_to) {
			$('html, body').stop().animate({scrollTop: scroll_to}, 1000);
		}
	});

    /*
	    Wow
	*/
	new WOW().init();

	/*
	    Slider
	*/
	$('.slides').superslides({
		play: 12000,
		animation: 'fade'
	});

    /*
        Fullscreen backgrounds
    */
/*	$('.we-love-design-container').backstretch("assets/img/backgrounds/4.jpg");
	$('.history-container').backstretch("assets/img/backgrounds/4.jpg");
	$('.clients-container').backstretch("assets/img/backgrounds/3.jpg");
	$('.how-we-do-it-container').backstretch("assets/img/backgrounds/4.jpg");
	$('.testimonials-container').backstretch("assets/img/backgrounds/1.jpg");
	$('.contact-container').backstretch("assets/img/backgrounds/4.jpg");
	$('.address-container').backstretch("assets/img/backgrounds/1.jpg"); */

    $('a[data-toggle="tab"]').on('shown.bs.tab', function() {
    	$('.testimonials-container').backstretch("resize");
    });

    $('.panel-collapse').on('hidden.bs.collapse', function() {
    	$('.we-love-design-container').backstretch("resize");
    });
    $('.panel-collapse').on('shown.bs.collapse', function() {
    	$('.we-love-design-container').backstretch("resize");
    });

	/*
	    Contact form
	*/
	$('.contact-form form input[type="text"], .contact-form form textarea').on('focus', function() {
		$('.contact-form form input[type="text"], .contact-form form textarea').removeClass('contact-error');
	});
	$('.contact-form form').submit(function(e) {
		e.preventDefault();
	    $('.contact-form form input[type="text"], .contact-form form textarea').removeClass('contact-error');
	    var postdata = $('.contact-form form').serialize();
	    $.ajax({
	        type: 'POST',
	        url: 'assets/contact.php',
	        data: postdata,
	        dataType: 'json',
	        success: function(json) {
	            if(json.emailMessage != '') {
	                $('.contact-form form .contact-email').addClass('contact-error animated shake').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            			$(this).removeClass('animated shake');
            		});
	            }
	            if(json.subjectMessage != '') {
	                $('.contact-form form .contact-subject').addClass('contact-error animated shake').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            			$(this).removeClass('animated shake');
            		});
	            }
	            if(json.messageMessage != '') {
	                $('.contact-form form textarea').addClass('contact-error animated shake').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            			$(this).removeClass('animated shake');
            		});
	            }
	            if(json.emailMessage == '' && json.subjectMessage == '' && json.messageMessage == '') {
	                $('.contact-form form').fadeOut('fast', function() {
	                    $('.contact-form').append('<p>Thanks for contacting us! We will get back to you very soon.</p>');
	                    $('.contact-container').backstretch("resize");
	                });
	            }
	        }
	    });
	});

});



jQuery(window).load(function() {

	/*
		Loader
	*/
	$(".loader-img").fadeOut();
	$(".loader").delay(1000).fadeOut("slow");

	/*
		Hidden images
	*/
	$(".testimonial-image img, #slider-1 img, .portfolio-box img").attr("style", "width: auto !important; height: auto !important;");

	/*
	    Portfolio
	*/
	$('.portfolio-masonry').masonry({
		columnWidth: '.portfolio-box',
		itemSelector: '.portfolio-box',
		transitionDuration: '0.5s'
	});

	$('.portfolio-filters a').on('click', function(e){
		e.preventDefault();
		if(!$(this).hasClass('active')) {
	    	$('.portfolio-filters a').removeClass('active');
	    	var clicked_filter = $(this).attr('class').replace('filter-', '');
	    	$(this).addClass('active');
	    	if(clicked_filter != 'all') {
	    		$('.portfolio-box:not(.' + clicked_filter + ')').css('display', 'none');
	    		$('.portfolio-box:not(.' + clicked_filter + ')').removeClass('portfolio-box');
	    		$('.' + clicked_filter).addClass('portfolio-box');
	    		$('.' + clicked_filter).css('display', 'block');
	    		$('.portfolio-masonry').masonry();
	    	}
	    	else {
	    		$('.portfolio-masonry > div').addClass('portfolio-box');
	    		$('.portfolio-masonry > div').css('display', 'block');
	    		$('.portfolio-masonry').masonry();
	    	}
		}
	});

	$(window).on('resize', function(){ $('.portfolio-masonry').masonry(); });

    /*
	    Image popup
	*/
	$('.portfolio-box-text p').magnificPopup({
		type: 'image',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1] // Will preload 0 - before current, and 1 after the current image
		},
		image: {
			tError: 'The image could not be loaded.',
			titleSrc: function(item) {
				return item.el.text();
			}
		},
		callbacks: {
			elementParse: function(item) {
				item.src = item.el.parents('.portfolio-box-text-container').siblings('img').attr('src');
			}
		}
	});

	$('.portfolio-box img').magnificPopup({
		type: 'image',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1] // Will preload 0 - before current, and 1 after the current image
		},
		image: {
			tError: 'The image could not be loaded.',
			titleSrc: function(item) {
				return item.el.siblings('.portfolio-box-text-container').find('.portfolio-box-text').find('.portfolio-box-text-inner').find('p').text();
			}
		},
		callbacks: {
			elementParse: function(item) {
				item.src = item.el.attr('src');
			}
		}
	});

});
