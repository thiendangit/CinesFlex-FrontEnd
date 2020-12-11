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

interface ticketItemProps {
    numberTicket: number,
    onPressItem: (item: tabItem) => void
}

export const TicketItem = ({numberTicket, onPressItem}: ticketItemProps) => {
    return (
        <Block style={styles.container}>
            <Text style={styles.dayText}>
                {numberTicket} Ticket
            </Text>
        </Block>
    )
};

const styles = StyleSheet.create({
    container: {
        height: deviceWidth / 8,
        width: deviceWidth / 3.5,
        borderRadius: scale(20),
        marginVertical: scale(5),
        marginHorizontal: scale(10),
        alignItems: 'center',
        backgroundColor: ColorsCustom.product.ViewBorder,
        justifyContent: 'center',
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
        fontSize: FontSizeDefault.FONT_14,
        fontWeight: 'bold'
    },
    dayOfWeed: {
        color: ColorsCustom.grey,
    }
});

export const _ticketItem = memo(TicketItem, isEqual);

