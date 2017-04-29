window.onload = function () {
    var likeButton = getButton('Like', 'is-primary');
    var dislikeButton = getButton('Dislike', 'is-danger');

    var app = document.getElementById('app');
    app.appendChild(likeButton);
    app.appendChild(dislikeButton);

    app.addEventListener('click', function (ev) {
        if (ev.target.tagName === 'BUTTON') {
            if (ev.target.id) {
                increaseCounter(ev.target.id);
            }
        }
    });
};

/**
 * Замыкание - фабричный метод
 */
var getButton = (function () {
    var id = 1;

    return function (title, color) {
        var buttonEl = document.createElement('button');
        buttonEl.className = 'button';
        buttonEl.className += ' ' + color;
        buttonEl.innerText = title;
        buttonEl.setAttribute('id', 'button-' + id);
        id++;
        return buttonEl;
    }
}());

/**
 * Создание счетчика
 */
var createCounter = function () {
    var count = 0;

    return function (id) {
        var element = document.getElementById(id);
        if (element) {
            element.innerHTML = ++count;
        }
    }
};

var increaseCounter = (function () {
    var counters = {};
    return function (id) {
        if (!counters[id]) {
            counters[id] = {};
            counters[id].increase = createCounter();
        }
        counters[id].increase(id);
    }
}());
