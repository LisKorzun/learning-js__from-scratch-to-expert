# Предзащита проектов. Canvas - практикум
`25 июля 2017` | `08.30 - 11.20` | `ул. Скрыганова 14, эт. 5, ауд. 53/1`


* [demo for lesson](https://js-canvas.firebaseapp.com/)
* [clearRect()](https://developer.mozilla.org/ru/docs/Web/API/CanvasRenderingContext2D/clearRect)
* [beginPath()](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/beginPath)
* [strokeStyle](https://developer.mozilla.org/ru/docs/Web/API/CanvasRenderingContext2D/strokeStyle)
* [lineJoin](https://developer.mozilla.org/ru/docs/Web/API/CanvasRenderingContext2D/lineJoin)
* [moveTo()](https://developer.mozilla.org/ru/docs/Web/API/CanvasRenderingContext2D/moveTo)
* [lineTo()](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineTo)
* [stroke()](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/stroke)

```javascript
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

// цвет в формате, поддерживающимся стандартом CSS
context.strokeStyle = "#df4b26";
// скругляет углы засчет добавления сектора с центром в точке пересечения линий и радиусом равным толщине линии.
context.lineJoin = "round";
// толщина линий
context.lineWidth = 5;

context.canvas.width;
context.canvas.height;
context.canvas.offsetLeft;
context.canvas.offsetTop;

// очистить весь холст
context.clearRect(0, 0, canvas.width, canvas.height);

// стартует новый путь
context.beginPath();

// заканчивает путь
context.closePath();

// переносит перо в точку
context.moveTo(x, y);

// соединяет точки линией, но не рисует
context.lineTo(x, y);

// рисует учитывая текущие стили
context.stroke();
```
