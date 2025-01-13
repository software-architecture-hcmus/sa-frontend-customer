// backend url

const Url = {
    // LOGIN: "/login",
    // REGISTER: "/register",
    // will be added later
    GET_EVENTS: "/api/v1/events",
    GET_EVENT_DETAIL: "/api/v1/events/:id",
    SUBSCRIBE_EVENT: "/api/v1/events/subscribe",
    UNSUBSCRIBE_EVENT: "/api/v1/events/unsubscribe",
    GET_MY_FAVOURITE_EVENTS: "/api/v1/favourites/customer/:id",
    GET_MY_NOTIFICATIONS: "/api/v1/notifications/account/:id",
    GET_GAMES_OF_EVENT: "/api/v1/games/event/:id",
    CREATE_VOUCHER_FOR_QUIZ_GAME: "/api/v1/vouchers/quiz",
    GET_GAME_TURN:"/api/v1/games/turn/:id",
    UPDATE_GAME_TURN:"/api/v1/games/turn",
    UPDATE_SCORE_GAME:"/api/v1/games/score",
    CREATE_VOUCHER_FOR_FLAPPY_BIRD: "/api/v1/vouchers/flappy-bird"
}

export default Url;