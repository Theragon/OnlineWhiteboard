$(function () {
	var started = false;
	// var tool = $("#dtool").find(":selected").text();
	var shapes = new Array();
	var tool = "pencil";
	// tool.toString;
	//alert("HEy :" + tool);
	//    $("#dtool").change(function () {
	//        var tool = $(this).find('option:selected').val();
	//    });
	$("#PenButton").click(function () {
		tool = "pencil";
	});
	$("#RectButton").click(function () {
		tool = "rect";
	});


	if (!tool) {
		alert('Error: failed to get the dtool element!');
		return;
	}
	var canvas = document.getElementById("MyCanvas");
	var context = canvas.getContext("2d");

	$("#ClearButton").click(function () {
		context.clearRect(0, 0, 960, 600);
	});

	$("#RectangleButton").click(function () {
		context.strokeRect(x, y, width, height);
	});

	$("#MyCanvas").mouseover(function () {
		$(this).css('cursor', 'crosshair');
	});

	$("#MyCanvas").mousedown(function () {
		console.log("Inn í mousedown");
		console.log(tool);
		started = true;
	})


	$("#MyCanvas").mouseup(function () {
		started = false;
	});

	$("#MyCanvas").mouseleave(function () {
		started = false;
	});

	function Shape(x, y) {
		this.x = x;
		this.y = y;
		// console.log("Inn í shape");


	}



	$("#MyCanvas").mousemove(function (e) {
		var x = e.pageX - this.offsetLeft;
		var y = (e.pageY - this.offsetTop) - 10;

		// Get the mouse position relative to the canvas element.
		if (e.layerX || e.layerX == 0) { // Firefox
			x = e.layerX;
			y = e.layerY;
		} else if (e.offsetX || e.offsetX == 0) { // Opera
			x = e.offsetX;
			y = e.offsetY;
		}

		// The event handler works like a drawing pencil which tracks the mouse 
		// movements. We start drawing a path made up of lines.

		if (tool === "pencil") {
			//  console.log("Inn í if pencil");
			var pen = new Pencil();
			pen.draw(started, x, y);

		}

		if (tool === "rect") {
			if (!started) {
				var rect = new Rectangle();
				rect.draw(started, x, y);
			} else {

			}
		}


	});

	function Shape(x, y) {
		this.x = x;
		this.y = y;
		// console.log("Inn í shape");


	}

	function Rectangle() {
		Shape.call(this);
	}

	Rectangle.prototype = new Shape();
	Rectangle.prototype.constructor = Rectangle();

	Rectangle.prototype.draw = function (started, x, y) {

		while (!started) {
			context.fillStyle = "rgb(200,0,0)";
			context.fillRect(x, y, 55, 50);
		}


	}

	function Pencil() {
		Shape.call(this);
	}

	Pencil.prototype = new Shape();
	Pencil.prototype.constructor = Pencil();

	Pencil.prototype.draw = function (started, x, y) {
		if (!started) {
			context.beginPath();
			context.moveTo(x, y);

		} else {
			context.lineTo(x, y);
			context.stroke();
		}
	};
	//http://ejohn.org/apps/learn/#64
	//http://stackoverflow.com/questions/572897/how-does-javascript-prototype-work
});