window.onload = function () {
    var likeButton = document.createElement('button');
    likeButton.classList = 'button is-primary';
    likeButton.setAttribute('id', 'like');
    likeButton.innerText = 'Like';

    var dislikeButton = document.createElement('button');
    dislikeButton.className = 'button';
    dislikeButton.className += ' is-danger';
    dislikeButton.setAttribute('id', 'dislike');
    dislikeButton.innerText = 'Dislike';

    var app = document.getElementById('app');
    app.appendChild(likeButton);
    app.appendChild(dislikeButton);

    app.addEventListener('click', function (ev) {
        // фильтруем клики на общем блоке,
        // чтобы обрабатывать только те,
        // что сделаны по кнопкам
        if (ev.target.tagName === 'BUTTON') {
            // Если это кнопка и есть id - вызываем нужный обработчик
            if (ev.target.id) {
                increaseCounter(ev.target.id);
            }
        }
    });
};

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
