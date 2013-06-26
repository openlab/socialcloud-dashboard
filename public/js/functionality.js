$('#addNewWordButton').click(function(e) {
	var word = $('#addWordText').val();

	if (word.length > 0) {
		$.post("/api/blacklist", {
			word: word
		}).done(function(e) {
			loadBlacklist();
			$('#popup_box').fadeOut("slow");
			$(".over").removeClass("overlay");
		});
	}
});

$('#blacklist').on({
	click: function(e) {
		e.preventDefault();
		var word = $(this).data('id');
		console.log('deleting', word);
		$.ajax({
			url: '/api/blacklist',
			data: {
				word: word
			},
			type: 'DELETE',
			success: function(result) {
				loadBlacklist();
			}
		});
	}
}, '.bl-delete');

$('#tweet-table').on({
	click: function(e) {
		e.preventDefault();
		var id = $(this).data('id');
		console.log('about to promote');
		$.ajax({
			url: '/api/tweets',
			data: {
				id: id
			},
			type: 'PUT',
			success: function(result) {
				alert("Tweet has been promoted");
			}
		});
	}
}, '.active');

$('#tweet-table').on({
	click: function(e) {
		e.preventDefault();
		var id = $(this).data('id');
		console.log('banning ' + id);
		$.ajax({
			url: '/api/tweets',
			data: {
				id: id
			},
			type: 'DELETE',
			success: function(result) {
				alert("Tweet has been removed");
				loadTweets();
			}
		});
	}
}, '.remove');


$('#rule-table').on({
	click: function(e) {
		e.preventDefault();
		var id = $(this).data('id');
		console.log('about to delete %s', id);

		$.ajax({
			url: '/api/rules',
			data: {
				id: id
			},
			type: 'DELETE',
			success: function(result) {
				alert("Rule has been removed");
				loadRules();
			}
		});
	}
}, '.deleteRule')
$('#img-table').on({
	click: function(e) {
		e.preventDefault();
		var id = $(this).data('id');
		console.log('banning ' + id);
		$.ajax({
			url: '/api/images',
			data: {
				id: id
			},
			type: 'DELETE',
			success: function(result) {
				alert("Image has been removed");
				loadImages();
			}
		});
	}
}, '.remove');

$('#img-table').on({
	click: function(e) {
		e.preventDefault();
		var id = $(this).data('id');
		console.log('about to promote');
		$.ajax({
			url: '/api/images',
			data: {
				id: id
			},
			type: 'PUT',
			success: function(result) {
				alert("Image has been promoted");
			}
		});
	}
}, '.active');

$('#setting-body').on({
	click: function(e) {
		e.preventDefault();
		//Grab the related setting value
		var sv = $(this).parents('tr').find('.setting-value')[0];
		if (sv) {
			var input = $('<input  />', { //int only??? type="number" step="1"
				'type': 'text',
				'name': 'aname',
				'value': sv.innerText
			});
			$(sv).parent().append(input);
			$(sv).remove();
			input.focus();

		}
		else
		{
			
			var inp = $(this).parents('tr').find('input')[0];
			var key = $(this).parents('tr').find('.setting-key')[0].innerText;
			var val = $(inp)[0].value;

			console.log('about to call the server with key: ' + key, val);
			$.post("/api/settings", {
				key: key,
				value: val
			}).done(function(e) {
				var em = $('<em class="tdTex setting-value">' + val + "</em>");
				$(inp).parent().append(em);
				$(inp).remove();
			});

			

		}
	}
},
	'.showPopup3');

$('#alert-table').on({
	click: function(e) {
		e.preventDefault();
		var id = $(this).data('id');
		console.log('removing alert ' + id);
		$.ajax({
			url: '/api/alerts',
			data: {
				id: id
			},
			type: 'DELETE',
			success: function(result) {
				alert("Alert has been removed");
				loadAlerts();
			}
		});
	}
}, '.delete');

function loadTweets(page) {
	page = page || 1;
	console.log('loading page', page);
	$('#tweet-table').html('');
	$.getJSON('/api/tweets?page='+ page, function(json) {
		$.each(json, function(index, obj) {

			var html = '<tr><td width="20%"><em class="tdTex">' + moment(obj.dateTime).format('MMMM Do, h:mm:ss a') + '</em></td><td width="53%"><em class="tdTex">' + obj.content + '</em></td><td width="13%"><em class="tdTex">' + obj.authorName + '</em></td><td width="12%"><em class="tdTex"><div class="btn-group"><a class="dropdown-toggle" data-toggle="dropdown" href="#"><img src="/img/settingIcona.jpg" alt="" /></a><ul class="dropdown-menu posRe"><li><a href="#" class="active" data-id="' + obj.id + '">promote <img class="tick" src="/img/tick.png" alt="" /></a></li><li><a href="#" class="remove" data-id="' + obj.id + '">remove<img class="remov" src="/img/recycle.png" alt="" /></a></li></ul></div></em></td></tr>';
			if(obj.banned != true ) {
				$('#tweet-table').append(html);
			}	
		});

        $('#pno').text(page);
	});
}

function loadImages(page) {
	page = page || 1;
	$('#img-table').html('');
	$.getJSON('/api/images?page='+ page, function(json) {
        $.each(json, function(index, obj) {
            var html = '<tr><td width="20%"><em class="tdTex">' + moment(obj.dateTime).format('MMMM Do, h:mm:ss a') + '</em></td><td width="53%"><em class="tdTex tdTextre"><a class="pic" href="' + obj.content + '"><img src="' + obj.content + '" alt=""/></a></em></td><td width="13%"><em class="tdTex">' + obj.authorName + '</em></td><td width="12%"><em class="tdTex"><div class="btn-group"><a class="dropdown-toggle" data-toggle="dropdown" href="#"><img src="/img/settingIcona.jpg" alt="" /></a><ul class="dropdown-menu posRe"><li><a href="#" class="active" data-id="' + obj.id + '">promote <img class="tick" src="/img/tick.png" alt="" /></a></li><li><a href="#" class="remove" data-id="' + obj.id + '">remove<img class="remov" src="/img/recycle.png" alt="" /></a></li></ul></div></em></td></tr>';
            if(obj.banned != true ) {
	            $('#img-table').append(html);
	        }
        });
        console.log('calling fancy');
         $(".pic").colorbox();
    });
        $('#pno').text(page);
}

function loadAlerts() {
	$('#alert-table').html("");
	$.getJSON('/api/alerts', function(json){
		$.each(json, function(index, bl) {
			bl.formattedDate = moment(bl.dt).format('MMMM Do, h:mm:ss a')
			var html = Mustache.to_html($('#alertTmpl').html(), bl);
			$('#alert-table').append(html);

		});
		
	});
	
}

function loadRules() {
	$('#rule-table').html("");

	$.getJSON('/api/rules', function(json){
		$.each(json, function(index, bl) {
			console.log('rule', bl);
			var html = Mustache.to_html($('#ruleTmpl').html(), bl);
			$('#rule-table').append(html);

		});
	});
	
}

function loadBlacklist() {
	$('#blacklist').html("");
	$.getJSON('/api/blacklist', function(json) {
		$.each(json, function(index, bl) {
			var html = '<tr><td width="80%"><em class="tdTex">' + bl + '</em></td><td width="20%"><em class="tdTex"><a href="#" class="showPopup3"><img class="bl-delete" data-id="' +
				bl + '" src="/img/deleteIcon.jpg" alt=""/></a></em></td></tr>'
			$('#blacklist').append(html);
		});
	})
}