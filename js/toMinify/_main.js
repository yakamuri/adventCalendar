$(document).ready(function() {
	if (typeof is_LOADED == "undefined") is_LOADED = false;
	if (typeof is_PROCESSED == "undefined") is_PROCESSED = false;
	is_IE8 = "false";
	if ($("html").hasClass("ie8")) is_IE8="true";

	is_IE9 = "false";
	if ($("html").hasClass("ie9")) {
		is_IE9="true";
	}

	if ((is_IE8=="true") || (is_IE9=="true")) {
		is_LOADED = true;
		imagesLoaded( "body", executeOnLoad );
	}
});

function executeOnLoad() {
//place here your custom inits

}

$(window).load(function() {
	is_LOADED = true;
	var delay=50;

	if ((is_IE8=="false")&&(is_IE9=="false")) setTimeout(executeOnLoad,delay);
});


//POLYFILL: naturalWidth & naturalHeight
(function($) {
	function img(url) {
		var i = new Image;
		i.src = url;
		return i;
	}

	if ('naturalWidth' in (new Image)) {
		$.fn.naturalWidth  = function() { return this[0].naturalWidth; };
		$.fn.naturalHeight = function() { return this[0].naturalHeight; };
		return;
	}

	$.fn.naturalWidth  = function() { return img(this[0].src).width; };
	$.fn.naturalHeight = function() { return img(this[0].src).height; };
})(jQuery);


//POLYFILL: requestAnimationFrame
window.getAnimationFrame = (function() {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
	function(callback, element) {
		window.setTimeout(callback, 1000 / 60);
	};
})();