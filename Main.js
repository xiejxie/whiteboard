/**
 * Created by jing on 7/15/2016.
 */
var canvas, ctx, flag = false,
    prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0,
    dot_flag = false;

var x = "black",
    y = 2;

window.onload = init();

function resizeCanvas() {
    var height = document.getElementById("mainheader").offsetHeight;
    canvas = document.getElementById('maincanvas');
    canvas.style.marginTop = height+"px";
}

function init() {
    var height = document.getElementById("mainheader").offsetHeight;
    canvas = document.getElementById('maincanvas');
    canvas.style.marginTop = height+"px";
    canvas.setAttribute("width", screen.availWidth.toString());
    canvas.setAttribute("height", screen.availHeight.toString()-100-height);
    ctx = canvas.getContext("2d");

    canvas.addEventListener("mousemove", function (e) {
        findxy('move', e)
    }, false);
    canvas.addEventListener("mousedown", function (e) {
        findxy('down', e)
    }, false);
    canvas.addEventListener("mouseup", function (e) {
        findxy('up', e)
    }, false);
    canvas.addEventListener("mouseout", function (e) {
        findxy('out', e)
    }, false);
}

function findxy(res, e) {
    if (res == 'down') {
        prevX = e.clientX;
        prevY = e.clientY;
        flag = true;
    }
    if (res == 'up' || res == "out") {
        flag = false;
    }
    if (res == 'move') {
        if (flag == true) {
            canvas.style.cursor = "pointer";
            ctx.moveTo(prevX,prevY);
            ctx.lineTo(e.clientX,e.clientY);
            ctx.stroke();
            ctx.fillRect(e.clientX, e.clientY, 4, 4);
            prevX = e.clientX;
            prevY = e.clientY;
        }
    }
}


window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {

        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

function addNote(title, body) {
    if (body != "") {
        if (title == ""){title = "Untitled";}
        var note = document.createElement("div");
        note.className = "note";
        set_id(note);
        note.setAttribute("draggable", "true");
        note.setAttribute("ondragstart", "drag_start(event)");
        fillNote(note, title, body);
        var element = document.getElementById("body");
    .appendChild(note);
    }
    else {
        {alert("DUN DUN DUN")}
    }
}

function set_id(note) {
    if (typeof set_id.unique == 'undefined') {
        set_id.unique = 0;
    }

    note.id = parseInt(++set_id.unique) + "note";
}

function drag_over(event) {
    event.preventDefault();
    return false;
}

function drag_start(event) {
    var style = window.getComputedStyle(event.target, null);
    var str = (parseInt(style.getPropertyValue("left")) - event.clientX)
        + ',' + (parseInt(style.getPropertyValue("top")) - event.clientY) + ',' + event.target.id;
    event.dataTransfer.setData("div", str);
    var offset = event.dataTransfer.getData("div").split(',');
    var dm = document.getElementById(offset[2]);
    dm.overflowY = "hidden";
}

function drop(event) {
    var offset = event.dataTransfer.getData("div").split(',');
    var dm = document.getElementById(offset[2]);
    //dm.overflowY = "auto";
    dm.style.left = (event.clientX + parseInt(offset[0], 10)) + 'px';
    dm.style.top = (event.clientY + parseInt(offset[1], 10)) + 'px';
    event.preventDefault();
    return false;
}

function fillNote(note, title, body) {
    var title2 = document.createTextNode(title);
    var body2 = document.createTextNode(body);
    var titleBox = document.createElement("H1");
    titleBox.appendChild(title2);
    var exit = document.createElement("BUTTON");
    exit.id = "exitButton";

    note.appendChild(exit);
    note.appendChild(titleBox);
    note.appendChild(body2);

    exit.onclick = function() {deleteNote(note, exit);};
}

function deleteNote(note, exit) {
    var notebook = document.getElementById("noteblock");
    notebook.removeChild(note);
    notebook.removeChild(exit);
}

function showMenu() {
    document.getElementById("myDropdown").classList.toggle("show");
}