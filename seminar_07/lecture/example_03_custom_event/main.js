function myBlurHandler(event) {
    var message = event.target.value || null;
    var ev = new CustomEvent('receiveHello', {
        detail: {
            messageHello: message
        },
        bubbles: true
    });
    event.target.value = '';
    var el = document.getElementById('hello-receiver');
    el.dispatchEvent(ev);
}

function helloReceiverHandler(event) {

    if (event.detail.messageHello) {
        event.target.value = event.detail.messageHello;
    } else {
        alert('You sent me nothing :(!');
    }
}

document.getElementById('hello-sender').addEventListener('blur', myBlurHandler);
document.getElementById('hello-receiver').addEventListener('receiveHello', helloReceiverHandler);
