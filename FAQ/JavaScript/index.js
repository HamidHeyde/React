var qs=[];
var rs=[];

var q_con = 
`<input id="txt_question_edit" type="text" placeholder="Your Question"/>
<br/>
<input id="btn_update" type="button" value="Update Item" onclick="update_item(this)">`;
var res_con =
`<textarea id="txt_response_edit"
cols="30" rows="5" placeholder="Your Response"></textarea>
`;

function create_item(id,q,r){
    var item=
    `<div id=`+id+` class="item">
        <div class="header">
            <div class="question" onclick="toggle_faq(this)">`
            +q+`</div>
            <div class="options">
                <div class="option" onclick="move_down(this)">Move Down</div>
                <div class="option" onclick="move_up(this)">Move Up</div>
                <div class="option" onclick="remove(this)">Remove</div>
                <div class="option" onclick="edit(this)">Edit</div>
            </div>
        </div>
        <div class="content">`+r+`</div>
    </div>`
    ;

    return item;
}
function remove_all(){
    var length = document.getElementsByClassName("item").length;
    var div;
    for (i=0;i<length;i++)
    {
        div = document.getElementById(i);
        div.parentNode.removeChild(div);
    }
}
function publish_all(){
    for (i=0;i<qs.length;i++)
    {
        document.getElementsByClassName("items")[0]
        .innerHTML+=create_item(i,qs[i],rs[i]);
    }
}
function add_item(){
    var length = document.getElementsByClassName("item").length;
    var q = document.getElementById("txt_question").value;
    var r = document.getElementById("txt_response").value;

    qs[length] = q;
    rs[length] = r;

    document.getElementsByClassName("items")[0]
    .innerHTML+=create_item(length,q,r);

    document.getElementById("txt_question").value = "";
    document.getElementById("txt_response").value = "";
}
function toggle_faq(ClickedDiv){
    var content = ClickedDiv.parentNode.parentNode.childNodes[3];
    var item = ClickedDiv.parentNode;
    item.classList.toggle("clicked");
    content.classList.toggle("clicked");
}
function edit(ClickedDiv){
    var main_div = ClickedDiv.parentNode.parentNode.parentNode;
    var id = parseInt(main_div.id);

    var title_div=document.getElementById(id).children[0].children[0].innerHTML;
    document.getElementById(id).children[0].children[0].innerHTML = q_con;
    document.getElementById(id).children[0].children[0].children[0].value = title_div ;

    document.getElementById(id).children[0].children[1].style.display = 'none';

    var desc_div=document.getElementById(id).children[1].innerHTML;
    document.getElementById(id).children[1].innerHTML = res_con;
    document.getElementById(id).children[1].children[0].value = desc_div;
}
function update_item(ClickedDiv)
{
    var main_div = ClickedDiv.parentNode.parentNode.parentNode;
    var id = parseInt(main_div.id);

    var qcont = document.getElementById(id).children[0].children[0].children[0].value;
    var tcont = document.getElementById(id).children[1].children[0].value;

    document.getElementById(id).children[0].children[0].innerHTML = qcont;
    qs[id] = qcont;
    document.getElementById(id).children[1].innerHTML = tcont;
    rs[id] = tcont;

    document.getElementById(id).children[0].children[1].style.display = 'block';
}
function remove(ClickedDiv){
    
    var main_div = ClickedDiv.parentNode.parentNode;
    main_div.parentNode.removeChild(main_div);
}
function move_upp(clicked_id){

    var id = clicked_id;
    var last = (id-1);

    var temp = qs[id];
    qs[id] = qs[last];
    qs[last] = temp;

    var temp1 = rs[id];
    rs[id] = rs[last];
    rs[last] = temp1;

    remove_all();
    publish_all();

}
function move_up(ClickedDiv){
    
    var main_div = ClickedDiv.parentNode.parentNode.parentNode;
    var id = parseInt(main_div.id);
    
    if (id==0)
    {alert("This is the first div and can not be moved");}
    else
    {   
        move_upp(id);
    }
}
function move_down(ClickedDiv){
    
    var main_div = ClickedDiv.parentNode.parentNode.parentNode;
    var id = parseInt(main_div.id);
    id=id+1;

    var items_num = document.getElementsByClassName("item").length;

    if (id==items_num)
    {alert("This is the last div and can not be moved");}
    else
    {   
        move_upp((id));
    }
}