//===========FUNCTIONS============
var testClick = function (evernt) {
    console.log(event.target);
};
var topMenuClick = function (event) {
    state.subMenus.visible = !state.subMenus.visible;
    renderApp();
};
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
//===========GLOBALS============
var ce = React.createElement;
var state = {
    subMenus: {
        visible: false,
        action: testClick,
        items: [
            { title: "Aministrator: Access (All)", access: [1, 2, 3, 4] },
            { title: "User 1: Access (1:2)", access: [1, 1, 0, 0] },
            { title: "User 2: Access (1:4)", access: [1, 0, 0, 4] },
            { title: "User 3: Access (2:3)", access: [0, 1, 3, 0] }
        ],
    },
    topMenuAction: topMenuClick
};
//===========COMPONENTS===========
var HeaderSubMenus = function (props) {
    var out =
        ce('div', { className: ((props.subMenus.visible) ? "subMenuWrapper clicked" : "subMenuWrapper") },
            props.subMenus.items.map(function (element, index) {
                return (
                    ce('div', { key: index, onClick: props.subMenus.action }, element.title)
                )
            })
        );

    return out;
};
var MenuSection = function (props) {
    var out =
        ce('div', { className: props.cName },
            ce('div', { className: "content" },
                ce('div', { className: "userMgmt" },
                    ce('div', { className: "text" }, "View As:"),
                    ce('div', { className: "userMenu", onClick: props.menuAction },
                        ce('div', { className: "selected" }, "Aministrator: Access (All)"),
                        ce('div', { className: "arrow" },
                            ce('div', { className: "arrowDown" })
                        ),
                        ce(HeaderSubMenus, { subMenus: props.subMenus })
                    )
                )
            )
        );
    return out;
};

var ChartsSection = function (props) {
    var out =
        ce('div', { className: props.cName },
            ce('div', { className: "content" },
            )
        );
    return out;
};

var App = function (props) {
    var out =
        ce('div', { className: props.cName },
            ce(MenuSection, {
                cName: "header",
                menuAction: state.topMenuAction,
                subMenus: state.subMenus
            }),
            ce(ChartsSection, { cName: "application" })
        );
    return out;
};
//===== APP RENDERER =======
var renderApp = function () { ReactDOM.render(ce(App, { cName: "wrapper" }), document.getElementById('app')); };
//Rendering App
renderApp();
