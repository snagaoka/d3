(function() {
  console.log('hi');
})();


// PART I //

// var data = [4, 10, 15, 16, 23, 42];

// # SELECTING AN ELEMENT
// var div = document.createElement("div");
// div.innerHTML = "Hello, world!";
// document.body.appendChild(div);


// var body = d3.select("body");
// var div = body.append("div");
// div.html("Hello, world!");

// var section = d3.selectAll("section");
// var div = section.append("div");
// div.html("Hello, world!");


// # CHAINING METHODS
// var body = d3.select("body");
// body.style("color", "black");
// body.style("background-color", "white");

// d3.select("body")
// 	.style("color", "black")
// 	.style("background-color", "white");

// d3.selectAll("section")
// 	  .attr("class", "special")
// 	.append("div")
// 	  .html("Hello, World!");


// var section = d3.selectAll("section");

// section.append("div")
// 	.html("First!");

// section.append("div")
// 	.html("Second.");


// # CODING A CHART, AUTOMATICALLY
// d3.select(".chart")
// 	.selectAll("div")
// 		.data(data)
// 	.enter().append("div")
// 		.style("width", function(d) { return d * 10 + "px"; })
// 		.text(function(d) { return d; });


// var chart = d3.select(".chart");

// var bar = chart.selectAll("div");

// var barUpdate = bar.data(data);

// var barEnter = barUpdate.enter().append("div");


// # SCALING TO FIT
// var x = d3.scale.linear()
// 	.domain([0, d3.max(data)])
// 	.range([0, 420]);

// d3.select(".chart")
// 	.selectAll("div")
// 		.data(data)
// 	.enter().append("div")
// 		.style("width", function(d) { return x(d) + "px"; })
// 		.text(function(d) { return d; });


// PART II
var data = [4, 8, 15, 16, 23, 42];

var width = 420,
		barHeight = 20;

var x = d3.scale.linear()
		.domain([0, d3.max(data)])
		.range([0, width]);

var chart = d3.select(".chart")
		.attr("width", width)
		.attr("height", barHeight * data.length);

var bar = chart.selectAll("g")
		.data(data)
	.enter().append("g")
		.attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

bar.append("rect")
		.attr("width", x)
		.attr("height", barHeight - 1);

bar.append("text")
		.attr("x", function(d) { return x(d) - 3; })
		.attr("y", barHeight / 2)
		.attr("dy", ".35em")
		.text(function(d) { return d; });


