'use strict';

(function($){
	$(document).ready(function() {
		// Code

		$('.menu__burger').click(function() {
			$('.menu__items').toggleClass('active');
		});
	});
})(jQuery);
