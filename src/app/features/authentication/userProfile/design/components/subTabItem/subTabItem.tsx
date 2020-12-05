import React, {memo} from "react";
import {Button, Img, Text} from "@components";
import {StyleSheet, View} from "react-native";
import {handleImage, scale, verticalScale} from "@common";
import {images} from "@assets/image";
import {AppTab, tabItem} from "@config/type";
import {ColorsCustom} from "@theme/color";
import {SpacingDefault} from "@theme/spacing";
import {deviceWidth} from "@utils";
import isEqual from "react-fast-compare";
import {SvgUri} from "react-native-svg";

interface subTabItemProps {
    item : tabItem,
    index : string,
    onPressItem : (item : tabItem) => void
}

export const subTabItem = ({item, index, onPressItem} : subTabItemProps) => {
    return (
        <View>
            {
                item.name !== "Logout" && item.url !== "logout" &&
                <Button onPress={() => onPressItem(item)} activeOpacity={1} style={styles.container}>
                    {item.icon ? <SvgUri
                        width="30"
                        height="30"
                        uri={handleImage(item.icon)}
                    /> : <Img style={styles.imageContainer}/>}
                    <Text numberOfLines={2} style={styles.menuName}>
                        {item.name}
                    </Text>
                </Button> || null
            }
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        height: deviceWidth / 3.7,
        width: deviceWidth / 3.7,
        borderRadius: scale(10),
        marginHorizontal: scale(10),
        marginTop: scale(15),
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

export const _subTabItem = memo(subTabItem, isEqual);

