(function ($) {
	$.choones = function (title, message) {
		var options = arguments[2] || {};

		init(title, message, options);
	}

	//
	// == Public methods
	//
	$.extend(
		$.choones,
		{
		settings: {
			type: 'success',
			display_time: 5000
		},
		display: function () {
			var options = $.extend({}, $.choones.settings, arguments[0] || {});
			$('#choones').slideDown();
			if (options.display_time > 0) {
				this.timeout = setTimeout(
					function () { $('#choones').slideUp(); },
					options.display_time
				);
			}
		}
	});

	//
	// == Private methods
	//

	var init = function (title, message, options) {
		this.display = {title: title, message: message};

		resetTimeout();
		setType();
		setMessage();
		$.choones.display(options);
	}

	var resetTimeout = function () {
		if (this.timeout) {
			clearTimeout(this.timeout);
			this.timeout = null;
		}
	}

	// Set either a success or failure state
	var setType = function () {
		$('#choones')[0].className = ($.choones.settings.type == 'success') ? 'success' : 'failure';
	}

	var setMessage = function () {
		$('#choones').children('h1').text(this.display.title);
		$('#choones').children('p').text(this.display.message || '');
	}

	//
	// == Events
	//

	// If there is a message to display already in the DOM, display it
	if ($('#choones').children('p').text() != 'Message') {
		$.choones.display();
	}

	// When the user scrolls we need to re-tack the message area to the bottom of the screen
	$(document).scroll(function () {
		var clip = ($(this).scrollTop() > 0) ? '-' + $(this).scrollTop() : 0;
		$('#choones').css({bottom: clip + 'px'});
	});
})(jQuery);
