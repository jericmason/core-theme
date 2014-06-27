/*******************************************************************************

Handle graphical user interactions in the widget

*******************************************************************************/
(function($) {

	var debug = false,
    	_log = function() {
        	debug && window.console && console.log.apply(console, arguments);
    	};

	var Widget = {

		/**
		 * Init Function
		 */
		init: function() {
			$("body").removeClass("no-js");
			Widget.usersHover();
			Widget.flexSlider();
			Widget.progressBar();
			Widget.faq();
			Widget.copyToClipboard();
		},
		
		/**
		 * usersHover
		 */
		usersHover: function() {

			var user = $('.users a').not('.hover');


			if (user.length > 0) {

				$('body').append('<div class="person-hover">');

				var hoverContainer = $('.person-hover');

				user.click(function(e) {
					e.preventDefault();
				});

				user.mouseenter(function(e){
					
					var content = $(this).next().clone();

					e.preventDefault();

					var parent = $(this).parent(),
						posX = parent.offset().left,
						posY = parent.offset().top;

					if (content.length > 0)
					{

						$(this).toggleClass('hover');

						var hoverAbove = parseInt($('#meta-data').css('zIndex'), 10);
						
						hoverContainer.empty().append(content)
						.css((hoverAbove == 1) ? {
							bottom: posY,
							left: posX
						} : {
							top: posY,
							left: posX
						}).delay(800).stop(true, true).fadeIn('fast');

					} //end if
					
				})
				
				.mouseleave(function(){
					hoverContainer.delay(800).stop(true, true).fadeOut('fast');
					$(this).toggleClass('hover');
				});

				hoverContainer.mouseenter(function(){
					$(this).stop(true, true).show();
				}).mouseleave(function(){
					$(this).stop(true, true).fadeOut('fast');
				});

			} // end if

		},

		/**
		 * Flex Slider Component
		 */
		flexSlider: function() {
			var slider = $('.overflow'),
				sliderElements = $('.slides li');
			
			if(sliderElements.length > 10) {

				if (slider.length > 0) {

					slider.flexslider({
						animation: "slide",
						animationLoop: false,
						itemWidth: 33,
						itemMargin: 0,
						minItems: 10,
						maxItems: 10,
						slideshow: false
					});

				}
			
			}
		},

		/**
		 * Progress bar
		 */
		progressBar: function() {

			var bar = $('.progress-bar'),
				oldie = $('html').hasClass('oldie');


			if (bar.length > 0) {

					var barContent = bar.find('.bar'),
						percent = barContent.data('width');

					if (percent > 0) {	

						bar.toggleClass('no-progress').toggleClass('progress');

						percent > 97 ? barContent.addClass('more-then-97') : '';

						
						bar.find('.bar').animate(
							{ 
								width: percent + '%',
								opacity: 1 

							}, 1000, function() {
								bar.find('span').html(percent + "%").fadeIn();
							});

					} // end if
				

			} // end if
		},

		faqOpen : false,

		/**
		 * Faq
		 */
		faq: function() {
			var faqContent = $('.faq-content'),
			body = $('body'),
			back = $('.back');

			// EM - FF will get a height of 0 if the container is no loaded when this is called (not sure why xhtmlized sets the css height - some browser glitch?)
			$('.container').load(function() {
				var container = $('.container'),
					height = container.height(),
					content = $('#content'),
					contentHeight = content.height();
	
					container.css('height', height);
					content.css('height', contentHeight);
			});
			
			faqContent.hide().toggleClass('hide');
			
			$('.learn, .back').click(function(e) {
				
				var switchContentActive = $('#content > section.active');

				e.preventDefault();

				body.toggleClass('faq');
				back.is(':visible') ? back.hide(): '';

				if (Widget.faqOpen) {
					$('#footer').animate({
						height: $('#footer').height()
					}, 1000, function() {
						$('.display-none').length > 0 ? back.fadeIn().css('display', 'block').toggleClass('display-none') : back.toggleClass('display-none');

					});
				} else {
					$('#footer').animate({
						height: $('#footer').height()
					}, 1000, function() {
						$('.display-none').length > 0 ? back.fadeIn().css('display', 'block').toggleClass('display-none') : back.toggleClass('display-none');

					});
				}
				
				switchContentActive.slideUp().removeClass('active').siblings().slideDown().addClass('active');
				
				Widget.faqOpen = Widget.faqOpen ? false : true;

				_log('Faq is open ? ' + Widget.faqOpen);

			});
		},

		/**
		 * Copy to clipboard
		 */
		copyToClipboard: function() {
			var clip = new ZeroClipboard( $('.copy'), {
				moviePath: window.squatch.asset.zeroclipboard,
				hoverClass: "hover"
			});

			clip.on( 'complete', function(client, args) {
				_log('clicked copy link');
				analytics.track(squatch.analytics.events.COPY_LINK);
				$('.copy').html('Copied!');
			} );
		}
	}
	
	
	$(function() {
		Widget.init();
	});
	

})(jQuery);
