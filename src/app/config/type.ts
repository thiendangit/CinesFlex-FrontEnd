import {Theme} from '@react-navigation/native';

export interface ResponseBase<T = any> {
    code: number;

    msg?: string | undefined | null;

    data?: T;

    status: boolean;
}

export interface Colors {
    primary: string;

    background: string;

    card: string;

    text: string;

    border: string;

    notification: string;

    error: string;

    info: string;
}

export interface ColorsCustomType {
    primary: string, // '#FF0074', //

    // navigation bar
    headerTintColor: string,

    // bottom tab bar
    tabbar: string,
    tabbarTint: string, // '#FF0074', //
    tabbarColor: string,
    white: string,
    lightWhite: string,
    purple: string,
    // wishlist
    heartActiveWishList: string,
    cured: string,
    // step indicate from the checkout page
    checkout: {
        stepActive: string,
    },

    // Product tabs
    product: {
        TabActive: string,
        TabDeActive: string,
        TabActiveText: string,
        TabText: string,
        BuyNowButton: string,
        OutOfStockButton: string,
        ViewBorder: string,
        price_shipping: string,
        Text: string,
        TextLight: string,
        TextDark: string,
        Price: string
    },

    // ////////////////////////////////////////////////////////////////////////////////
    // NOTE: THE BELOW COLOR MAY NOT RELATED TO YOUR REBRANDING & NOT COMMON STYLE
    // ////////////////////////////////////////////////////////////////////////////////

    // login screen color
    login: {
        facebook: string,
        google: string,
        sms: string,
    },

    category: {
        navigationBarColor: string,
        navigationBarIcon: string,
        navigationTitleColor: string,
    },

    // common
    error: string,
    accent: string,
    accentLight: string,
    blackTextPrimary: string,
    blackTextSecondary: string,
    blackTextDisable: string,

    lightTextPrimary: string,
    lightTextSecondary: string,
    lightTextDisable: string,

    lightDivide: string,
    blackDivide: string,
    background: string,
    DirtyBackground: string,

    // Text
    Text: string,
    spin: string,

    attributes: {
        black: string,
        red: string,
        green: string,
        blue: string,
        yellow: string,
    },

    lightGrey: string,
    darkOrange: string,
    darkYellow: string,
    yellow: string,
    darkRed: string,
    red: string,
    green: string,
    blue: string,
    lightBlue: string,
    blue1: string,
    blue2: string,

    starRating: string,
    backgroundFlashSales: [string, string],
    light_red: string,
    lime_green: string,
    grey: string
}

export interface FontSize {
    FONT_4: number;

    FONT_5: number;

    FONT_6: number;

    FONT_7: number;

    FONT_8: number;

    FONT_9: number;

    FONT_10: number;

    FONT_11: number;

    FONT_12: number;

    FONT_13: number;

    FONT_14: number;

    FONT_15: number;

    FONT_16: number;

    FONT_17: number;

    FONT_18: number;

    FONT_19: number;

    FONT_20: number;

    FONT_21: number;

    FONT_22: number;

    FONT_23: number;

    FONT_24: number;

    FONT_25: number;

    FONT_26: number;

    FONT_27: number;

    FONT_28: number;

    FONT_29: number;

    FONT_30: number;

    FONT_31: number;

    FONT_32: number;

    FONT_33: number;

    FONT_34: number;

    FONT_35: number;

    FONT_36: number;

    FONT_37: number;
}

export interface FontFamily {
    primary: any;
    secondary: any;
}

export interface Spacing {
    none: number;
    tiny: number;
    smaller: number;
    small: number;
    medium: number;
    mediumPlush: number;
    large: number;
    huge: number;
    massive: number;
}

export interface hitSlopValue {
    top: number,
    bottom: number,
    left: number,
    right: number
}

export interface HitSlop {
    hitSlop_5: hitSlopValue,
    hitSlop_10: hitSlopValue,
    hitSlop_15: hitSlopValue,
    hitSlop_20: hitSlopValue
}

export type AppTheme = Theme & { colors: Partial<Colors> };

export enum SLICE_NAME {
    APP = 'APP',
    LOGIN = 'LOGIN',
    REGISTER = 'REGISTER'
}

export interface tabItem {
    name: string,
    url: any,
    icon: any
}

export interface AppTab {
    mainTabs: any,
    subTabs: any
}

