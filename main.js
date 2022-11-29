// MenuBtn //
$(".dropdown-button").on("click", function() {
	var menu = $(".dropdown-menu");
	if(menu.hasClass("show")) menu.removeClass("show");
	else menu.addClass("show");
})

$(window).on("click", function(e) {
	if(!e.target.matches(".dropdown-button") && !e.target.matches(".bar")) {
		$(".dropdown-menu").removeClass("show");
	}
})


//Banner Slider//
var bannerIdx = 1;

function slideImg(n) {
	if(n < 1) n = 3;
	else if(n > 3) n = 1;

	var banner = $(".banner");
	if(n == 1) {
		banner.css("background-image", "url('assets/img/banner.jpg'");
	}else if(n == 2) {
		banner.css("background-image", "url('assets/img/banner2.jpg'");
	}else if(n == 3) {
		banner.css("background-image", "url('assets/img/banner3.jpg'");
	}

	$(".pin-white").removeClass("pin-white");

	$(".slide-pin").eq(n-1).addClass("pin-white");

	bannerIdx = n;
}

$(".arrow-right").on("click", function() {
	slideImg(bannerIdx+1);
})

$(".arrow-left").on("click", function() {
	slideImg(bannerIdx-1);
})

$(".slide-pin").on("click", function() {
	bannerIdx = $(".slide-pin").index(this) + 1;
	slideImg(bannerIdx);
})

//Scroll navbar//
$(window).on("scroll", function() {
	var pos = $(window).scrollTop();
	if(pos < 400) $("#sticky-header").removeClass("sticky");
	else $("#sticky-header").addClass("sticky");
})

// $(window).on("click", function(e) {
// 	console.log(e);
// })


//Validation
var fullName = $("#name");
var email = $("#email");
var password1 = $("#password");
var password2 = $("#password2");
var gender = $("#gender");
var payment = $("#payment");
var agreed = $("#agreement");

$("#registerbtn").on("click", function() {
	if(!checkName(fullName)) {
		alert("Your name cannot be empty!")
		return;
	}

	if(!checkEmail(email)) {
		alert("Email not Valid!");
		return;
	}

	if(!checkPassword(password1)) {
		alert("Password must be atleast 8 characters!")
		return;
	}

	if(!checkPassword2(password1, password2)) {
		alert("Password does not match!");
		return;
	}

	if(!agreed.is(":checked")) {
		alert("You must agreed to our Terms & Privacy!")
		return;
	}

	alert("Congratulations you are now registered, we will notify you as soon as the game ready!")

	$(location).attr("href", "index.html")
})

function checkName(event) {
	var str = event.val();

	if(str == "") return false;

	return true;
}

function checkEmail(event) {
	var str = event.val();

	//Check email format minimum 5 characters (a@b.c)
	if(str.length >= 5) {
		str = event.val().split("@");

		if(str.length == 2) {
			if(str[0] != "" && str[1] != "") {
				str = str[1].split(".");

				if(str.length >= 2) {
					for(var i = 0; i < str.length; i++) {
						if(str[i] == "") return false;
					}

					return true;
				}
			}
		}
	}

	return false;
}

function checkPassword(event) {
	var str = event.val();

	if(str.length >= 8) return true;

	return false;
}

function checkPassword2(a, b) {
	if(a.val() != b.val()) return false;

	return true
}



//Music Player
audio = new Audio();
audio.volume = 0.1;

var currSongIndex = -1;
var totalSong = $(".active-song").length;

function playSongbyIndex(idx, repeat) {
	// console.log("idx : " + idx);
	// console.log("repeat : " + repeat);
	// console.log("totalSong : " + totalSong);

	if(repeat == 1) {
		if(idx < 0) idx = totalSong - 1;
		else if(idx == totalSong) idx = 0;
	}else {
		if(idx < 0) {
			idx = 0;
			audio.pause();
			return;
		}
		else if(idx == totalSong) {
			idx = totalSong - 1;
			audio.pause();
			return;
		}
	}
	

	var currActive = $(".active-song").eq(idx);
	var prevActive = $(".song-active");

	$(".song-active").removeClass("song-active");
	currActive.addClass("song-active");

	var currActiveInfo = currActive.children(".song-info");

	var playerImg = $(".player-img img");
	var playerTitle = $(".player-title");
	var playerArtist = $(".player-artist");
	var playerTotalTime = $(".total-time");

	var songPath = currActive.children(".song-info").children(".song-path").html();
	// console.log(currActiveInfo.children(".song-title").html());

	playerImg.attr("src", currActive.children(".song-img").children("img").attr("src"));
	playerTitle.html(currActiveInfo.children(".song-title").html());
	playerArtist.html(currActiveInfo.children(".song-singer").html());
	playerTotalTime.html(currActiveInfo.children(".song-length").html())

	var playBtn = $(".play-btn").children("img");
	playBtn.attr("src", "assets/img/pause.png");
	playBtn.addClass("playing");

	audio.src = "assets/songs/"+songPath;
	audio.play();

	currSongIndex = idx;
}

$(".song-container").on("click", function(e) {
	var index = $(".active-song").index(this)

	// console.log(index);
	// console.log(totalSong);
	playSongbyIndex(index, 0);
})

$(".play-btn").on("click", function() {
	var playBtn = $(".play-btn img");
	var isPlaying = $(".playing");

	if(playBtn.is(isPlaying)) {
		isPlaying.attr("src", "assets/img/play2.png");
		isPlaying.removeClass("playing");
		audio.pause();
	}else {
		playBtn.attr("src", "assets/img/pause.png");
		playBtn.addClass("playing");
		audio.play();
	}
})

function prevNextSong(x) {
	var idx = currSongIndex + x;
	var repeat = 0;

	//If repeat status is one, we change the repeat status to all;
	if($(".repeatOne").length != 0) {
		var repeatBtn = $(".repeat-btn img");
		repeatBtn.removeClass("repeatOne");
		repeatBtn.addClass("repeatAll")
		repeatBtn.attr("src", "assets/img/repeatall.png");
	}

	if($(".repeatAll").length != 0) repeat = 1;

	if($(".shuffleOn").length != 0) {
		idx = randomizeIndex(0, totalSong, currSongIndex)
	}

	playSongbyIndex(idx, repeat);
}

function randomizeIndex(start, end, exception) {
	var ret = exception;
	while(ret == exception) {
		ret = Math.floor((Math.random() * end) + start)
	}

	return ret;
}


$(".next-btn").on("click", function() {
	prevNextSong(1);
})

$(".prev-btn").on("click", function() {
	var x = -1;
	var currTime = Math.floor(audio.currentTime);

	//Reset current song progress if the audio time more than or equal to 3 seconds
	if(currTime >= 3) x = 0;

	prevNextSong(x);
})


//repeat Button
$(".repeat-btn").on("click", function() {
	var repeatOff = $(".repeatOff");
	var repeatAll = $(".repeatAll");
	var repeatOne = $(".repeatOne");
	var repeatBtn = $(".repeat-btn img");

	if(repeatBtn.is(repeatOff)) {
		repeatBtn.removeClass("repeatOff");
		repeatBtn.addClass("repeatAll")
		repeatBtn.attr("src", "assets/img/repeatall.png");
	}else if(repeatBtn.is(repeatAll)) {
		repeatBtn.removeClass("repeatAll");
		repeatBtn.addClass("repeatOne")
		repeatBtn.attr("src", "assets/img/repeatone.png");
	}else if(repeatBtn.is(repeatOne)) {
		repeatBtn.removeClass("repeatOne");
		repeatBtn.addClass("repeatOff")
		repeatBtn.attr("src", "assets/img/repeat.png");
	}
})

$(".shuffle-btn").on("click", function() {
	var shuffleBtn = $(".shuffle-btn img");

	if($(".shuffleOn").length != 0) {
		shuffleBtn.removeClass("shuffleOn");
		shuffleBtn.attr("src", "assets/img/shuffle.png");
	}else {
		shuffleBtn.addClass("shuffleOn");
		shuffleBtn.attr("src", "assets/img/shuffleon.png");
	}
})


//Update time on music player
$(audio).bind("timeupdate", function() {
	if(audio.currentTime == audio.duration) {
		if($(".repeatOne").length != 0) {
			audio.play();
		}
		else {
			var repeat = 0;
			var x = currSongIndex+1;

			if($(".repeatAll").length != 0) repeat = 1;

			if($(".shuffleOn").length != 0) {
				x = randomizeIndex(0, totalSong, currSongIndex)
			}

			playSongbyIndex(x, repeat);
		}
	}

	var currMinutes = Math.floor(audio.currentTime / 60);
	var currSeconds = Math.floor(audio.currentTime - currMinutes * 60);

	if(currMinutes < 10) currMinutes = "0" + currMinutes;
	if(currSeconds < 10) currSeconds = "0" + currSeconds;

	$(".curr-time").html(currMinutes+":"+currSeconds);


	var progressBar = audio.currentTime / audio.duration * 100;
	$(".seek-bar").css("width", progressBar + "%");

})


//Seek navigation on music player
var seekTime;

function showHoverMusicNav(e) {
	var seekArea = $(".seek-area");
	var insTime = $(".ins-time");
	var seekHover = $(".seek-hover");
	var seekBar = $(".seek-bar");

	var mouseHoverPos = seekArea.offset();
	var mouseHoverLength = e.clientX - mouseHoverPos.left;
	var seekLength = mouseHoverLength / seekArea.outerWidth();
	seekTime = audio.duration * seekLength;

	seekHover.width(mouseHoverLength);

	var time = seekTime / 60;

	var timeMinutes = Math.floor(time);
	var timeSeconds = Math.floor(seekTime - timeMinutes * 60);

	if (timeMinutes < 10) timeMinutes = "0" + timeMinutes;
	if (timeSeconds < 10) timeSeconds = "0" + timeSeconds;

	if (isNaN(timeMinutes) || isNaN(timeSeconds)) {
		timeMinutes = "00";
		timeSeconds = timeMinutes;
	}

	insTime.text(timeMinutes + ":" + timeSeconds);
	insTime.css({
		"left" : mouseHoverLength,
		"margin-left" : "360px"
	}).fadeIn(0);
}

function hideHoverMusicNav() {
	$(".seek-hover").width(0);
	$(".ins-time").text("00:00");
	$(".ins-time").css({
		"left": "0px",
		"margin-left": "0px"
	}).fadeOut(0);
}

$(".seek-area").mousemove(function(e) { showHoverMusicNav(e); });
$(".seek-area").mouseout(hideHoverMusicNav);
$(".seek-area").on("click", function() {
	audio.currentTime = seekTime;
	hideHoverMusicNav();
})

function hideAllSong() {
	var songList = $(".song-container");
	for(var i = 0; i < songList.length; i++) {
		songList.eq(i).removeClass("flex");
		songList.eq(i).removeClass("active-song");
	}
}

function showSongByGenre(genre) {
	hideAllSong();

	var songList = $(".song-container");
	var songGenre = $(".song-genres");

	for(var i = 0; i < songList.length; i++) {
		// console.log(songGenre.eq(i).html());
		if(songGenre.eq(i).html().indexOf(genre) != -1) {
			songList.eq(i).addClass("flex");
			songList.eq(i).addClass("active-song");
		}
	}

	totalSong = $(".active-song").length;
}

$(".btnPop").on("click", function() {
	showSongByGenre("Pop");
})

$(".btnRock").on("click", function() {
	showSongByGenre("Rock");
})

$(".btnEdm").on("click", function() {
	showSongByGenre("Electronic");
})