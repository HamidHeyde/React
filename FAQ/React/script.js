//===========FUNCTIONS============
var testClick = function (event) {
    console.log(event.target.parentElement.parentElement);
};
var itemHeaderClick = function (event) {
    //var availableItems = [...state.items];
    var availableItems = state.items.slice();

    var id = Number(event.target.parentElement.id);
    availableItems[id].visible = !availableItems[id].visible;

    state.items = availableItems;
    renderApp();
};
var OptionAction = function (event, action) {
    var availableItems = state.items.slice();
    var id = Number(event.target.parentElement.parentElement.id);
    if (action == "up") {
        if (id != 0) {
            var temp = availableItems[id];
            availableItems[id] = availableItems[id - 1];
            availableItems[id - 1] = temp;
        }
    } else if (action == "down") {
        if (id != availableItems.length - 1) {
            var temp = availableItems[id];
            availableItems[id] = availableItems[id + 1];
            availableItems[id + 1] = temp;
        }
    } else if (action == "remove") {
        availableItems.splice(id, 1);
    } else if (action == "edit") {

        document.getElementById("txt_question").value = availableItems[id].q;
        document.getElementById("txt_response").value = availableItems[id].r;
        availableItems.splice(id, 1);

    } else if (action == "add") {
        var question = document.getElementById("txt_question").value;
        if (question != "") {
            var response = document.getElementById("txt_response").value;
            if (response != "") {
                var faqItem = {q: question,r: response,visible: true};
                availableItems.push(faqItem);
            } else {
                state.error = {
                    visible: true,
                    message: "Please Enter a Response"
                }
            }
        }
        else {
            state.error = {
                visible: true,
                message: "Please Enter a Question"
            }
        }

    }
    //Updating the Results
    state.items = availableItems;
    renderApp();

};
//===========GLOBALS============
var ce = React.createElement;
var state = {
    items: [
        {
            q: "Here is the question 1",
            r: "Here is the answer to Question 1.Here is the answer to Question 1",
            visible: true
        },
        {
            q: "Here is the question 2",
            r: "Here is the answer to Question 2. Here is the answer to Question 2.",
            visible: true
        },
        {
            q: "Here is the question 3",
            r: "Here is the answer to Question 2. Here is the answer to Question 3.",
            visible: true
        }
    ],
    error: {
        visible: false,
        message: "This is an Error"
    },
    formAction: function (event) { OptionAction(event, "add"); },
    itemClick: itemHeaderClick,
    moveUpClick: function (event) { OptionAction(event, "up"); },
    moveDownClick: function (event) { OptionAction(event, "down"); },
    editClick: function (event) { OptionAction(event, "edit"); },
    removeClick: function (event) { OptionAction(event, "remove"); }
};


//===========COMPONENTS===========
var Err = function (props) {

    var out =
        ce('div', { className: ((props.error.visible) ? "error visible" : "error invisible") },
            props.error.message);
    return out;
};

var Form = function (props) {

    var out =
        ce('div', { className: props.cName },
            ce('div', { className: 'header' },
                ce('div', { className: 'title' }), 'INSERT NEW ITEM'),
            ce('div', { className: 'content' },
                ce('div', { className: 'title' }, `Question`),
                ce('div', { className: 'text' },
                    ce('input', {
                        id: "txt_question",
                        type: 'text',
                        placeholder: "Your Question"
                    })
                ),
                ce('div', { className: 'title' }, `Response`),
                ce('div', { className: 'text' },
                    ce('textarea', {
                        id: "txt_response",
                        cols: "30", rows: "5",
                        placeholder: "Your Response"
                    })
                ),
                ce('div', { className: 'button' },
                    ce('input', {
                        id: "btn_add",
                        type: "button",
                        value: "Add Item",
                        onClick: props.formAction
                    })
                )
            ),
        );
    return out;
};

var RItems = function (props) {

    var out =
        ce('div', { className: props.cName },
            props.items.map(function (element, index) {
                return (
                    ce('div', { key: index, className: "item" },
                        ce('div', { id: index, className: ((element.visible) ? "header clicked" : "header") },
                            ce('div', { className: "question", onClick: props.actions.itemClick }, element.q),
                            ce('div', { className: "options" },
                                ce('div', { className: "option", onClick: props.actions.moveDownClick }, "Move Down"),
                                ce('div', { className: "option", onClick: props.actions.moveUpClick }, "Move Up"),
                                ce('div', { className: "option", onClick: props.actions.removeClick }, "Remove"),
                                ce('div', { className: "option", onClick: props.actions.editClick }, "Edit"),
                            )
                        ),
                        ce('div', { className: ((element.visible) ? "content visible" : "content invisible") }, element.r)
                    )
                )
            })
        );
    return out;
};

var App = function (props) {
    var out =
        ce('div', { className: props.cName },
            ce(Err, { error: state.error }),
            ce(Form, { cName: "form", formAction: state.formAction }),
            ce(RItems, {
                cName: "items", items: state.items,
                actions: {
                    itemClick: state.itemClick,
                    moveDownClick: state.moveDownClick,
                    moveUpClick: state.moveUpClick,
                    removeClick: state.removeClick,
                    editClick: state.editClick
                }
            })
        );
    return out;
};

//===== APP RENDERER =======
var renderApp = function () { ReactDOM.render(ce(App, { cName: "wrapper" }), document.getElementById('app')); };
//Rendering App
renderApp();



