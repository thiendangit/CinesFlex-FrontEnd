export const images = {
    bg_wallpaper: require('./source/bg.png'),
    default: require('./source/default.png'),
    IconCategory: require("./icons/icon-category.png"),
    IconHeart: require("./icons/icon-heart.png"),
    IconOrder: require("./icons/icon-cart2.png"),
    IconNews: require("./icons/icon-news.png"),
    IconSearch: require("./icons/icon-search.png"),
    AppIcon: require("./app_icons/appIcon.png"),
    SupplierIcon: require("./supplier_icons/supplier.png"),
    BuyerIcon: require("./buyer_icons/buyer.png"),
    bg_wallpaper_login: require("./source/bg_login.png"),
    bg_header: require("./source/header_bg.png"),
    eye_off: require("./eye_icons/eye_off.png"),
    eye_on: require("./eye_icons/eye_on.png"),
    home: require("./tabBar_icons/home.png"),
    cinemas: require("./tabBar_icons/cinemas.png"),
    promotion: require("./tabBar_icons/promotion.png"),
    user: require("./tabBar_icons/user.png"),
    checkDone: require("./icons/checkDone.png"),
};

export type ImageTypes = keyof typeof images;
