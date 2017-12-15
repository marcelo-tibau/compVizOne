<script>
// initial function to create the bar chart
var drawChart = function (data) {
    
    // set width and height and padding of SVG
    var margin = {top: 20, right: 30, bottom: 20, left: 30};
    var width = 700 - margin.right - margin.left;
    var height = 500 - margin.top - margin.bottom;
    
    // create x scale
    var x = d3.scale.ordinal()
      .domain(data.map(function(d) { return d.category; }))
      .rangeRoundBands([0, width], .1);
    // create y scale
    var y0 = d3.scale.linear()
      .domain([0,d3.max(data, function(d) { return d.value; })])
      .range([height,0]);
    var y1 = d3.scale.linear()
      .domain([0,d3.max(data, function(d) { return d.value; })])
      .range([height,0]);
    // create x axis
    var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");
    // create y axis
    var yAxis0 = d3.svg.axis()
      .scale(y0)
      .orient("left");
    var yAxis1 = d3.svg.axis()
      .scale(y1)
      .orient("right");
      
    // create chart element
    var chart = d3.select(".chart")
        .attr("width",width + margin.right + margin.left)
        .attr("height",height + margin.top + margin.bottom)
      .append("g")
        .attr("transform","translate(" + margin.left + "," + margin.top + ")");
    
    // add columns
     chart.selectAll("rect")
        .data(data)
        .enter()
      .append("rect")
        .attr("x",function(d){
          return x(d.category);
        })
        .attr("y0",function(d) {
          return y0(d.value);
        })
        .attr("width",x.rangeBand())
        .attr("height",function(d) {
          return (y0(0) - y0(d.value));
        })
        .attr("fill", "#458b74")
      .append("rect")
        .attr("x",function(d){
          return x(d.category);
        })
        .attr("y1", function(d) {
          return y1(d.value);
        }) 
        .attr("height",function(d) {
          return (y1(0) - y1(d.value));
        })
        .attr("fill", "#c1cdcd");
    
    chart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);
    chart.append("g")
      .attr("class", "y0 axis")
      .call(yAxis0);
    chart.append("g")
      .attr("class", "y1 axis")
      .call(yAxis1);
    
    // add refresh functionality to get new data
    d3.select("#refresh")
      .on("click", function() {
        google.script.run
          .withSuccessHandler(updateChart)
          .getChartData();
        
        function updateChart(dataset) {
          
          // update x and y domains
          x.domain(dataset.map(function(d) { return d.category; }));
          y0.domain([0,d3.max(dataset, function(d) { return d.value; })]);
          y1.domain([0,d3.max(dataset, function(d) { return d.value; })]);
          
          // update all the rects
          var bars = chart.selectAll("rect")
            .data(dataset);
            
          // enter
          bars.enter()
            .append("rect")
              .attr("x",width)
              .attr("y0",function(d) {
                return y0(d.value);
              })
              .attr("width",x.rangeBand())
              .attr("height",function(d) {
                return (y0(0) - y0(d.value));
              })
              .attr("fill", "#458b74")
            .append("rect")
              .attr("x",width)
              .attr("y1",function(d) {
                return y1(d.value);
              })
              .attr("width",x.rangeBand())
              .attr("height",function(d) { 
                return (y1(0) - y1(d.value));
              })
              .attr("fill", "#c1cdcd");
          
      //Update…
		  bars.transition()		//Initiate a transition on all elements in the update selection (all rects)
			.duration(500)
              .attr("x",function(d){
                return x(d.category);
              })
              .attr("y0",function(d) {
                return y0(d.value);
              })
              .attr("width",x.rangeBand())
              .attr("height",function(d) {
                return (y0(0) - y0(d.value));
              })
              
            .duration(500)
              .attr("x",function(d){
                return x(d.category);
              })
              .attr("y1",function(d) {
                return y1(d.value);
              })
              .attr("width",x.rangeBand())
              .attr("height",function(d) {
                return (y1(0) - y1(d.value));
              });
          
          
          // exit
          bars.exit()
            .transition()
            .duration(500)
            .attr("x",width)
            .remove();
            
          // update the x axis labels
          xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");
          
          chart.selectAll("g.x.axis")
            .call(xAxis);
          
          // update the y axis
          yAxis0 = d3.svg.axis()
            .scale(y0)
            .orient("left");
            
          chart.selectAll("g.y0.axis")
            .call(yAxis0);
            
          yAxis1 = d3.svg.axis()
            .scale(y1)
            .orient("right");
          
          chart.selectAll("g.y1.axis")
            .call(yAxis1);
            
        };
      });
};
// function to call to update the chart
var updateChart2 = function(data) {
  // set width and height and padding of SVG
  var margin = {top: 20, right: 30, bottom: 20, left: 30};
  var width = 800 - margin.right - margin.left;
  var height = 500 - margin.top - margin.bottom;
    
  var chart = d3.select(".chart");
  var y0 = d3.scale.linear()
      .domain([0,d3.max(data, function(d) { return d.value; })])
      .range([height,0]);
  var y1 = d3.scale.linear()
      .domain([0,d3.max(data, function(d) { return d.value; })])
      .range([height,0]);
  
  // update all the rects
  chart.selectAll("rect")
        .data(data)
        .transition()
        .duration(1000)
        .attr("y0",function(d) {
          return y0(d.value);
        })
        .attr("height",function(d) {
          return (y0(0) - y0(d.value));
        })
        .attr("y1",function(d) {
          return y1(d.value);
        })
        .attr("height",function(d) {
          return (y1(0) - y1(d.value));
        });
};
</script>

