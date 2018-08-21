//===========FUNCTIONS============
var testClick = function (evernt) {
    console.log(event.target);
};
var topMenuClick = function (event) {
    state.subMenus.visible = !state.subMenus.visible;
    renderApp();
};
//===========GLOBALS============
var ce = React.createElement;
var state = {
    charts: [
        { visible: true, title: "Chart #1 : Star Rating" },
        { visible: true, title: "Chart #2 : Average Cost" },
        { visible: true, title: "Chart #3 : Expenses" },
        { visible: true, title: "Chart #4 : Product Return" }
    ],
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

var Chart = function (props) {
    var out =
        ce('div', { className: "content" },
            props.charts.map(function (element, index) {
                return (
                    ce('div', { key: index, className: "chartWrapper" },
                        ce('div', { className: "title" },
                            ce('div', { className: "dragdrop" }, ce('div', {})),
                            ce('div', { className: "text" }, element.title),
                            ce('div', { className: "optionsIcon" },
                                ce('div', { className: "icon" },
                                    ce('div', {}), ce('div', {}), ce('div', {})
                                ),
                                ce('div', { className: "menu" },
                                    ce('div', { className: "subMenu" }, "Close"),
                                    ce('div', { className: "subMenu" }, "Options")
                                )
                            )
                        ),
                        ce('div', { className: "charts" },
                            ce('div', { className: "options" },
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
                                    ce('div', { className: "closeIcon" }, "Close")
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
var renderApp = function () { ReactDOM.render(ce(App, { cName: "wrapper" }), document.getElementById('app')); };
//Rendering App
renderApp();
