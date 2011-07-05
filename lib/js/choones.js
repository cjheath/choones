(function($) {
	$.choones = function(title, message) {
		var options = arguments[2] || {};

		if (message === '') { message = null; }

		init(title, message, options);
	};

	//
	// Static variables
	//
	var timeout;
	var settings = {
		type: 'success',	// Default status
		display_time: 5000,	// Default duration
		show: $().slideDown,	// Override with whatever method you like, such as $().show
		hide: $().slideUp,	// Same, hide()
		showParams: ['fast'],	// Parameters to be passed to show method
		hideParams: ['slow']	// Parameters to be passed to hide method
	};

	//
	// == Public methods
	//
	$.choones.display = function() {
		var options = $.extend({}, settings, arguments[0] || {});
		var target = $('#choones');
		options.show.apply(target, options.showParams);
		resetTimeout();
		if (options.display_time > 0) {
			timeout = setTimeout(
				function() { $.choones.hide(); },
				options.display_time
			);
		}
	};

	$.choones.hide = function() {
		settings.hide.apply($('#choones'), settings.hideParams);
	};

	//
	// == Private methods
	//
	var init = function(title, message, options) {
		this.display = {title: title, message: message};

		setType(options["type"]);
		if (message !== null)
		  setMessage();
		$.choones.display(options);
	};

	var resetTimeout = function() {
		if (timeout) {
			clearTimeout(timeout);
			timeout = null;
		}
	};

	// Set either a success or failure state
	var setType = function(type) {
		$('#choones')[0].className = (type == 'success') ? 'success' : 'failure';
	};

	var setMessage = function() {
		$('#choones').children('h1').text(this.display.title);
		$('#choones').children('p').html(this.display.message || '&nbsp;');
	};

	// If there is a message to display already in the DOM, display it
	if ($('#choones').children('p').text() != 'Message') {
		$.choones.display();
	}

	//
	// == Events
	//
	// When the user scrolls we need to re-tack the message area to the bottom of the screen
	$(document).scroll(function() {
		var clip = ($(this).scrollTop() > 0) ? '-' + $(this).scrollTop() : 0;
		$('#choones').css({bottom: clip + 'px'});
	});
})(jQuery);
