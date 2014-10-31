(function() {
  console.log('working');
})();

var width = 800,
		height = 400;

var chart = d3.select(".chart")
    .attr("width", width)
    .attr("height", height);


d3.csv("data/Hawaii_EV_Charging_Stations_02072013.csv", type, function(error, data) {
  var chargingData = d3.nest()
    .key(function(d) { return d.Manufacturers; })
    .rollup(function(d){
      return d3.sum(d, function() { return 1; });
    }).entries(data);
  console.log(chargingData);

  // Preparing margins
  var margin = {top: 20, right: 30, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  var chart = d3.select(".chart")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Rotating into columns
  var maxNum = d3.max(chargingData, function(d) { return d.values; });

  var y = d3.scale.linear()
      .domain([0, maxNum])
      .range([height, 0]);

  console.log(d3.keys(chargingData));

  var x = d3.scale.ordinal()
    .domain(d3.range(chargingData.length))
    .rangeBands([100, 500], 0.5);

  // Adding Axes
  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

  // chart.append9("g")
  //   .attr("class", "x axis")
  //   .attr("transform", "translate(0," + height + ")")
  //   .call(xAxis);


  // Rotating into columns
  chart.attr("height", height * data.length);

  var barWidth = width / chargingData.length;

  var bars = chart.selectAll("g")
      .data(chargingData)
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)"; });


  bars.append("rect")
      .attr("y", function(d){ return y(d.values); })
      .attr("height", function(d) { return height - y(d.values); })
      .attr("width", barWidth - 1);

  bars.append("text")
      .attr("x", barWidth / 2)
      .attr("y", function(d) { return y(d.values) + 3; })
      .attr("dy", ".75em")
      .text(function(d) { return d.values; });

  bars.append("text")
      .text(function(d, i) { return d.Manufacturers; }); // show Manufacturer names?

  // bars.attr({
  //   x: function(d, i) { return i * 15 },
  //   y: 100, 
  //   width: 10,
  //   height: function(d, i){ return y(d.values)}
  // });

  // var axis = d3.svg.axis()
  //   .scale(scale)
  //   .orient("bottom") // left, right, top
  //   .ticks(4); // best guess
  //   // .tickValues([20, 25, 30]) // specify
    



});



function type(d) {
  d.values = +d.values; // coerce to number
	return d;
}


