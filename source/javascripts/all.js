 // This is where it all goes :)

function loadJSON(callback) {
	var xobj = new XMLHttpRequest();
	xobj.overrideMimeType("application/json");
	xobj.open('GET', 'data/wallpapers.json', true);
	xobj.onreadystatechange = function () {
		if (xobj.readyState == 4 && xobj.status == "200") {
			callback(xobj.responseText);
		}
	};
	xobj.send(null);
}

function init() {
	var list  = [];
	var desktopTemplate = [];
	var mobileTemplate = [];
	var target = document.querySelector('[data-inject-wallpapers]');
	var wpDesktop = document.createElement('div');
	var wpMobile = document.createElement('div');

	wpDesktop.classList.add('desktop-wallpapers');
	wpMobile.classList.add('mobile-wallpapers');
	wpDesktop.setAttribute('colorify-gradient-color','')

	var i = 0;

	loadJSON(function(response) {
		var actual_JSON = JSON.parse(response);
		actual_JSON.forEach(function(e){
			list.push({
				name: e.name,
				url: e.url,
				type: e.type
			})
		})

		list.forEach(function(t) {
			i++;
			var dImage = document.createElement('img');
			dImage.src = t.url;

			var imgCont = document.createElement('div').innerHTML = dImage;

			function nodeToString ( node ) {
			   var tmpNode = document.createElement( "div" );
			   tmpNode.appendChild( node.cloneNode( true ) );
			   var str = tmpNode.innerHTML;
			   tmpNode = node = null; // prevent memory leaks in IE
			   return str;
			}

			var tpl = `
				<div id="wp${i}" class="wallpaper">
					<div>
						<figure class="wallpaper__image">
							${nodeToString(imgCont)}
							<figcaption>${t.name}</figcaption>
							<a href="${t.url}" class="button fab" download alt="Download ${t.name}.jpg" title="Download ${t.name}.jpg"></a>
						</figure>
						<div class="wallpaper__title">
							<h3>${t.name}</h3>
							<p>${t.type}</p>
						</div>
					</div>
				</div>
			`;


			if ( t.type === 'desktop' ) {
				desktopTemplate.push(tpl)
			} else {
				mobileTemplate.push(tpl)
			}

		});
		wpDesktop.innerHTML = String(desktopTemplate).replace(/[,]/g,"");
		wpMobile.innerHTML = String(mobileTemplate).replace(/[,]/g,"");
		wpDesktop.classList.add('display');
		target.appendChild(wpDesktop);
		target.appendChild(wpMobile);

	});
}



function togglePanels() {
	var hidden = document.querySelector('.desktop-wallpapers');
	var trigger = document.querySelectorAll('.controls a');

	for (var i = 0; i < trigger.length; i++) {
		displayPanel(trigger[i]);
	}

	function displayPanel(element) {
		element.addEventListener('click', function(){
			var classEnd = this.hash.split(':')[1];

			for (var i = 0; i < trigger.length; i++) {
				trigger[i].classList.remove('active');
			}

			this.classList.add('active');
			switch (classEnd) {
			  case 'desktop':
			    document.querySelector('.'+classEnd + '-wallpapers').classList.add('display');
			    document.querySelector('.mobile-wallpapers').classList.remove('display');
			    break;

			  case 'mobile':
			    document.querySelector('.'+classEnd + '-wallpapers').classList.add('display');
			    document.querySelector('.desktop-wallpapers').classList.remove('display');
			    break;
			}

		})
	}
}

