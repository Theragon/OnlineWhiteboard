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

	var tool_x0 = 0;
	var tool_y0 = 0;



	$("#MyCanvas").mousedown(function (e) {
	    var x = e.pageX - this.offsetLeft;
	    var y = (e.pageY - this.offsetTop) - 10;
	    console.log("Inn í mousedown");
		console.log(tool);
		tool_x0 = x;
		tool_y0 = y;
		started = true;

		console.log("tool x" + tool_x0);
		console.log("tool y" + tool_y0);
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

		
	//	tool_x0 = x;
	//	tool_y0 = y;
	


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

		    var x1 = Math.min(x , tool_x0),
                y1 = Math.min(y , tool_y0),
                w = Math.abs(x - tool_x0),
                h = Math.abs(y - tool_y0);

		    context.clearRect(0, 0, canvas.width, canvas.height);

		    var rect = new Rectangle(x,y);
			if (started) {				
				rect.draw(x1, y1, w, h);
			} else {
			    //rect.draw(x, y, w, h);
			}
		}


	});

	function Shape(x, y, color, type, lineWidth) {
		this.x = x;
		this.y = y;
		this.color = color;
		this.type = type;
		this.lineWidth = lineWidth;
		// console.log("Inn í shape");


	}

	function Rectangle() {
		Shape.call(this);
	}

	Rectangle.prototype = new Shape();
	Rectangle.prototype.constructor = Rectangle();

	Rectangle.prototype.draw = function (x, y, w, h) {
	    console.log("inn í draw rect");
	    console.log("x :" + x);
	    console.log("y :" + y);
	    console.log("w :" + w);
	    console.log("h :" + h);
        

	        context.strokeRect(x, y, w, h);
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