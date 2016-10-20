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
	var template = [];
	var target = document.querySelector('[data-inject-wallpapers]');
	var i = 0;

	loadJSON(function(response) {
		var actual_JSON = JSON.parse(response);
		actual_JSON.forEach(function(e){
			list.push({
				name: e.name,
				url: e.url
			})
		})

		list.forEach(function(t) {
			i++;
			var tpl = `
				<div id="wp${i}" class="wallpaper">
					<figure>
						<img src="${t.url}" alt="${t.name}"/>
						<figcaption>${t.name}</figcaption>
					</figure>
					<a href="${t.url}" download alt="Download ${t.name}.jpg" title="Download ${t.name}.jpg">Download</a>
				</div>
			`
			template.push(tpl)
		});
		target.innerHTML = String(template).replace(/[,]/g,"");
	});
}

window.onload = function() {
	init()
}