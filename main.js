// Initialization of some global variables
var width = 700,
    height = 700,
    start = 0,
    end = 2.25,
    numSpirals = 3
    margin = {top:50,bottom:50,left:50,right:50};

var theta = function(r) {
    return numSpirals * Math.PI * r;
    };

var color = d3.scaleOrdinal(d3.schemeCategory10);

var r = d3.min([width, height]) / 2 - 40;

var radius = d3.scaleLinear()
				.domain([start, end])
				.range([40, r]);

var svg = d3.select("#chart")
				.append("svg")
					.attr("width", width + margin.right + margin.left)
			 		.attr("height", height + margin.left + margin.right)
      			.append("g")
      				.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var points = d3.range(start, end + 0.001, (end - start) / 1000);

var spiral = d3.radialLine()
					.curve(d3.curveCardinal)
					.angle(theta)
					.radius(radius);
    
var path = svg.append("path")
				.datum(points)
				.attr("id", "spiral")
				.attr("d", spiral)
				.style("fill", "none")
				.style("stroke", "steelblue");

var spiralLength = path.node().getTotalLength(),
					N = 365,
					barWidth = (spiralLength / N) - 5;

// Variable that contains the dates
var date = [];
	for (var i = 0; i < N; i++) {
      var currentDate = new Date("2015-01-01");
      currentDate.setDate(currentDate.getDate() + i);
	  date[i] = currentDate;
    }

// Variable that contains the counts minus the mimumum number of counts
var value = [3882, 6673, 5366, 6284, 6480, 5247, 5503, 5941, 5940, 2276, 4686, 5820, 5112, 5452, 5952, 6002, 2002, 3787, 5773, 5119, 5457, 5945, 5988, 2212, 4652, 5822, 5087, 5457, 5962, 6012, 1969, 3338, 5907, 5096, 5431, 5942, 5955, 2191, 4658, 5823, 5108, 5473, 6235, 6408, 2543, 4340, 6234, 6009, 6107, 6334, 6402, 2829, 5109, 6307, 5838, 6091, 6373, 6392, 2814, 5103, 6381, 5920, 6170, 6554, 6618, 4158, 6041, 6814, 6349, 6628, 6909, 6960, 4296, 6092, 6835, 6359, 6623, 6896, 6925, 4273, 6067, 6833, 6355, 6632, 6894, 6914, 4246, 6032, 6867, 6460, 6716, 6913, 6782, 3547, 5466, 6875, 6264, 6610, 6799, 6827, 3358, 5926, 6727, 6230, 6549, 6755, 6813, 3345, 5920, 6728, 6286, 6584, 6764, 6823, 3357, 5860, 6722, 6257, 6546, 6762, 6826, 3316, 5917, 6794, 6315, 6629, 6858, 6924, 3066, 5675, 6866, 6585, 6664, 6931, 6956, 3307, 6002, 6925, 6643, 6766, 7135, 7064, 2879, 3087, 5846, 6714, 6756, 6984, 7015, 3414, 6026, 6934, 6663, 6705, 7166, 7198, 4173, 6606, 7244, 7051, 7097, 7323, 7372, 4714, 6623, 7306, 7108, 7168, 7364, 7394, 4744, 6671, 7338, 7141, 7191, 7373, 7406, 4780, 6398, 7030, 6576, 6923, 7369, 4588, 2566, 6611, 7364, 7190, 7210, 7370, 7403, 4848, 6703, 7322, 7184, 7228, 7351, 7401, 4824, 6697, 7331, 7168, 7220, 7357, 7406, 4806, 6702, 7341, 7173, 7214, 7355, 7385, 4883, 6731, 7385, 7240, 7274, 7399, 7449, 4857, 6492, 7186, 6976, 7009, 7223, 7247, 4339, 6482, 7111, 6400, 6566, 6864, 6896, 3400, 5910, 6802, 6378, 6554, 6829, 6861, 3170, 5724, 6791, 6185, 6340, 6767, 6721, 1918, 2559, 5541, 5939, 5315, 5641, 5661, 2247, 5551, 6260, 5539, 6042, 6466, 6489, 2471, 5617, 6427, 5538, 5891, 6471, 6515, 2600, 5726, 6472, 5774, 6223, 6532, 6557, 2605, 5716, 6509, 6032, 6322, 6606, 6555, 2761, 5686, 6548, 6040, 6316, 6608, 6514, 2654, 5760, 6525, 6027, 6321, 6528, 6521, 2731, 5629, 6441, 5371, 5675, 6313, 6014, 1640, 5584, 6528, 5850, 6295, 6551, 6532, 2725, 5611, 6402, 5958, 6240, 6531, 6504, 2725, 5623, 6421, 6007, 6311, 6593, 6571, 2896, 4923, 4740, 6015, 6657, 0, 2745, 6004, 7506, 6884, 5755, 5792, 6210, 6147, 2132, 5033, 5975, 5507, 5781, 6191, 6195, 2171, 5048, 5988, 5602, 6032, 6511, 6642, 4656, 5797, 6238, 6193, 6413, 3270, 2565, 5205, 6441, 6244, 6131, 6192, 3065];

// Variable that contains the month, which will be used to set the colors of the histogram
var group = []
	for(var i=0; i<N; i++){
		var currentDate = date[i];
		group[i] = currentDate.getMonth();
	}

// Merging the three variables into an array
var someData = [];
    for (var i = 0; i < N; i++) {
      var currentDate = date[i];
      var currentValue = value[i];
      var currentGroup = group[i];
      someData.push({
        date: currentDate,
        value: currentValue,
        group: currentGroup
      });
    }

var timeScale = d3.scaleTime()
      				.domain(d3.extent(someData, function(d){
        				return d.date;
      				}))
      				.range([0, spiralLength]);
    
// yScale for the bar height
var yScale = d3.scaleLinear()
      				.domain([0, d3.max(someData, function(d){
        				return d.value;
      				})])
      				.range([0, (r / numSpirals) - 50]);

// Making the bars of the histogram
svg.selectAll("rect")
      .data(someData)
      .enter()
      .append("rect")
      .attr("x", function(d,i){
        var linePer = timeScale(d.date),
            posOnLine = path.node().getPointAtLength(linePer),
            angleOnLine = path.node().getPointAtLength(linePer - barWidth);
        d.linePer = linePer; // % distance are on the spiral
        d.x = posOnLine.x; // x postion on the spiral
        d.y = posOnLine.y; // y position on the spiral
        d.a = (Math.atan2(angleOnLine.y, angleOnLine.x) * 180 / Math.PI) - 90; //angle at the spiral position
        return d.x;
      })
      .attr("y", function(d){
        return d.y;
      })
      .attr("width", function(d){
        return barWidth;
      })
      .attr("height", function(d){
        return yScale(d.value);
      })
      .style("fill", function(d){return color(d.group);})
      .style("stroke", "none")
      .attr("transform", function(d){
        return "rotate(" + d.a + "," + d.x  + "," + d.y + ")"; // rotate the bar
      });

// Make that a box displays information when the mouse gets on top of a bar
var tooltip = d3.select("#chart")
				    .append('div')
				    .attr('class', 'tooltip');
				    tooltip.append('div')
				    .attr('class', 'date');
				    tooltip.append('div')
				    .attr('class', 'value');
				    svg.selectAll("rect")
				    .on('mouseover', function(d) {
				        tooltip.select('.date').html("Date: <b>" + d.date.toDateString() + "</b>");
				        tooltip.select('.value').html("Value: <b>" + Math.round(d.value*100)/100 + "<b>");
				        d3.select(this)
				        .style("fill","yellow")
				        tooltip.style('display', 'block');
				        tooltip.style('opacity',2);
				    })
				    .on('mousemove', function(d) {
				        tooltip.style('top', (d3.event.layerY + 10) + 'px')
				        .style('left', (d3.event.layerX - 25) + 'px');
				    })
				    .on('mouseout', function(d) {
				        d3.selectAll("rect")
				        .style("fill", function(d){return color(d.group);})
				        .style("stroke", "none")
				        tooltip.style('display', 'none');
				        tooltip.style('opacity',0);
				    });
