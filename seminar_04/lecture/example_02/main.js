var elements = document.querySelectorAll('form,div,p');

for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener("click", handler);
}

function handler() {
    alert(this.tagName);
}