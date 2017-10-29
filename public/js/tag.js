$(document).ready(function () {
	$(window).resize(function () {
		console.log("fdsa");
		$(".tag .tag-img img").height($("body").height() - 100);
	});
	$(window).resize();
	$(".tag").slick({
		infinite: false,
		slidesToShow: 1
	});

	$("body").on("click", function () {
		$(".tag-names").hide();
	});

	$("body").on("click", ".tag .tag-img .rec", function (e) {
		e.stopPropagation();
		$(".tag-names").show();
		$(".tag-names").css({
			"left": $(this).offset().left + $(this).width(),
			"top": $(this).offset().top
		});
	});

	$("body").on("click", ".tag .tag-img .tag-names, .tag .tag-img .tag-names *", function (e) {
		e.stopPropagation();
	});



	var getImgSize = function (imgSrc, callBack) {
		var newImg = new Image();

		newImg.onload = function () {
			var height = newImg.height;
			var width = newImg.width;
			callBack(width, height);
		}

		newImg.src = imgSrc; // this must be done AFTER setting onload
	}

	var recogniteImage = function (event, slick, currentSlide, nextSlide) {
		console.log(nextSlide);
		if (!$(`.tag .tag-img:eq(${nextSlide})`).hasClass("reced")) {

			loading(true);
			var img = $(`.tag .tag-img:eq(${nextSlide}) img`);
			var imgSrc = img.attr("src");
			var width = img.width();
			var height = img.height();
			var formData = new FormData();
			formData.append("src", img.attr("src"));
			getImgSize(imgSrc, function (realw, realh) {
				$.ajax({
					url: "/rec",
					type: "POST",
					dataType: "JSON",
					data: formData,
					contentType: false,
					processData: false
				}).done(function (data) {
					console.log(data);
					data.map(function (face) {
						var rec = $("<div class='rec'></div>");
						rec.css("width", face.faceRectangle.width * width / realw);
						rec.css("height", face.faceRectangle.height * height / realh);
						rec.css("left", face.faceRectangle.left * width / realw);
						rec.css("top", face.faceRectangle.top * height / realh);
						img.parent(".tag-img").append(rec);
						img.parent(".tag-img").addClass("reced");
					});

					// paintComment(data.admin_email, data.content, data.time, data.file);
				}).fail(function (err) {
					console.log(err);
				}).always(function () {
					loading(false);
				})
			});
		}
	}

	$(".tag").on('beforeChange', recogniteImage);

	recogniteImage(null, null, null, 0);
	$(".tag-names").hide();
	// https://eastasia.api.cognitive.microsoft.com/face/v1.0/detect
});