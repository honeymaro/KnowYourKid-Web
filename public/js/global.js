$(document).ready(function () {

	location.queryString = {};
	location.search.substr(1).split("&").forEach(function (pair) {
		if (pair === "") return;
		var parts = pair.split("=");
		location.queryString[parts[0]] = parts[1] &&
			decodeURIComponent(parts[1].replace(/\+/g, " "));
	});

	$("a[href='" + location.pathname + "']").addClass("selected");

	$('body').on('click', '.popup', function (e) {
		if ($(e.target).hasClass('popup')) {
			$(this).remove();
		}
	});

	$('body').on('click', '.popup-next', function () {
		$(".step-now").addClass("step-left").removeClass("step-now");
		$($(".step-right").first()).addClass("step-now").removeClass("step-right");
	});
	$('body').on('click', '.popup-prev', function () {
		$(".step-now").addClass("step-right").removeClass("step-now");
		$($(".step-left").last()).addClass("step-now").removeClass("step-left");
	});


	var is_popup_clicked = false;
	var timer_popup;
	var popup = function (filename, callback) {

		if (is_popup_clicked) return;
		var p = $('<div class="popup" id="popup_' + filename + '"></div>');

		p.load('/div/' + filename, function () {
			$('body').prepend(p);
			if (callback) callback();
		});
		is_popup_clicked = true;

		timer_popup = setTimeout(function () {
			is_popup_clicked = false;
			clearTimeout(timer_popup);
		}, 1000);
	}
});

var loading = function (isStart) {
	if (isStart == false) {
		$(".global_loading").remove();
	}
	else {
		$('body').prepend('<div class="global_loading">'
			+ '<div class="mask-loading">'
			+ '<div class="spinner">'
			+ '<div class="double-bounce1"></div>'
			+ '<div class="double-bounce2"></div>'
			+ '</div>'
			+ '</div>'
			+ '</div>'
		);
	}
}