# Игра 2048

## Полезные ссылки :
- [Макет в Figma](https://www.figma.com/files/team/1090687441741906303/Barcelona-007?fuid=606444840848690880)
- [Гайд по .md](https://github.com/GnuriaN/format-README)
- [Ифнормация о приложение](https://disk.yandex.ru/d/JmLwXRMgqO2FFw)
- [Задеплоенная версия на heroku](https://barcelona-007.herokuapp.com/)

## Инструменты разработки
- Пакетный менеджер : `npm`
- Вид компонентов : `Функциональные компоненты`
- CSS : `PostCSS + Autoprefixer + postcss-nested`
- ОС команды : `MacOS, Linux`
- Настроить `.env` файл

### Пример `.env` файла
```dotenv
PORT=5500

DB_NAME=game
DB_USER=serveruser
DB_PASSWORD=l!j@cneg
DB_HOST=postgres
DB_PORT=5432
DB_PORT_FORWARDING=54321

PG_ADMIN_EMAIL=admin@admin.com
PG_ADMIN_PASSWORD=secret
PG_ADMIN_PORT=88
PG_ADMIN_PORT_FORWARDING=8888
```

## Команды для разработки :
`dev` - запуск сервера разработки webpack-dev-server
`build` - собираем webpack-ом приложение в dist
`start` - Запускаем express на раздачу статики с dist
`eslint` - Запускаем линтер
`eslintFix` - Запускаем линтер с флагом --fix 
`stylelint` - Запускаем css линтер
`stylelintFix` - Запускаем css линтер с флагом --fix
`prepare` - Проверяет установлен ли husky
`pre-commit` - Выполняется перед коммитом

## О игре :

### Цель
1. Игрок побеждает если ему удается собрать квадрат со значением 2048
1. Соревнование за первое место в рейтинге

### Алгоритм игры
1. Кубики смещаются по направлению выбранному пользователем
1. Если по направлению смещения квадрат A и B имеют одинаковое значение, то квадрат A удаляется, а у квадрата B значение увеличивается вдвое
1. Если по направлению смещения граница поля / либо нет свободного пространства - квадрат остается на месте
1. После каждого смещения в случайной свободной клетке появляется новый квадрат со значение 2, реже 4
1. Если ни 1 кубик не может сместиться по выбранному пользователем направлению - ход не засчитывается, новый квадрат не появляется
1. После каждого хода, идет обновление текущего счета игрока, если счет > рекорда - перезаписываем
1. При достижении квадрата со значением 2048 - вывести сообщение с поздравлением с победой. В дальнейшем так же можно сделать кнопку продолжить, для трайхардеров =)
1. Если все поля заполнены, без возможности выполнить смещение - игра заканчивается.


### Реализация игры

[Ссылка на китайски клон :](https://github.com/channingbreeze/games/tree/master/2048)

1. Создать страницу game :
    1. TODO : Тут описание страницы
1. Создать компонент Field (Поле)
    1. TODO : Тут описание Поля
1. Создать компонент Square(квадрат)
    1. TODO : Тут описание кубика
1. TODO : Подумать кто будет отвечать за анимацию перестановок 
1. TODO : Field будет хранить в себе логику, либо придумаем что-то похитрее =)   

Цвета цифр от Китайцев :

```json
{
  "2": 4830388,
  "4": 5092724,
  "8": 7910480,
  "16": 12895074,
  "32": 13542214,
  "64": 14518104,
  "128": 12546483,
  "256": 10449343,
  "512": 7439295,
  "1024": 7454639,
  "2048": 16743552
}
```

Рандом 4 от Китайцев :
TODO : В оригинале по ощущениям ~ 25% на 4

```javascript
var value = 2;
if(Math.random() > 0.5) {
  value = 4;
}
```

Кнопки клавиатуры от Китайцев :
TODO: Позже начать отлавливать свапы с телефона

```javascript
self.DIRECTION_UP = 1;
self.DIRECTION_DOWN = 2;
self.DIRECTION_LEFT = 4;
self.DIRECTION_RIGHT = 8;
self.DIRECTION_UP_RIGHT = 16;
self.DIRECTION_UP_LEFT = 32;
self.DIRECTION_DOWN_RIGHT = 64;
self.DIRECTION_DOWN_LEFT = 128;
```

## Авторизация
TODO : Мы сами реализуем, или используем API ?

### Требования к форме авторизации :

[Будем ссылаться на требования практикума :](https://practicum.yandex.ru/learn/middle-frontend/courses/9452e5b3-e10d-43cb-bb57-d8a001a66f5c/sprints/9717/topics/5853f9ac-f416-46a6-b22d-e06d250ae9ff/lessons/68e240b8-c290-42e4-8247-4afe061f9801/)

## Профиль

### Требования к форме профиля :

[Будем ссылаться на требования практикума :](https://practicum.yandex.ru/learn/middle-frontend/courses/9452e5b3-e10d-43cb-bb57-d8a001a66f5c/sprints/9717/topics/5853f9ac-f416-46a6-b22d-e06d250ae9ff/lessons/68e240b8-c290-42e4-8247-4afe061f9801/)

## Форум

[Пример форума :](https://4pda.to/forum/index.php?act=idx)

### Структура 

Группа - Раздел - Тема

**например :**
1. IOS
    1. Скупка
        1. Астрахань
        1. Москва
    1. Ремонт
        1. Ремонт от мастера
1. Андроид
    1. Huavei
        1. Где купить ?

### Возможности форума

1. Экранная форма Группы - Раздела
1. Экранная форма Раздела - Темы
1. Экранная форма карточки Темы
1. Возможность создать новую тему
1. Возможность написать ответ в созданную тему
    1. TODO: Тут можно нехило расширить смайликами, ответами и тд
