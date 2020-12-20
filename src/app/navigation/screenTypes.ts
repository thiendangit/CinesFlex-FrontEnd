export enum APP_SCREEN {
    UN_AUTHORIZE = 'UN_AUTHORIZE',
    SPLASH = 'SPLASH',
    LOGIN = 'LOGIN',
    REGISTER = 'REGISTER',
    AUTHORIZE = 'AUTHORIZE',
    START_UP = 'START_UP',
    CHOOSE_USER = 'CHOOSE_USER',
    MORE = 'MORE',
    REGISTER_DONE = 'REGISTER_DONE',
    USER_PROFILE = 'USER_PROFILE',
    HOME = 'HOME',
    CINEMAS = 'CINEMAS',
    PROMOTION = 'PROMOTION',
    FILM_DETAILS = 'FILM_DETAILS',
    BOOK_TICKET = 'BOOK_TICKET',
    CINEMAS_DETAILS = 'CINEMAS_DETAILS',
    BOOK_TICKET_RESULT = 'BOOK_TICKET_RESULT',
    FORGOT_PASSWORD = 'FORGOT_PASSWORD',
    ORDER_HISTORY = 'ORDER_HISTORY',
    FAVORITE_LIST = 'FAVORITE_LIST',
    CURRENT_SEE = 'CURRENT_SEE',
    LOGOUT = 'LOGOUT',
    PROMOTION_DETAILS = 'PROMOTION_DETAILS'
}

export type RootStackParamList = {
    [APP_SCREEN.UN_AUTHORIZE]: undefined;
    [APP_SCREEN.SPLASH]: undefined;
    [APP_SCREEN.LOGIN]: undefined;
    [APP_SCREEN.REGISTER]: undefined;
    [APP_SCREEN.AUTHORIZE]: undefined;
    [APP_SCREEN.HOME]: undefined;
    [APP_SCREEN.START_UP]: undefined;
    [APP_SCREEN.CHOOSE_USER]: undefined;
    [APP_SCREEN.MORE]: undefined;
    [APP_SCREEN.REGISTER_DONE]: undefined;
    [APP_SCREEN.FILM_DETAILS]: undefined;
    [APP_SCREEN.BOOK_TICKET]: undefined;
    [APP_SCREEN.CINEMAS_DETAILS]: undefined;
    [APP_SCREEN.BOOK_TICKET_RESULT]: undefined;
    [APP_SCREEN.PROMOTION_DETAILS]: undefined;
};
