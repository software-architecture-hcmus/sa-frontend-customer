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
}

export default Url;