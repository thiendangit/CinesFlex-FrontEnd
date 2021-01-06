import React, {memo} from "react";
import {Button, Text} from "@components";
import {StyleSheet} from "react-native";
import {formatMoney, scale} from "@common";
import {ShowTimeProps} from "@config/type";
import {ColorsCustom} from "@theme/color";
import {SpacingDefault} from "@theme/spacing";
import {deviceWidth} from "@utils";
import isEqual from "react-fast-compare";
import {FontSizeDefault} from "@theme/fontSize";

interface TimeItemProps {
    item: ShowTimeProps,
    index: string,
    onPressItem: (item: ShowTimeProps, index: string) => void
}

export const TimeItem = ({item, index, onPressItem}: TimeItemProps) => {
    return (
        <Button style={[styles.container, item.is_Selected ? {backgroundColor: ColorsCustom.lightBlue} : null]}
                onPress={() => onPressItem(item, index)}>
            <Text style={styles.dayText}>
                {item?.show_time}
            </Text>
            <Text style={styles.dayOfWeed}>
                {formatMoney(item?.price)} • 2D
            </Text>
        </Button>
    )
};

const styles = StyleSheet.create({
    container: {
        height: deviceWidth / 6,
        width: deviceWidth / 3.2,
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
        fontSize: FontSizeDefault.FONT_12,
        color: ColorsCustom.grey,
    }
});

export const timeItem = memo(TimeItem, isEqual);

