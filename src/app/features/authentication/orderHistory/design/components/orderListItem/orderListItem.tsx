import React, {memo} from "react";
import {Block, Button, Img, Text} from "@components";
import {StyleSheet, TouchableOpacity} from "react-native";
import {handleImage, scale, verticalScale} from "@common";
import {ColorsCustom} from "@theme/color";
import {SpacingDefault} from "@theme/spacing";
import {deviceWidth} from "@utils";
import isEqual from "react-fast-compare";
import {FontSizeDefault} from "@theme/fontSize";

interface OrderListItemProps {
    item: any,
    index: string,
    onPressItem: (item: any) => void
}

let CONTAINER_HEIGHT = deviceWidth / 5;
let CONTAINER_WIDTH = deviceWidth / 1.1;


export const orderListItem = ({item, index, onPressItem}: OrderListItemProps) => {
    return (
        <Button onPress={() => onPressItem(item)} style={[styles.container, index == '0' ? {
            marginTop: scale(15)
        } : null]}>
            <Img style={{
                flex: 1,
                borderRadius: scale(5)
            }}
                 containerStyle={styles.imageContainer}
                 source={handleImage({
                     uri: 'https://quangcaongoaitroi.com/wp-content/u' +
                         'ploads/2020/02/quang-cao-tai-rap-chieu-phim-5.jpg'
                 })}/>
            <Block block alignSelf={"flex-start"} style={styles.rightViewContainer}>

            </Block>
        </Button>
    )
};

const styles = StyleSheet.create({
    container: {
        minHeight: CONTAINER_HEIGHT,
        width: CONTAINER_WIDTH,
        borderRadius: scale(10),
        marginHorizontal: scale(10),
        marginTop: scale(25),
        backgroundColor: 'white',
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    imageContainer: {
        height: CONTAINER_HEIGHT,
        width: CONTAINER_HEIGHT / 1.1,
    },
    menuName: {
        marginTop: verticalScale(5),
        color: ColorsCustom.grey
    },
    rightViewContainer: {
        marginLeft: CONTAINER_WIDTH / 3 + scale(20),
    },
    nameCinemas: {
        color: ColorsCustom.blue,
        fontSize: FontSizeDefault.FONT_17,
        fontWeight: '600'
    },
    detailsCinemas: {
        color: ColorsCustom.blackTextPrimary,
        fontSize: FontSizeDefault.FONT_13,
    }
});

export const _orderListItem = memo(orderListItem, isEqual);

