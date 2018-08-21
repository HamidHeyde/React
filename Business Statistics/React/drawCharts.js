placeCharts();
//Chart placement
function placeCharts() {
  var c = document.getElementsByClassName('chartWrapper');
  var d = ["0px", "500px", "0px", "500px"];
  var e = ["30px", "30px", "550px", "550px"];;

  var j = 0;
  for (i = 0; i < c.length; i++) {
    if ((c[i].style.display == 'block') || (c[i].style.display == '')) {
      c[i].style.marginLeft = d[j];
      c[i].style.marginTop = e[j];
      j++;
    }
  }
}

drawChart1((document.getElementsByClassName('pie')[0]));
drawChart2((document.getElementsByClassName('pie')[1]));
drawChart3((document.getElementsByClassName('pie')[2]));
drawChart4((document.getElementsByClassName('pie')[3]));

function drawChart1(div) {
  google.charts.load("current", { packages: ["corechart"] });
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {
    var data = google.visualization.arrayToDataTable([
      ['Task', 'Hours per Day'],
      ['1 Star', 3],
      ['2 Star', 2],
      ['3 Star', 15],
      ['4 Star', 17],
      ['5 Star', 6]
    ]);

    var options = {
      title: 'Product Reviews',
      backgroundColor: '#eee',
      fontSize: '15px',
      //is3D: true,
      slices: {
        0: { color: 'darkred' },
        1: { color: 'firebrick' },
        2: { color: 'red' },
        3: { color: 'orangered' },
        4: { color: 'orange' }
      }
    };

    var chart = new google.visualization.PieChart(div);
    chart.draw(data, options);
  }
}
function drawChart2(div) {
  google.charts.load('current', { 'packages': ['bar'] });
  google.charts.setOnLoadCallback(drawChart);

  function drawChart() {
    var data = google.visualization.arrayToDataTable([
      ['Year', 'AverageCost'],
      ['2014', 400],
      ['2015', 460],
      ['2016', 120],
      ['2017', 540]
    ]);

    var options = {
      backgroundColor: '#eee',
      bars: 'vertical' // Required for Material Bar Charts.
    };

    var chart = new google.charts.Bar(div);

    chart.draw(data, google.charts.Bar.convertOptions(options));
  }
}
function drawChart3(div) {
  google.charts.load('current', { 'packages': ['bar'] });
  google.charts.setOnLoadCallback(drawChart);

  function drawChart() {
    var data = google.visualization.arrayToDataTable([
      ['Year', 'Expenses', 'Profit'],
      ['2014', 400, 200],
      ['2015', 460, 250],
      ['2016', 120, 300],
      ['2017', 540, 350]
    ]);

    var options = {
      backgroundColor: '#eee',
      bars: 'horizontal' // Required for Material Bar Charts.
    };

    var chart = new google.charts.Bar(div);

    chart.draw(data, google.charts.Bar.convertOptions(options));
  }
}
function drawChart4(div) {
  google.charts.load("current", { packages: ["corechart"] });
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {
    var data = google.visualization.arrayToDataTable([
      ['Task', 'Hours per Day'],
      ['January', 3],
      ['February', 2],
      ['March', 15]
    ]);

    var options = {
      title: 'Product Return (3-Month)',
      backgroundColor: '#eee',
      fontSize: '15px',
      pieHole: 0.4,
      slices: {
        0: { offset: 0.2 },
        2: { offset: 0.3 },
      },
    };

    var chart = new google.visualization.PieChart(div);
    chart.draw(data, options);
  }
}
