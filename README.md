[![reactjs](https://img.shields.io/badge/reactjs-%23239120.svg?&style=for-the-badge&logo=css3&logoColor=white)](https://reactjs.org)
[![redux](https://img.shields.io/badge/redux-%23239120.svg?&style=for-the-badge&logo=css3&logoColor=white)](https://redux.js.org/)
[![scss](https://img.shields.io/badge/scss-%23239120.svg?&style=for-the-badge&logo=css3&logoColor=white)](https://sass-scss.ru/)
[![mongoose](https://img.shields.io/badge/mongoose-%23239120.svg?&style=for-the-badge&logo=css3&logoColor=white)](https://mongoosejs.com/)
![node-current](https://img.shields.io/badge/node-14.x-23239120)
![es](https://img.shields.io/badge/ES-2020-green)
![CI](https://github.com/iibadreeva/mongoose-react/workflows/CI/badge.svg?branch=main)

## Описание
Мини магазин книг с админкой

## Установка и использование
- npm install — скачиваем пакеты, и в папке client ;
- npm run dev — запуск сервера и клиента;

## Что сделано
- Бэкенд - описан с помощью `MongoDB ` и `mongoose`
- Фротнтенд - с использование `react`
- Код стайлинг: `prettier`, `eslint`;
- Настроен Webpack:
    - html: `HtmlWebpackPlugin`
    - обработка css: `css-loader`, `style-loader`, `sass-loader`, `csso-webpack-plugin`
    - сборка JS: `babel`
- Реализована авторизация
- Реализована logout
- Регистрирет пользователя другой пользователель ( пока любой для теста), возможно изменить с ролью админа (добавлены роли )
- Создание админки в которой можно создавать книги
- Реализованы страницы:
    - Главная
    - Текущим каталогом (книги)
    - Авторизация
    - Страница профиля
    - Создание книг
    - Просмотр созданных книг ( текущим пользователем)
    - Редактирование книг (текущим пользователя)
    - Создание нового пользователя
