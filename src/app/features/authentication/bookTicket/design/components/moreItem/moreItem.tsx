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
import {FontSizeDefault} from "@theme/fontSize";

interface subTabItemProps {
    item : any,
    index : string,
    onPressItem : (item : tabItem) => void
}

export const CornItem = ({item, index, onPressItem} : subTabItemProps) => {
    return (
        <Block>
            <Button style={styles.container}>
                <Text style={styles.dayOfWeed}>
                    Tue
                </Text>
                <Text style={styles.dayText}>
                    18
                </Text>
            </Button>
        </Block>
    )
};

const styles = StyleSheet.create({
    container: {
        flex : 1,
        height: deviceWidth / 3.7,
        width: deviceWidth/2,
        borderRadius: scale(20),
        marginVertical: scale(5),
        marginHorizontal : scale(10),
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
    dayText : {
        marginTop : scale(5),
        fontSize : FontSizeDefault.FONT_24,
        fontWeight : 'bold'
    },
    dayOfWeed : {
        color : ColorsCustom.grey,
        marginBottom : scale(5)
    }
});

export const cornItem = memo(CornItem, isEqual);

