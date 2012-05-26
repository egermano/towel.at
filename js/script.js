/* Author: Bruno Germano
   Project: towel.at
*/

var Towel = {
	init: function(){
		if(!$('#about')[0]){
			if('/' != location.pathname && !('about/' == location.pathname )) {
				if(!Towel.testUrl(location.pathname))
					window.open('http://towel.at/404', '_self');
				this.towel(location.pathname.substr(1));
			}
			this.form();
		}

		CL.setup(function () {
			alert("PANIC! you don't have webGL");
		}, function () {});

		// pre load da textura
		var img = $('<img/>').attr('src', '/img/cloth.jpg').load();
	},
	form: function(){
		$('#urlForm').click('submit', function(e){
			var url = $('#appendedInputButton').val();

			if(!Towel.testUrl(url))
				return false;

			history.pushState({teste:true}, 'towel.at', '/'+url);
			Towel.towel(url);

			_gaq.push(['_trackEvent', 'Towel', 'GO', url]);

			return false;
		})
	},
	towel : function(url){
		var iframe = $('<iframe id="site" border="0" noborder="noborder" frameborder="0" padding="0" spacing="0"/>')
		.css({
			'width': '100%'
		})
		.attr('src', url)
		.height($(window).height()-40);

		$(window).resize(function(){
			$('#site').height($(window).height()-40);
		});

		$('head title').append(' '+url);

		$('#main').fadeOut(function(){
			$('#main *').remove();
			$(this).append(iframe);
			$(this).fadeIn(function(){
				$('#site').height($(window).height()-40);
			});
		});

		// monta a toalha
		CL.start();
	},
	testUrl : function(url){
		var reTest = new RegExp(/((?:http|https):\/\/[a-z0-9\/\?=_#&%~-]+(\.[a-z0-9\/\?=_#&%~-]+)+)|(www(\.[a-z0-9\/\?=_#&%~-]+){2,})/);
		return reTest.test(url);
	}
}


$('document').ready(function(){
	Towel.init();
});



