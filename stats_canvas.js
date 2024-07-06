// canvas functions to render stats.html charts
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.font = "16px sans-serif";

NUM_DATE_TICKS = 8;
NUM_Y_TICKS = 6;

function renderActivityBarChart(data) {
    var minDate = '9999-99-99';
    var maxDate = '0000-00-00';
    var dateCounts = {};
    var maxSingleDateCount = 0;
    let problemNumbers = Object.keys(data);
    problemNumbers.forEach(problemNumber => {
        let date = data[problemNumber].date;
        if (date < minDate) { minDate = date; }
        if (date > maxDate) { maxDate = date; }
        if (dateCounts.hasOwnProperty(date)) {
            dateCounts[date]++;
        } else {
            dateCounts[date] = 1;
        }
        maxSingleDateCount = Math.max(maxSingleDateCount, dateCounts[date]);
    });
    var xTicks = [];
    let dateInterval = (Date.parse(maxDate) - Date.parse(minDate)) / NUM_DATE_TICKS;
    for (var i = 0; i < NUM_DATE_TICKS; i++) {
        let dateTick = new Date(Date.parse(minDate) + dateInterval * i);
        xTicks.push(dateTick.toISOString().substring(0, 10));
    }
    let yTicks = [];
    let yInterval = maxSingleDateCount / NUM_Y_TICKS;
    for (var i = 0; i < NUM_Y_TICKS; i++) {
        yTicks.push('' + Math.round(yInterval * i));
    }
    renderChart(
        points,
        [100, 400],
        500, 300,
        xTicks, yTicks,
        "Time",
        "Problems solved",
        "Problems solved over time",
        true,
        true
    );
}

function renderBarCharts(data) {
    renderActivityBarChart(data);
}

function renderPieCharts(data) {
    
}

function renderTriangle(points) {
    /*
    Render a triangle given by points.
    Draws a path (x1,y1) -> (x2,y2) -> (x3,y3) -> (x1,y1)

    points: array of 3 points [[x1, y1], [x2, y2], [x3, y3]]
    */
   let [[x1, y1], [x2, y2], [x3, y3]] = points;
   ctx.beginPath();
   ctx.moveTo(x1, y1);
   ctx.lineTo(x2, y2);
   ctx.lineTo(x3, y3);
   ctx.lineTo(x1, y1);
   ctx.fill();
}

function renderChart(points, origin, xAxisLength, yAxisLength, xAxisTicks, yAxisTicks, xAxisLabel, yAxisLabel, chartTitle, xTicksVertical, xTicksOffset) {
    /*
    Render the axes of a chart in Q1 (positive x and y coordinates).

    points: array of (x,y) coordinates to plot, in order, e.g. [[50, 50], [100, 100]]
    origin: (x,y) coordinate of origin, e.g. [50, 100]
    xAxisLength: length of x-axis in pixels, e.g. 100
    yAxisLength: length of y-axis in pixels, e.g. 100
    xAxisTicks: tick labels to be equally distributed along x axis (starts at origin)
        e.g. ["0", "1", "2", "3", "4", "5"]
    yAxisTicks: tick labels to be equally distributed along y axis (starts at origin)
        e.g. ["0", "1", "2", "3", "4", "5"]
    xAxisLabel: title of x-axis, e.g. "Time"
    yAxisLabel: title of y-axis, e.g. "Number of Problems Solved"
    chartTitle: title of chart, e.g. "Problems Solved Over Time"
    xTicksVertical: whether to make x ticks vertical, e.g. true or false
    xTicksOffset: whether to make x ticks offset to the middle of the x-intervals, e.g. true or false
    */
    let [ox, oy] = origin;

    // x-axis
    ctx.fillRect(ox - 5, oy, xAxisLength + 5, AXIS_WIDTH);
    // axis arrow
    let xAxisEndX = ox + xAxisLength;
    renderTriangle([[xAxisEndX, oy-5+AXIS_WIDTH/2], [xAxisEndX + 10, oy+AXIS_WIDTH/2], [xAxisEndX, oy + 5+AXIS_WIDTH/2]])
    // axis ticks
    var maxXTickLength = 0;
    if (xAxisTicks.length > 0) {
        let xSpacing = xAxisLength/xAxisTicks.length;
        
        xAxisTicks.forEach((tickLabel, tickIndex) => {
            var textX = 0;
            if (xTicksOffset) {
                textX = ox + xSpacing * tickIndex + xSpacing/2;
            } else {
                textX = ox + xSpacing * tickIndex;
            }
            let textY = oy + 20;
            if (xTicksVertical) {
                ctx.save();
                ctx.textAlign = "right";
                ctx.translate(textX, textY);
                ctx.rotate(-90 * Math.PI/180);
                ctx.fillText(tickLabel, 0, 0);
                ctx.restore();
            } else {
                ctx.fillText(tickLabel, textX, textY);
            }
            maxXTickLength = Math.max(maxXTickLength, ctx.measureText(tickLabel).width);
        });
    }
    // axis label
    let centerX = ox + (xAxisLength/2);
    var xLabelY = oy + 50;
    if (xTicksVertical) {
        xLabelY = oy + maxXTickLength + 50;
    }
    ctx.save();
    ctx.textAlign = "center";
    ctx.fillText(xAxisLabel, centerX, xLabelY);
    ctx.restore();

    // y-axis
    ctx.fillRect(ox, oy - yAxisLength - 5, AXIS_WIDTH, yAxisLength + 10);
    // axis arrow
    let yAxisStartY = oy - yAxisLength - 5;
    renderTriangle([[ox-5+AXIS_WIDTH/2, yAxisStartY], [ox+AXIS_WIDTH/2, yAxisStartY-10], [ox+5+AXIS_WIDTH/2, yAxisStartY]])
    // axis ticks
    if (yAxisTicks.length > 0) {
        let ySpacing = yAxisLength/yAxisTicks.length;
        yAxisTicks.forEach((tickLabel, tickIndex) => {
            let textX = ox - 20;
            let textY = oy - ySpacing * tickIndex;
            ctx.save();
            ctx.textAlign = "right";
            ctx.fillText(tickLabel, textX, textY);
            ctx.restore();
        });
    }
    // axis label
    let centerY = oy - (yAxisLength/2);
    let yLabelX = ox - 60;
    let yLabelOffset = 0;
    ctx.save();
    ctx.textAlign = "center";
    ctx.translate(yLabelX, centerY);
    ctx.rotate(-90 * Math.PI/180);
    ctx.fillText(yAxisLabel, 0, 0);
    ctx.restore();

    // chart title
    ctx.save();
    ctx.textAlign = "center";
    ctx.translate(centerX, oy - yAxisLength - 50);
    ctx.fillText(chartTitle, 0, 0);
    ctx.restore();
}

function renderLineCharts(data) {

}

function renderCanvas() {
    COLOR_THEME = getInitialColorMode();

    if (COLOR_THEME == 'dark') {
        ctx.fillStyle = "#ebdbb2";
        ctx.strokeStyle = "#ebdbb2";
        AXIS_WIDTH = 2;
    } else {
        ctx.fillStyle = "black";
        ctx.strokeStyle = "black";
        AXIS_WIDTH = 1;
    }

    retrieveData().then(data => {
        renderBarCharts(data);
        renderPieCharts(data);
        renderLineCharts(data)
    });
}

renderCanvas();