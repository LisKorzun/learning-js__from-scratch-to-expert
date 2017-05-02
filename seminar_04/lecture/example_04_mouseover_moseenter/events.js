// $('#my-div').bind("mouseover mouseenter", function (e) {
//     var el = $("#" + e.type);
//     var n = + el.text();
//     el.text(++n);
// });

document.getElementById('my-div').addEventListener('mouseover', function (event) {
    var el = document.getElementById(event.type);
    var n = + el.innerText;
    el.innerText = ++n;
});

document.getElementById('my-div').addEventListener('mouseenter', function (event) {
    var el = document.getElementById(event.type);
    var n = + el.innerText;
    el.innerText = ++n;
});