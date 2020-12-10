import React, {memo} from "react";
import {Block, Button,Text} from "@components";
import {StyleSheet} from "react-native";
import {scale, verticalScale} from "@common";
import {images} from "@assets/image";
import {tabItem} from "@config/type";
import {ColorsCustom} from "@theme/color";
import {SpacingDefault} from "@theme/spacing";
import {deviceWidth} from "@utils";
import isEqual from "react-fast-compare";

interface subTabItemProps {
    item : tabItem,
    index : string,
    onPressItem : (item : tabItem) => void
}

export const TimeItem = ({item, index, onPressItem} : subTabItemProps) => {
    return (
        <Block>
            <Button style={styles.container}>

            </Button>
        </Block>
    )
};

const styles = StyleSheet.create({
    container: {
        height: deviceWidth / 3.7,
        width: deviceWidth / 5,
        borderRadius: scale(10),
        marginVertical: scale(5),
        marginHorizontal : scale(10),
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'space-between',
        paddingVertical: scale(SpacingDefault.mediumPlush),
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
        bottom : verticalScale(2),
        height: scale(28),
        width: scale(28),
    },
    menuName: {
        marginTop: verticalScale(5),
        color: ColorsCustom.grey
    }
});

export const timeItem = memo(TimeItem, isEqual);

