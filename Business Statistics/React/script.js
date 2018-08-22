//===========FUNCTIONS============
var testClick = function (event) {
    console.log(event.target);
};
var topMenuClick = function (event) {
    state.subMenus.visible = !state.subMenus.visible;
    renderApp();
};
var chartsMenuIconClick = function (id) {
    state.charts.items[id].menu = !state.charts.items[id].menu;
    renderApp();
};
var chartsIconCloseClick = function (id) {
    state.charts.items[id].visible = !state.charts.items[id].visible;
    renderApp();
};
var chartsIconSettingsClick = function (id) {
    state.charts.items[id].settings = !state.charts.items[id].settings;
    renderApp();
};
var setAccess = function (id) {

    state.subMenus.items[id].access.map(function (element, index) {
        state.charts.items[index].itemVisible = element;
    });

    renderApp();
};
//===========GLOBALS============
var ce = React.createElement;
var state = {
    charts: {
        spots: [true, true, true, true],
        actions: {
            iconClick: chartsMenuIconClick,
            iconCloseClick: chartsIconCloseClick,
            iconSettingsClick: chartsIconSettingsClick,
            //mouseDown: chartMouseDown
        },
        items: [
            { title: "Chart #1 : Star Rating", visible: true, settings: false, menu: false, itemVisible: true },
            { title: "Chart #2 : Average Cost", visible: true, settings: false, menu: false, itemVisible: true },
            { title: "Chart #3 : Expenses", visible: true, settings: false, menu: false, itemVisible: true },
            { title: "Chart #4 : Product Return", visible: true, settings: false, menu: false, itemVisible: true }
        ]
    },
    subMenus: {
        visible: false,
        action: setAccess,
        items: [
            { title: "Aministrator: Access (All)", access: [true, true, true, true] },
            { title: "User 1: Access (1:2)", access: [true, true, false, false] },
            { title: "User 2: Access (1:4)", access: [true, false, false, true] },
            { title: "User 3: Access (2:3)", access: [false, true, true, false] }
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
                    ce('div', {
                        key: index,
                        onClick: function () { props.subMenus.action(index) }
                    }, element.title)
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

var chartStyle = function (index) {
    var style = "chartWrapper";

    style += ((state.charts.items[index].itemVisible) ? " visible" : " invisible");

    if (style.indexOf("invisible") == -1) {

        style += ((state.charts.spots[0])
            ? " first" : ((state.charts.spots[1])
                ? " second" : ((state.charts.spots[2])
                    ? " third" : " fourth")));

        (style.indexOf("first") > -1)
            ? state.charts.spots[0] = false : ((style.indexOf("second") > -1)
                ? state.charts.spots[1] = false : ((style.indexOf("third") > -1)
                    ? state.charts.spots[2] = false : state.charts.spots[3] = false));
    }

    return style;
};
var Chart = function (props) {
    var out =
        ce('div', { className: "content" },
            props.charts.items.map(function (element, index) {
                return (
                    ce('div', {
                        key: index,
                        className: chartStyle(index)
                        // onMouseDown: props.charts.actions.mouseDown
                    },
                        ce('div', { className: "title" },
                            ce('div', { className: "dragdrop" }, ce('div', {})),
                            ce('div', { className: "text" }, element.title),
                            ce('div', {
                                className: ((element.menu) ? "optionsIcon clicked" : "optionsIcon"),
                                onClick: function () { props.charts.actions.iconClick(index) }
                            },
                                ce('div', { className: "icon" },
                                    ce('div', {}), ce('div', {}), ce('div', {})
                                ),
                                ce('div', { className: ((element.menu) ? "menu clicked" : "menu") },
                                    ce('div', {
                                        className: "subMenu",
                                        onClick: function () { props.charts.actions.iconCloseClick(index) }
                                    }, ((element.visible) ? "Close" : "Open")),
                                    ce('div', {
                                        className: "subMenu",
                                        onClick: function () { props.charts.actions.iconSettingsClick(index) }
                                    }, "Options")
                                )
                            )
                        ),
                        ce('div', { className: ((element.visible) ? "charts" : "charts clicked") },
                            ce('div', { className: ((element.settings) ? "options visible" : "options invisible") },
                                ce('div', { className: "row" },
                                    ce('div', { className: "label" }, "From"),
                                    ce('div', { className: "date" },
                                        ce('input', { type: 'date' })
                                    )
                                ),
                                ce('div', { className: "row" },
                                    ce('div', { className: "label" }, "To"),
                                    ce('div', { className: "date" },
                                        ce('input', { type: 'date' })
                                    )
                                ),
                                ce('div', { className: "row" },
                                    ce('div', {
                                        className: "closeIcon",
                                        onClick: function () { props.charts.actions.iconSettingsClick(index) }
                                    }, "Close")
                                )
                            ),
                            ce('div', { className: "pie" })
                        )
                    )
                )
            })
        )
    return out;
};

var ChartsSection = function (props) {
    var out =
        ce('div', { className: props.cName },
            ce(Chart, { charts: props.charts })
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
            ce(ChartsSection, {
                cName: "application",
                charts: state.charts
            })
        );
    return out;
};
//===== APP RENDERER =======
var renderApp = function () {
    var originalState = [true, true, true, true];
    state.charts.spots = originalState;
    ReactDOM.render(ce(App, { cName: "wrapper" }), document.getElementById('app'));
};
//Rendering App
renderApp();
