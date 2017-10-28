$(document).ready(function () {
	$("body").on("click", function () {
		$(".upload>div").removeClass("zoom");
	})
	$("body").on("click", ".upload>div", function () {
		var o = this;
		setTimeout(function () {
			$(o).addClass("zoom");
		}, 10);
	});
});