enum Routes {
    // Домашняя
    HOME = '/',
    HOME_FOR_SERVER_AUTH = '^/$',
    // Авторизация
    LOGIN = '/login',
    REGISTRATION = '/registration',
    // Игра
    GAME = '/game',
    // Таблица лидеров
    LEADERBOARD = '/leaderboard',
    // Форум
    FORUM = '/forum',
    FORUM_THEME = '/forum/:topicId',
    // Профиль
    PROFILE = '/profile',
    // Ошибки
    ERROR = '/error/:num',
    // TODO: Пока так сделаем
    ERROR_FOR_SERVER_AUTH = '/error/',
    ERROR_404 = '/error/404',
    ERROR_500 = '/error/500',
    // Правила
    RULES = '/rules'
}

export default Routes;
