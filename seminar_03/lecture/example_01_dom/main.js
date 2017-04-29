window.onload = function () {
    // при загрузе получаем необходимые элементы
    var message = document.querySelector('textarea');
    var errorMessage = document.querySelector('.help');
    var button = document.getElementById('send');
    // проверяем, что нужно отображать
    checkTextArea();
    
    // для всего документа - добавить обработчик для события click
    document.addEventListener('click', function () {
        // функция будет вызываться при каждом клике по документу
        checkTextArea();
    });
    
    // проверяем введены ли данные
    // скрываем/отображаем необходимые элементы
    function checkTextArea() {
        if (message.value.length === 0) {
            errorMessage.style.display = 'block';
            button.style.display = 'none';
        } else {
            button.style.display = 'block';
            errorMessage.style.display = 'none';
        }
    }
};

