/*
	Prologue by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$nav = $('#nav');

	// Breakpoints.
		breakpoints({
			wide:      [ '961px',  '1880px' ],
			normal:    [ '961px',  '1620px' ],
			narrow:    [ '961px',  '1320px' ],
			narrower:  [ '737px',  '960px'  ],
			mobile:    [ null,     '736px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Nav.
		var $nav_a = $nav.find('a');

		$nav_a
			.addClass('scrolly')
			.on('click', function(e) {

				var $this = $(this);

				// External link? Bail.
					if ($this.attr('href').charAt(0) != '#')
						return;

				// Prevent default.
					e.preventDefault();

				// Deactivate all links.
					$nav_a.removeClass('active');

				// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
					$this
						.addClass('active')
						.addClass('active-locked');

			})
			.each(function() {

				var	$this = $(this),
					id = $this.attr('href'),
					$section = $(id);

				// No section for this link? Bail.
					if ($section.length < 1)
						return;

				// Scrollex.
					$section.scrollex({
						mode: 'middle',
						top: '-10vh',
						bottom: '-10vh',
						initialize: function() {

							// Deactivate section.
								$section.addClass('inactive');

						},
						enter: function() {

							// Activate section.
								$section.removeClass('inactive');

							// No locked links? Deactivate all links and activate this section's one.
								if ($nav_a.filter('.active-locked').length == 0) {

									$nav_a.removeClass('active');
									$this.addClass('active');

								}

							// Otherwise, if this section's link is the one that's locked, unlock it.
								else if ($this.hasClass('active-locked'))
									$this.removeClass('active-locked');

						}
					});

			});

	// Scrolly.
		$('.scrolly').scrolly();

	// Header (narrower + mobile).

		// Toggle.
			$(
				'<div id="headerToggle">' +
					'<a href="#header" class="toggle"></a>' +
				'</div>'
			)
				.appendTo($body);

		// Header.
			$('#header')
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'left',
					target: $body,
					visibleClass: 'header-visible'
				});

		// Portfolio Modal Functionality
		
		// Track current slide for each project
		var currentSlides = {};

		// Open modal function
		window.openModal = function(projectId) {
			$('#' + projectId).css('display', 'block');
			$body.css('overflow', 'hidden');
			
			// Initialize slide counter if it doesn't exist
			if (!currentSlides[projectId]) {
				currentSlides[projectId] = 0;
			}
		};

		// Close modal function
		window.closeModal = function(projectId) {
			$('#' + projectId).css('display', 'none');
			$body.css('overflow', 'auto');
		};

		// Change slides function
		window.changeSlide = function(projectId, direction) {
			var $modal = $('#' + projectId);
			var $slides = $modal.find('.gallery-slide');
			
			// Remove active class from current slide
			$slides.eq(currentSlides[projectId]).removeClass('active');
			
			// Update slide index
			currentSlides[projectId] += direction;
			
			// Loop around if at the end
			if (currentSlides[projectId] >= $slides.length) {
				currentSlides[projectId] = 0;
			}
			if (currentSlides[projectId] < 0) {
				currentSlides[projectId] = $slides.length - 1;
			}
			
			// Add active class to new slide
			$slides.eq(currentSlides[projectId]).addClass('active');
		};

		// Close modal when clicking outside of it
		$window.on('click', function(event) {
			if ($(event.target).hasClass('modal')) {
				$(event.target).css('display', 'none');
				$body.css('overflow', 'auto');
			}
		});

		// Keyboard navigation
		$(document).on('keydown', function(event) {
			// Find which modal is currently open
			var $openModal = $('.modal').filter(function() {
				return $(this).css('display') === 'block';
			});
			
			if ($openModal.length > 0) {
				var modalId = $openModal.attr('id');
				
				if (event.key === 'ArrowLeft') {
					changeSlide(modalId, -1);
				} else if (event.key === 'ArrowRight') {
					changeSlide(modalId, 1);
				} else if (event.key === 'Escape') {
					closeModal(modalId);
				}
			}
		});

})(jQuery);