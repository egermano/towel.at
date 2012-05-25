/* Author: Bruno Germano
   Project: towel.at
*/

var Towel = {
	init: function(){

		if('/' != location.pathname) {
			console.log(location.pathname.substr(1));
			this.pages.towel();
		}
		
		$('nav.nav-collapse ul li a').click(function(){
			history.pushState({teste:true}, 'towel.at', $(this).attr('href'));

			return false;
		});

		this.form();
	},
	form: function(){
		$('#urlForm').click('submit', function(e){
			var url = $('#appendedInputButton').val();

			var reTest = new RegExp(/((?:http|https):\/\/[a-z0-9\/\?=_#&%~-]+(\.[a-z0-9\/\?=_#&%~-]+)+)|(www(\.[a-z0-9\/\?=_#&%~-]+){2,})/);

			if(!reTest.test(url))
				return false;

			history.pushState({teste:true}, 'towel.at', '/'+url);
			Towel.pages.towel(url);
			return false;
		})
	},
	pages : {
		home : function(){
			var html = '<div class="content"><h1 class="logo ir">Towel.at</h1><p>Don\'t Panic! We have a towel!</p><p><small>Type a URL to put a towel.at.</small></p><div class="input-append"><input class="span2" id="appendedInputButton" style="width:497px" type="text" placeholder="URL"><button class="btn" type="button">Go!</button></div></div>';
			$('#main').append(html);
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
		}
	}
}


$('document').ready(function(){
	Towel.init();
	console.log('ready');
});



