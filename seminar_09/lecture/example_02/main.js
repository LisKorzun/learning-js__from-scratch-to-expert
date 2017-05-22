(function (window, document) {
    'use strict';
    var init = function () {
        var syncButton = document.querySelector('.sync');
        var asyncButton = document.querySelector('.async');

        syncButton.addEventListener('click', makeSyncRequest);
        asyncButton.addEventListener('click', makeAsyncRequest.bind(asyncButton));
    };

    window.addEventListener('load', init);

    function makeSyncRequest() {
        // 1. Создаём новый объект XMLHttpRequest
        var xhr = new XMLHttpRequest();
        // 2. Конфигурируем его: GET-запрос на URL 'phones.json'
        xhr.open('GET', 'test.json', false);
        // 3. Отсылаем запрос
        xhr.send();
        // 4. Если код ответа сервера не 200, то это ошибка
        if (xhr.status != 200) {
            // обработать ошибку
            alert(xhr.status + ': ' + xhr.statusText); // пример вывода: 404: Not Found
        } else {
            // вывести результат
            alert(xhr.responseText); // responseText -- текст ответа.
        }
    }

    function makeAsyncRequest() {
        document.querySelector('.ajax-message').innerText = '';

        var xhr = new XMLHttpRequest();
        // 2. Конфигурируем его: GET-запрос на URL 'phones.json'
        xhr.open('GET', 'test.json', true);
        // 3. Отсылаем запрос
        xhr.send();

        xhr.onreadystatechange = function () { // (3)
            if (xhr.readyState != 4) return;

            this.classList.remove('is-loading');
            this.innerHTML = 'Success! Once more?';
            this.removeAttribute('disabled');

            if (xhr.status != 200) {
                alert(xhr.status + ': ' + xhr.statusText);
            } else {
                alert(xhr.responseText);
                if (xhr.responseText) {
                    try {
                        var ajaxData = JSON.parse(xhr.responseText);
                        if (ajaxData.message) {
                            document.querySelector('.ajax-message').innerText = ajaxData.message;
                        }
                    }
                    catch (err) {
                        alert('Bad data!');
                    }
                }
            }
        }.bind(this);

        this.classList.add('is-loading'); // (2)
        this.setAttribute('disabled', '');
    }

}(window, document));