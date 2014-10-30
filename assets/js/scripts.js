(function() {
  console.log('working');
})();

var width = 500,
		height = 200;

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

var y = d3.scale.linear()
    .domain([0, d3.max(chargingData, function(d) { return d.values; })])
		.range([0, height]);
	
	chart.attr("height", height * data.length);

  var barWidth = width / chargingData.length;

	var bar = chart.selectAll("g")
			.data(chargingData)
		.enter().append("g")
			.attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)"; });

  console.log(y);

	bar.append("rect")
      .attr("y", function(d){ return y(d.values); })
			.attr("height", function(d) { return height - y(d.values); })
      .attr("width", barWidth - 1);

	// bar.append("text")
	// 		.attr("y", function(d) { return y(d) - 3; })
	// 		.attr("y", height / 2)
	// 		.attr("dy", ".35em")
	// 		.text(function(d) { return d; });
});

function type(d) {
	d.value = +d.value; // coerce to number
	return d;
}


