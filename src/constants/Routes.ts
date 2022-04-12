enum Routes {
    // Домашняя
    HOME = '/',
    // Авторизация
    LOGIN = '/login',
    SIGNUP = '/signup',
    // Игра
    GAME = '/game',
    // Таблица лидеров
    LEADERBOARD = '/leaderboard',
    // Форум
    FORUM = '/forum',
    FORUM_THEME = '/forum/:theme_id',
    FORUM_CARD = '/forum/:theme_id/:card_id',
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
