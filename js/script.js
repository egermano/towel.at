/* Author: Bruno Germano
   Project: towel.at
*/

var Towel = {
	init: function(){
		if(!$('#about')[0]){
			// pre load da textura
			var img = $('<img/>').attr('src', '/img/cloth.jpg').load();

			if('/' != location.pathname && !('about/' == location.pathname )) {
				if(!Towel.testUrl(location.pathname))
					window.open('http://towel.at/404', '_self');

				CL.setup(function () {
					alert("PANIC! you don't have webGL");
				}, function () {
					Towel.towel(location.pathname.substr(1));
					CL.start();
				});
			}
			else {
				CL.setup(function () {
					alert("PANIC! you don't have webGL");
				}, this.bind_form);
			}

		}
	},
	add_http: function (url) {
		return (url.slice(0, 4) === 'http' ? '' : 'http://') + url;
	},
	bind_form: function () {
		// On ENTER
		$('#appendedInputButton').keypress(function (e) {
			if (e.which === 13) {
				Towel.open_iframe();
			}
		});

		// On button click
		$('#urlForm').click('submit', Towel.open_iframe);
	},
	open_iframe: function(){
		var url = $('#appendedInputButton').val();

		if(!Towel.testUrl(url))
			return false;

		history.pushState({teste:true}, 'towel.at', '/'+url);
		Towel.towel(url);

		// monta a toalha
		CL.start();

		_gaq.push(['_trackEvent', 'Towel', 'GO', url]);

		return false;
	},
	towel : function(url) {

		var iframe = $('<iframe id="site" border="0" noborder="noborder" frameborder="0" padding="0" spacing="0"/>')
		.css({
			'width': '100%'
		})
		.attr('src', Towel.add_http(url))
		.height($(window).height()-40);

		$(window).resize(function(){
			$('#site').height($(window).height()-40);
		});

		$('head title').append(' ' + url);

		$('#main').fadeOut(function(){
			$('#main *').remove();
			$(this).append(iframe);
			$(this).fadeIn(function(){
				$('#site').height($(window).height()-40);
			});
		});


	},
	testUrl : function(url){
		var reTest = new RegExp(/((?:http|https):\/\/[a-z0-9\/\?=_#&%~-]+(\.[a-z0-9\/\?=_#&%~-]+)+)|(www(\.[a-z0-9\/\?=_#&%~-]+){2,})/);
		return reTest.test(url);
	}
}


$('document').ready(function(){
	Towel.init();
});



