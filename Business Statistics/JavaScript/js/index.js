//OptionIcons
var OpttionIcons = document.getElementsByClassName('optionsIcon');
for ( i=1; i<OpttionIcons.length; i++)
{
  OpttionIcons[i].addEventListener("click", function(){
  OptionMenuOpen(this);});
}

//CloseButtons
var CloseIcons = document.getElementsByClassName('closeIcon');
for ( i=0; i<CloseIcons.length; i++)
{
  CloseIcons[i].addEventListener("click", function(){
  OptionDivClose(this);});
}

//subMenus
var subMenus = document.getElementsByClassName('subMenu');
for ( i=0; i<subMenus.length; i++)
{
  if ((i+2)%2 == 0)
  {
    subMenus[i].addEventListener("click", function(){
    OptionMenuClose(this);});
  }
  else
  {
    subMenus[i].addEventListener("click", function(){
    OptionDivOpen(this);});
  }
}

//floating Divs
var chartDivs = document.getElementsByClassName('chartWrapper');
for ( i=0; i<chartDivs.length; i++)
{
  chartDivs[i].addEventListener("mousedown", function(){
  dragElement(this,event);});
}

placeCharts();
//Chart placement
function placeCharts()
{
  var c = document.getElementsByClassName('chartWrapper');
  var d=["0px","500px","0px","500px"];
  var e=["30px","30px","550px","550px"];;

  var j=0;
  for ( i=0; i<c.length; i++)
  {
    if ((c[i].style.display=='block')||(c[i].style.display==''))
    {
      c[i].style.marginLeft = d[j];
      c[i].style.marginTop = e[j];
      j++;
    }
  }
}

function dragElement(elmnt,e) {

  var cx = parseInt(elmnt.style.left)?parseInt(elmnt.style.left):0;
  var cy = parseInt(elmnt.style.top)?parseInt(elmnt.style.top):0;

  var pos1 = e.clientX;
  var pos2 = e.clientY;

  document.onmouseup = closeDragElement;
  document.onmousemove = elementDrag;

  function elementDrag(e) {
    var pos3 = e.clientX;
    var pos4 = e.clientY;

    var l = (pos3-pos1);
    var t = (pos4-pos2);

    elmnt.style.left = (cx+l) + "px";
    elmnt.style.top =  (cy+t) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function AccessMenu(div)
{
  var subwrapper = div.childNodes[5];
  subwrapper.classList.toggle("clicked");
}
function SetAccess(div,a,b,c,d)
{
  var title = document.getElementsByClassName('selected');
  title[0].innerHTML = div.innerHTML;

  var charts = document.getElementsByClassName('chartWrapper');
  if (a==0){a='none';} else {a='block';}
  if (b==0){b='none';} else {b='block';}
  if (c==0){c='none';} else {c='block';}
  if (d==0){d='none';} else {d='block';}
  charts[0].style.display = a;
  charts[1].style.display = b;
  charts[2].style.display = c;
  charts[3].style.display = d;
  placeCharts();
}
function OptionMenuOpen (ClickedDiv)
{
  var icon = ClickedDiv.parentNode.parentNode.childNodes[1].childNodes[5];
  var menu = icon.childNodes[3];
  icon.classList.toggle("clicked");
  menu.classList.toggle("clicked");
}
function OptionMenuClose(ClickedDiv)
{
    var ChartDiv = ClickedDiv.parentNode.parentNode.parentNode.parentNode.childNodes[3];
    ChartDiv.classList.toggle("clicked");

    if (ClickedDiv.innerHTML == "Close")
    {ClickedDiv.innerHTML = "Open"}
    else {ClickedDiv.innerHTML = "Close"}
  }
  function OptionDivOpen(ClickedDiv)
  {
    var ChartDiv = ClickedDiv.parentNode.parentNode.parentNode.parentNode.childNodes[3];
    var OptionsDiv  = ChartDiv.childNodes[1];
    OptionsDiv.style.display = 'block';
  }
  function OptionDivClose(ClickedDiv)
  {
    var OptionsDiv = ClickedDiv.parentNode.parentNode
    OptionsDiv.style.display = 'none';
  }

  drawChart1((document.getElementsByClassName('pie')[0]));
  drawChart2((document.getElementsByClassName('pie')[1]));
  drawChart3((document.getElementsByClassName('pie')[2]));
  drawChart4((document.getElementsByClassName('pie')[3]));

  function drawChart1(div)
  {
      google.charts.load("current", {packages:["corechart"]});
      google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['Task', 'Hours per Day'],
          ['1 Star', 3],
          ['2 Star', 2],
          ['3 Star',15],
          ['4 Star',17],
          ['5 Star',6]
        ]);

        var options = {
          title: 'Product Reviews',
          backgroundColor:'#eee',
          fontSize:'15px',
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
  function drawChart2(div)
  {
    google.charts.load('current', {'packages':['bar']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['Year', 'AverageCost'],
          ['2014',  400],
          ['2015',  460],
          ['2016', 120],
          ['2017', 540]
        ]);

        var options = {
          backgroundColor:'#eee',
          bars: 'vertical' // Required for Material Bar Charts.
        };

        var chart = new google.charts.Bar(div);

        chart.draw(data, google.charts.Bar.convertOptions(options));
      }
  }
  function drawChart3(div)
  {
    google.charts.load('current', {'packages':['bar']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['Year', 'Expenses', 'Profit'],
          ['2014',  400, 200],
          ['2015',  460, 250],
          ['2016', 120, 300],
          ['2017', 540, 350]
        ]);

        var options = {
          backgroundColor:'#eee',
          bars: 'horizontal' // Required for Material Bar Charts.
        };

        var chart = new google.charts.Bar(div);

        chart.draw(data, google.charts.Bar.convertOptions(options));
      }
  }
  function drawChart4(div)
  {
      google.charts.load("current", {packages:["corechart"]});
      google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['Task', 'Hours per Day'],
          ['January', 3],
          ['February', 2],
          ['March',15]
        ]);

        var options = {
          title: 'Product Return (3-Month)',
          backgroundColor:'#eee',
          fontSize:'15px',
          pieHole: 0.4,
          slices: {  0: {offset: 0.2},
                    2: {offset: 0.3},
          },
        };

        var chart = new google.visualization.PieChart(div);
        chart.draw(data, options);
      }
  }
