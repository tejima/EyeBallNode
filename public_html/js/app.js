var showMessage = function(input) {
	var theme = themes[input.theme];

	// MP3再生
	if (null === input.mp3) {
		$('#audioPlayer').attr('src', '');
	} else {
		$('#audioPlayer').attr('src', 'mp3/' + theme.mp3);
	}

	// 背景設定
	$('#bgPhoto').css('background-image', 'url(img/' + theme.bg + ')');

	// メッセージ装飾
	$('#message').css('top', theme.messageY);
	$('#message').css('color', theme.messageColor);

	// メッセージ表示
	$('#message').html(input.message);
};

var themes = {
	waiting : {
		mp3 : null,
		bg : 'putin_waiting.jpg',
		messageY : '70%',
		messageColor : '#000000'
	},
	committed : {
		mp3 : 'machinegun.mp3',
		bg : 'putin_see.jpg',
		messageY : '80%',
		messageColor : '#ffffff'
	},
	failed : {
		mp3 : 'failed.mp3',
		bg : 'putin_failed2.jpg',
		messageY : '5%',
		messageColor : '#ffffff'
	},
	succeed : {
		mp3 : 'succeed.mp3',
		bg : 'putin_succeed.jpg',
		messageY : '70%',
		messageColor : '#000000'
	}

};

var defaultInput = {
	theme : 'waiting',
	message : 'ほげほげさんがコミットしました。<br />テストは<span style="color:red">失敗</span>しました。'
};

var serverUrl = 'http://eyeball.herokuapp.com/index.php';

var checkServer = function() {
	$.getJSON(serverUrl, null, function(data, status) {
		if ('none' === data.status) {
			showMessage(defaultInput);
			return;
		}
		showMessage(data);
	});
};

// 10秒ポーリング、更新があればshowMessage
setInterval("checkServer()", 10000);



