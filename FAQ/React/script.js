//===========FUNCTIONS============


//===========GLOBALS============
var ce = React.createElement;
var state = {
};


//===========COMPONENTS===========
var Form = function (props) {

    var out =
        ce('div', { className: props.cName });
    return out;
};

var Items = function (props) {

    var out =
        ce('div', { className: props.cName });
    return out;
};

var App = function (props) {
    var out =
        ce('div', { className: props.cName },
            ce(Form, { cName: "form" }),
            ce(Items, { cName: "items" })
        );
    return out;
};

//===== APP RENDERER =======
var renderApp = function () { ReactDOM.render(ce(App, { cName: "wrapper" }), document.getElementById('app')); };
//Rendering App
renderApp();



