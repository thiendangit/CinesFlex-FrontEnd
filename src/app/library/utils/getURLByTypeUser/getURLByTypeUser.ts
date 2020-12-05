import {Constants} from "@common";


export const getUrlByTypeUser = (userType : string) => {
    if (userType) {
        if (userType === Constants.ROLE.SUPPLIER) {
            return  Constants.ROLE_FULL_NAME.SUPPLIER
        } else if (userType === Constants.ROLE.BUYER) {
            return Constants.ROLE_FULL_NAME.BUYER
        } else {
            return Constants.ROLE_FULL_NAME.BUYER_ADMIN
        }
    }
}
