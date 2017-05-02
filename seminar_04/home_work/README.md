# Задание 4
## ТЕОРИЯ

:one:  

* [Смотрим](https://www.youtube.com/watch?v=TL1ZWxtV47w&index=31&list=PL363QX7S8MfSxcHzvkNEqMYbOyhLeWwem)

*  Изучаем дополнительные ссылки к лекцииям данного [семинара](https://github.com/LisKorzun/learning-js__from-scratch-to-expert/blob/master/seminar_04/README.md).

:two: 

* Знакомимся с регулярными выражениями. Смотрим:[1](https://www.youtube.com/watch?v=9hLkbhRs7jM&list=PL363QX7S8MfSxcHzvkNEqMYbOyhLeWwem&index=28&t=478s),
читаем [Регулярные выражения](https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Regular_Expressions), [Регулярные выражения (пункты 1-5)](https://learn.javascript.ru/regular-expressions-javascript),
[Online regex tester(Тестер регулярных выражений, внизу справа есть подсказки)](https://regex101.com/)

* Знакомимся с одним на выбор CSS Framework-ом: [Bootstrap](http://getbootstrap.com/getting-started/) или [Bulma](http://bulma.io/documentation/overview/start/)

* Знакомимся с Sass [Sass guide(ru)](https://sass-scss.ru/guide/), [Установка, и знакомство](https://youtu.be/wKuGWmX1XPs)

## ПРАКТИКУМ:

:one: Доделываем предыдущее задание. Дополняем функционал:

* при наведении мыши на TD подсвечивать ячейку

* при клике на число календаря, предложить пользователю ввести строку (типа запланированное мероприятие на этот день)

* после ввода строка должна добавляться в виде `<li>` к ячейке, по которой кликнули. Eсли `<li>` первый - должен создаться `<ul>` автоматически. 
Внутри `<li>` со строкой должен быть span с буквой 'x' или иконкой закрытия/удаления. По клику по 'x' родительский `<li>` со строкой должен удалиться. 
Если `<li>` последний - должен удалиться `<ul>` автоматически.


:two: Используя один из CSS Framework-ов в html отобразить форму со следующими элементами:

* input - Label "Name"

* input - Label "Email"

* input - Label "Password"

* select - Label "Gender" - options (choose/male/female)

* textarea - Label "About yourself"

* checkbox - I agree to the terms and conditions

* button - Label "Register"

В JS добавить следующие валидаторы элементов:

"**Name**" - должен быть не менее 5 символов и содержать только латинские буквы, цифры и знак подчеркивания

"**Email**" - должен содержать символ @ и точку

"**Password**" - должен содержать не менее 5 гласных латинских символов, минимум 3 цифры

"**Gender**" - обязательно для выбора

"**About yourself**" - максимальная длинна 150 символов, когда набрано 150 символов подсветить бордер зеленым. 
Под textarea разместить span c текство "characters remaining: 150". При каждом добавлении/удалении символа в textarea количество в span должно уменьшаться либо увеличиваться.

"**checkbox**" - обязательно checked

"**Register**" - disabled пока все значения элементов не будут правильно введены. 
При нажатии на кнопку, значения из элементов форм в виде `Name: MyLongLongLongName` должны быть отображены внизу формы.

Фраза "terms and conditions" должна быть ссылкой на https://www.google.by, по клику по которой должна выводться в консоль фраза "Пока мы не придумали условия" и checkbox должен стать checked
