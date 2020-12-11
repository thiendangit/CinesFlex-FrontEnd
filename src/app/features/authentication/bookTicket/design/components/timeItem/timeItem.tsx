import React, {memo} from "react";
import {Block, Button, Text} from "@components";
import {StyleSheet} from "react-native";
import {scale, verticalScale} from "@common";
import {images} from "@assets/image";
import {tabItem} from "@config/type";
import {ColorsCustom} from "@theme/color";
import {SpacingDefault} from "@theme/spacing";
import {deviceWidth} from "@utils";
import isEqual from "react-fast-compare";
import {FontSizeDefault} from "@theme/fontSize";

interface subTabItemProps {
    item: any,
    index: string,
    onPressItem: (item: tabItem) => void
}

export const TimeItem = ({item, index, onPressItem}: subTabItemProps) => {
    return (
        <Block style={styles.container}>
            <Text style={styles.dayText}>
                17:30
            </Text>
            <Text style={styles.dayOfWeed}>
                $5.42 • 2D
            </Text>
        </Block>
    )
};

const styles = StyleSheet.create({
    container: {
        height: deviceWidth / 6,
        width: deviceWidth / 3.5,
        borderRadius: scale(20),
        marginVertical: scale(5),
        marginHorizontal: scale(10),
        alignItems: 'center',
        backgroundColor: ColorsCustom.product.ViewBorder,
        justifyContent: 'space-between',
        paddingVertical: scale(SpacingDefault.small),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    dayText: {
        fontSize: FontSizeDefault.FONT_22,
        fontWeight: 'bold'
    },
    dayOfWeed: {
        color: ColorsCustom.grey,
    }
});

export const timeItem = memo(TimeItem, isEqual);

