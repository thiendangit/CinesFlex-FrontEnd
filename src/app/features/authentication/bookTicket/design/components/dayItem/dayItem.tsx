import React, {memo} from "react";
import {Block, Button, Text} from "@components";
import {StyleSheet} from "react-native";
import {scale} from "@common";
import {ShowTimeProps} from "@config/type";
import {ColorsCustom} from "@theme/color";
import {SpacingDefault} from "@theme/spacing";
import {deviceWidth} from "@utils";
import isEqual from "react-fast-compare";
import {FontSizeDefault} from "@theme/fontSize";

interface subTabItemProps {
    item: ShowTimeProps,
    index: string,
    onPressItem: (item: ShowTimeProps, index: string) => void
}

export const DayItem = ({item, index, onPressItem}: subTabItemProps) => {
    return (
        <Block>
            <Button style={[styles.container, item.is_Selected ? {backgroundColor: ColorsCustom.lightBlue} : null]}
                    onPress={() => onPressItem(item, index)}>
                <Text style={styles.dayOfWeed}>
                    {item?.day_of_week}
                </Text>
                <Text style={styles.dayText}>
                    {item?.day}
                </Text>
            </Button>
        </Block>
    )
};

const styles = StyleSheet.create({
    container: {
        height: deviceWidth / 3.7,
        width: deviceWidth / 5,
        borderRadius: scale(20),
        marginVertical: scale(5),
        marginHorizontal: scale(10),
        alignItems: 'center',
        backgroundColor: ColorsCustom.product.ViewBorder,
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
    dayText: {
        marginTop: scale(5),
        fontSize: FontSizeDefault.FONT_24,
        fontWeight: 'bold'
    },
    dayOfWeed: {
        color: ColorsCustom.grey,
        marginBottom: scale(5)
    }
});

export const dayItem = memo(DayItem, isEqual);

