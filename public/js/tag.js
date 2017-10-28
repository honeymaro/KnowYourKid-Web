$(document).ready(function(){
	$(window).resize(function(){
		console.log("fdsa");
		$(".tag .tag-img img").height($("body").height() - 100);
	});
	$(window).resize();
	$(".tag").slick({
		infinite: false,
		slidesToShow: 1
	});
	
	// https://eastasia.api.cognitive.microsoft.com/face/v1.0/detect
});