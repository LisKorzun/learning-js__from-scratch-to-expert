function simulateClick(event) {
    console.log(event.clientX, event.clientY);
    var ev = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        clientX: 200,
        clientY: 200
    });
    var cb = document.getElementById('checkbox'); //element to click on
    cb.dispatchEvent(ev);
}

function myCheckBoxClickHandler(event) {
    console.log(event.clientX, event.clientY);
    var confirmation = confirm('Are you sure?');
    if (!confirmation){
        event.target.checked = false;
    }
}

document.getElementById('button').addEventListener('click', simulateClick);
document.getElementById('checkbox').addEventListener('click', myCheckBoxClickHandler);