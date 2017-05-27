(function (window, document) {
    'use strict';
    var init = function () {
        var asyncButton = document.querySelector('.async');
        asyncButton.addEventListener('click', makeAsyncRequest.bind(asyncButton));

        var modal = document.querySelector('.modal');
        modal.addEventListener('click', function (e) {
            if (e.target.className.toLowerCase().indexOf('close') >= 0) {
                this.classList.remove('is-active');
            }
        });
    };

    window.addEventListener('load', init);

    function makeAsyncRequest() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q=Minsk&appid=f50e59e911cadf489905d945e109b23e&lang=ru&units=metric', true);
        xhr.send();

        xhr.onreadystatechange = function () {
            if (xhr.readyState != 4) return;

            this.classList.remove('is-loading');
            this.innerHTML = 'Обновить еще раз?';
            this.removeAttribute('disabled');

            if (xhr.status != 200) {
                console.error(xhr.status + ': ' + xhr.statusText);
            } else {
                if (xhr.responseText) {
                    try {
                        var ajaxData = JSON.parse(xhr.responseText);
                    }
                    catch (err) {
                        alert('Bad data!');
                    }
                    if (ajaxData && ajaxData.name && ajaxData.main && ajaxData.main.temp) {
                        showModalWithWhetherData.call(ajaxData);
                    }
                }
            }
        }.bind(this);

        this.classList.add('is-loading');
        this.setAttribute('disabled', '');
    }

    function showModalWithWhetherData() {
        document.querySelector('.modal-card-title').innerText = 'Сейчас в ' + this.name;
        var description = this.main.temp > 0 ? '+' : this.main.temp < 0 ? '-' : '';
        description += this.main.temp;
        document.querySelector('.modal-card-body').innerText = description;
        document.querySelector('.modal').classList.add('is-active');
    }

}(window, document));