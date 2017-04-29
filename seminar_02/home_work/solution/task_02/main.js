// Объявляем константы
var DAY_NAMES = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
var MONTH_NAMES = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];

// Запрашиваем валидные данные у пользователя
var month = getUserMonth();
var year = getUserYear();

// Если данные не валидны
if (!month || !year) {
    alert('Вообщем, ты сам не захотел календарик!');
} else {
    // Генерируем календарь
    var calendar = '<div class="container">' +
        '<h1 class="title is-1">' + MONTH_NAMES[month - 1] + ' ' + year + '</h1>' +
        '<table class="table is-striped">' + getHeader() + getCalendar() + '</table></div>';
    document.write(calendar);
}

/**
 * Генерируем названия дней (заголовок) таблицы
 * @returns {String}
 */
function getHeader() {
    var header = '<thead><tr>';
    for (var i = 0; i < 7; i++) {
        header += '<th>' + DAY_NAMES[i] + '</th>';
    }
    header += '</tr></thead>';
    return header;
}

/**
 * Генерируем тело таблицы
 * @returns {String}
 */
function getCalendar() {
    // узнаем количество дней в месяце
    var numberOfDays = new Date(year, month, 0).getDate();
    // узнаем первый день в неделе
    var firstDay = new Date(year, month - 1, 1).getDay();
    // счетчик дней
    var dayCounter = 1;
    // первая неделя
    var firstLine = true;
    var calendar = '<tbody>';
    // запускаем бесконечный цикл
    while (true) {
        // рендерим строки таблицы
        calendar += '<tr>';
        for (var i = 1; i <= 7; i++) {
            // если первая строка, то рендерим дни только, если номер ячейки больше firstDay
            // в противном - пустые ячейки
            // если не первая строка, то рендерим дни до тех пор, пока dayCounter меньше дней в месяце
            // в противном - рендерим пустые ячейки до конца строки
            if ((firstLine && i >= firstDay) || (!firstLine && dayCounter <= numberOfDays)) {
                calendar += '<td>' + dayCounter + '</td>';
                // каждый раз как день рендерится - увеличиваем наш счетчик дней
                dayCounter++;
            } else {
                calendar += '<td></td>';
            }
        }
        calendar += '</tr>';
        // если дошли сюда, значит первая строка уже отрендерилась
        firstLine = false;
        // выходим из бесконечного цикла, если отрисовались все дни
        if (dayCounter >= numberOfDays) {
            break;
        }
    }
    calendar += '</tbody>';
    return calendar;
}

/**
 * Возвращает валидный месяц или null
 * @returns {String|null}
 */
function getUserMonth() {
    var month = null;
    var condition = true;

    do {
        month = prompt('Введите номер месяца');
        // если пользователь закрыл окно
        if (month === null) {
            break;
        }
        condition = (!isNaN(month) && month > 0 && month < 13);
    } while (!condition);
    return month;
}

/**
 * Возвращает валидный год или null
 * @returns {String|null}
 */
function getUserYear() {
    var year = null;
    var condition = true;

    do {
        year = prompt('Введите год от 1800 до 2017');
        if (year === null) {
            break;
        }
        condition = (!isNaN(year) && year > 1799 && year < 2018);
    } while (!condition);
    return year;
}