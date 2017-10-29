$(document).ready(function () {
	// $("body").on("click", function () {
	// 	$(".upload>div").removeClass("zoom");
	// })
	// $("body").on("click", ".upload>div", function () {
	// 	var o = this;
	// 	setTimeout(function () {
	// 		$(o).addClass("zoom");
	// 	}, 10);
	// });

	$("#fileUpload").change(function(){
		loading(true);
		setTimeout(function() {
			$(".notShow").removeClass("notShow");
			loading(false);
		}, 600);
	});
});