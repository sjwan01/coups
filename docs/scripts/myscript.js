// add your JavaScript/D3 to this file
d3.csv('https://raw.githubusercontent.com/mclaneliu01/coups/main/data/d3/year_couprisk.csv').then(function(data) {

      // Set up the SVG container
      const width = 600;
      const height = 400;
      const margin = { top: 20, right: 20, bottom: 50, left: 50 };

      const svg = d3.select("div#plot")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // Create histogram
      const x = d3.scaleLinear()
        .domain([d3.min(data, d => +d.year), d3.max(data, d => +d.year)])
        .range([0, width]);

      const bins = d3.histogram()
        .value(d => +d.year)
        .domain(x.domain())
        .thresholds(d3.range(d3.min(data, d => +d.year), d3.max(data, d => +d.year) + 6, 5))(data);

      const y = d3.scaleLinear()
        .domain([0, d3.max(bins, d => d.length)])
        .range([height, 0]);

      // Tooltip
      const tooltip = d3.select("div#plot")
        .append("div")
        .style("position", "absolute")
        .style("visibility", "hidden")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "1px")
        .style("padding", "5px");

      // Mouseover function
      function handleMouseOver(d) {
        const averageCoupRisk = d3.mean(data.filter(coup => coup.year >= d.x0 && coup.year < d.x1), coup => +coup.couprisk);

        tooltip.html(`Average Coup Risk: ${averageCoupRisk.toFixed(4)}`)
          .style("visibility", "visible");

        d3.select(this)
          .attr("fill", "orange");
      }

      // Mouseout function
      function handleMouseOut() {
        tooltip.style("visibility", "hidden");

        d3.select(this)
          .attr("fill", "steelblue");
      }

      // Create bars
      const bars = svg.selectAll("rect")
        .data(bins)
        .enter().append("rect")
        .attr("x", d => x(d.x0) + 1)
        .attr("width", d => x(d.x1) - x(d.x0) - 1)
        .attr("y", d => y(d.length))
        .attr("height", d => height - y(d.length))
        .attr("fill", "steelblue") // Change the color here
        .on("mouseover", handleMouseOver)
        .on("mouseout", handleMouseOut);

      // Add axes
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickFormat(d3.format("d")));

      svg.append("g")
        .call(d3.axisLeft(y));

      // Add labels
      svg.append("text")
        .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.top + 20) + ")")
        .style("text-anchor", "middle")
        .text("Year");

      svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Number of Coups");

      const descriptionDiv = d3.select("#description");
      descriptionDiv.html("Here we have an interactive time series histogram, where the x-axis displays the years in 5-year intervals and the y-axis displays the count of coups. As the reader hovers over a bar, the bar gets highlighted and displays the average coup risk for the 5-year interval.");
    });
