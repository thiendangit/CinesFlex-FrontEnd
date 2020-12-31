import React, {memo} from 'react';
import Clipboard from '@react-native-community/clipboard';
// @ts-ignore
import isEqual from 'react-fast-compare';
import {APP_SCREEN} from '@navigation/screenTypes';
import {Block, Button, IconBack, Img, Screen, Text} from "@components"
import {NavigationService} from "@navigation/navigationService";
import {formatDateToDDMMYYYY, scale, toast, verticalScale} from "@common";
import {deviceHeight, deviceWidth} from "@utils";
import {Animated, ScrollView, StatusBar} from "react-native";
import {PromotionItemProps} from "@features/unAuthentication/promotion/design";
import LinearGradient from "react-native-linear-gradient";
import {FontSizeDefault} from "@theme/fontSize";
import {ColorsCustom} from "@theme/color";
import {SharedElement} from 'react-navigation-shared-element';

interface leftTabOption {
    title: string
}

export interface Props {
    route: {
        params: {
            item: PromotionItemProps
        }
    },
}

const BACKGROUND_HEIGHT = deviceHeight / 1.6;
const BACKDROP_HEIGHT = deviceHeight - (BACKGROUND_HEIGHT / 1.8);

export const PromotionDetailsScreen = (props: Props) => {

    let item = props.route.params?.item ?? null;

    const onPressBack = () => {
        NavigationService.goBack()
    };


    return (
        <ScrollView bounces={false} style={{flex: 1, backgroundColor: 'white'}}>
            <Block style={{
                height: BACKDROP_HEIGHT,
                width: deviceWidth,
                position: 'absolute',
                backgroundColor: 'white'
            }}>
                <StatusBar hidden={true}/>
                <SharedElement id={`item.${item.id}.photo`}>
                    <Animated.View
                        removeClippedSubviews={false}
                        style={{
                            position: 'absolute',
                            width: deviceWidth,
                            height: BACKDROP_HEIGHT,
                            overflow: 'hidden',
                        }}
                    >
                        <Img
                            resizeMode={'cover'}
                            source={{uri: item.image ?? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBaFa2HbWkziCUVIl81KVljzNRb4Cfs7eYXg&usqp=CAU'}}
                            style={{
                                width: deviceWidth,
                                height: BACKDROP_HEIGHT,
                                position: 'absolute',
                            }}
                        />
                    </Animated.View>
                </SharedElement>
                <LinearGradient
                    colors={['rgba(0, 0, 0, 0)', 'white']}
                    style={{
                        height: BACKDROP_HEIGHT,
                        width: deviceWidth,
                        position: 'absolute',
                        bottom: 0,
                    }}
                />
            </Block>
            <Block marginTop={BACKDROP_HEIGHT + scale(20)}>
                <Text style={{
                    color: ColorsCustom.light_red,
                    fontSize: FontSizeDefault.FONT_14,
                    marginTop: scale(5),
                    paddingHorizontal: scale(10),
                }}>
                    {formatDateToDDMMYYYY(item.date_end)}
                </Text>
                <Text style={{
                    fontSize: FontSizeDefault.FONT_14,
                    paddingHorizontal: scale(10),
                    marginTop: scale(5)
                }}>
                    {item.description}
                </Text>
                <Button
                    onPress={() => {
                        Clipboard.setString(item?.vouchers[0].reference);
                        toast('Copy code success!')
                    }}
                    style={{
                        borderColor: ColorsCustom.blue,
                        borderWidth: 1,
                        width: deviceWidth / 3,
                        marginTop: scale(20),
                        marginBottom: scale(20),
                        alignSelf: 'center',
                        borderRadius: scale(5)
                    }}>
                    <Text>
                        {item?.vouchers[0].reference}
                    </Text>
                </Button>
            </Block>
            <IconBack containerStyle={{marginTop: verticalScale(20)}} onPress={onPressBack}/>
        </ScrollView>
    );
};

PromotionDetailsScreen.sharedElements = (route: any, otherNavigation: any, showing: any) => {
    const item = route.params?.item;
    return [`item.${item.id}.photo`];
};

export default memo(PromotionDetailsScreen, isEqual);
