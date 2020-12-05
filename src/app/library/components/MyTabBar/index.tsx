import {View, StyleSheet, TouchableOpacity, Image, ImageRequireSource, Text} from 'react-native';
import React, {useEffect} from "react";
import {deviceWidth} from "@library/utils";
import {images, ImageTypes} from "@assets/image";
import {ColorsCustom} from '@theme/color';
import {handleImage, scale, verticalScale} from "@common";
import {AppTab, AppTheme, tabItem} from "@config/type";
import {Img} from "@library/components";
import { useSafeArea } from 'react-native-safe-area-context';
import {isIphoneX} from "@library/checkIphoneX/isIphoneX";

interface tabBarProps {
    state: any,
    descriptors: any,
    navigation: any,
}

const index = ({state, descriptors, navigation}: tabBarProps) => {
        const focusedOptions = descriptors[state.routes[state.index].key].options;

        if (focusedOptions.tabBarVisible === false) {
            return null;
        }

        const insetsBottom : number = useSafeArea().bottom;

        const renderRouter = (array: any): any => {
            const handleImageRoute = (routeName: string): ImageTypes => {
                if (routeName === 'Home') {
                    return images.home
                } else if (routeName === 'Cinemas') {
                    return images.cinemas
                } else if (routeName === 'Promotion') {
                    return images.promotion
                } else
                    return images.user
            };
            return (
                <View style={[styles().viewContainer]}>
                    {
                        array.routes.map((route: any, index: number): any => {
                            console.log({route});
                            if (route) {
                                const {options} = descriptors[route.key];

                                const label =
                                    options.tabBarLabel !== undefined
                                        ? options.tabBarLabel
                                        : options.title !== undefined
                                        ? options.title
                                        : route.name;

                                const isFocused = state.index === index;

                                const onPress = (index: number) => {
                                    const event = navigation.emit({
                                        type: 'tabPress',
                                        target: route.key,
                                        canPreventDefault: true,
                                    });

                                    if (!isFocused && !event.defaultPrevented) {
                                        navigation.navigate(route.name);
                                    }
                                };

                                const onLongPress = () => {
                                    navigation.emit({
                                        type: 'tabLongPress',
                                        target: route.key,
                                    });
                                };

                                const color = isFocused ? ColorsCustom.lime_green : ColorsCustom.lightGrey;

                                return (
                                    <TouchableOpacity
                                        key={index.toString()}
                                        activeOpacity={1}
                                        accessibilityLabel={options.tabBarAccessibilityLabel}
                                        testID={options.tabBarTestID}
                                        onPress={() => onPress(index)}
                                        style={[styles().buttonContainer, index % 2 ? {} : {}]}
                                        onLongPress={onLongPress}
                                    >
                                        <View style={styles().imageContainer}>
                                            {isFocused ?
                                                <View style={[
                                                    styles().indicator,
                                                    {backgroundColor: color}
                                                ]}>
                                                </View>
                                                : null}
                                            <Img
                                                source={handleImageRoute(route.name)}
                                                resizeMode={'contain'}
                                                style={[styles().icon]}/>
                                            <Text
                                                numberOfLines={2}
                                                style={[isFocused ? {color: color} : {color: ColorsCustom.grey}, {top: verticalScale(2)}]}>
                                                {label}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                );
                            }
                        })
                    }
                </View>
            )
        };

    let _;
    return (
            <View style={[styles( _ , insetsBottom).container]}>
                {renderRouter({routes: [state.routes[0], state.routes[1], state.routes[2], state.routes[3]]})}
                <View style={{height : insetsBottom , width : deviceWidth}}/>
            </View>
        );
    }
;

export const styles = (theme?: AppTheme, insetsBottom? : number) =>
    StyleSheet.create({
    container: {
        height: !isIphoneX() ? verticalScale(55 + insetsBottom!) : verticalScale(55),
        width: deviceWidth,
        backgroundColor: ColorsCustom.lightWhite,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    buttonContainer: {
        flexGrow: 1,
        width: deviceWidth / 5.5,
        justifyContent: 'center',
        borderRadius: verticalScale(55 / 2),
    },
    viewContainer: {
        width: deviceWidth,
        flexDirection: 'row',
        // alignItems: 'center',
        height: verticalScale(55),
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        height: verticalScale(52),
    },
    indicator: {
        position: 'absolute',
        top: verticalScale(0),
        height: verticalScale(2),
        width: scale(12),
    },
    icon: {
        height: verticalScale(25),
        width: scale(25),
    }
});

export default index;
