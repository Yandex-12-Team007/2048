enum Routes {
    // Домашняя
    HOME = '/',
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
    FORUM_CARD = '/forum/:topicId/:card_id',
    // Профиль
    PROFILE = '/profile',
    // Ошибки
    ERROR = '/error/:num',
    ERROR_404 = '/error/404',
    ERROR_500 = '/error/500',
    // Правила
    RULES = '/rules'
}

export default Routes;
