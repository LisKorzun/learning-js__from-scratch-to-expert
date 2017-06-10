#Firebase project
[Firebase Documentation](https://firebase.google.com/docs/)

:one: [Firebase](https://firebase.google.com/) -> Get Started -> Добавить проект -> Добавьте Firebase в свое веб-приложение (инициализация Firebase)

Cоздаем скелет проекта и инициализируем Firebase

Возможна инициализация и настройка отдельных Firebase JavaScript SDK:
`firebase-app` - The core firebase client (**required**).
`firebase-auth` - Firebase Authentication (optional).
`irebase-database` - The Firebase Realtime Database (optional).
`firebase-storage` - Cloud Storage (optional).
`firebase-messaging` - Firebase Cloud Messaging (optional).

Подключение отдельных компонентов:
```
<script src="https://www.gstatic.com/firebasejs/4.1.1/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/4.1.1/firebase-auth.js"></script>
<script src="https://www.gstatic.com/firebasejs/4.1.1/firebase-database.js"></script>
<script src="https://www.gstatic.com/firebasejs/4.1.1/firebase-messaging.js"></script>
```

:two: Устанавливаем Firebase CLI

[firebase-tools](https://www.npmjs.com/package/firebase-tools)

В директории с проектом:
```
npm install -g firebase-tools
npm install --save firebase   # (optional)
firebase login
firebase init
firebase serve   # Start development server
```

В корне проекта:
`firebase.json` - [The firebase.json file](https://firebase.google.com/docs/hosting/full-config)

Деплоим проект на хостинг:

```
firebase deploy
```

