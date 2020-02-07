window.onload = function() {
	const log = console.log;
	var canvas = document.getElementById("sky");
	var ctx = canvas.getContext("2d");

	var w = window.innerWidth;
	var h = w/3.3;
	var scale_w = w/992;
	var scale_h = h/300;

	canvas.width = w;
	canvas.height = h;

	var mf = 250; // max flakes
	var flakes = [];

	for (var i=0; i < mf; i++) {
		flakes.push({
			x: Math.random()*w,
			y: Math.random()*h,
			r: Math.random()*5*scale_h , //størrelse på fnug
			d: Math.random() + 1 // hvor hutigt det falder
		})
	}



	// animate flakes
	var angle = 0;
	function moveFlakes() {

		angle += 0.01;
		for (var i = 0; i < mf; i++) {
			// store current flake
			var f = flakes[i];

			// update x + y coordinates of each snowflake
			f.y += Math.pow(f.d, 0.1) + 1;
			f.x += Math.sin(angle) * Math.random(25);

			// send ny sne til toppen når det når bunden
			if (f.y > h) {
				flakes[i] = {x: Math.random()*w, y: 0, r: f.r, d: f.d};				
			}
		}
	}

	// draw flakes onto canvas
	function drawFlakes() {

		ctx.clearRect(0,0,w,h);
		ctx.fillStyle = "green";
		var font = 60*scale_w;
		ctx.font = font +'px serif';
		 ctx.fillText('Husk at der er vinterferie i uge 7 ', 70*scale_w, 140*scale_h);
		 ctx.fillText('og derfor ingen m'+String.fromCharCode(248)+'der', 170*scale_w,200*scale_h);
		ctx.fillStyle = "white";
		ctx.beginPath();
		for (var i = 0; i < mf; i++) {
			var f = flakes[i];
			ctx.moveTo(f.x, f.y);
			ctx.arc(f.x, f.y, f.r, 0, Math.PI*2, true);
		}
		ctx.fill();
		moveFlakes();
	}
	
	setInterval(drawFlakes, 15/scale_h);

} // main







