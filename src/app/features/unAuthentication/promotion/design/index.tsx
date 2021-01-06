import React, {memo, useEffect, useRef, useState} from 'react';
// @ts-ignore
import {StackScreenProps} from '@react-navigation/stack';
import isEqual from 'react-fast-compare';
import {RootStackParamList, APP_SCREEN} from '@navigation/screenTypes';
import {Block, Button, Header, Img, Screen, Wallpaper} from "@components"
import {ColorsCustom} from "@theme/color";
import {styles} from "@features/unAuthentication/promotion/design/style";
import {images} from "@assets/image";
import {deviceHeight, deviceWidth} from "@utils";
import {dispatch, handleImage, scale} from "@common";
import {Animated, FlatList, Platform, ScrollView, StyleSheet, TouchableOpacity} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import {NavigationService} from "@navigation/navigationService";
import {SharedElement} from 'react-navigation-shared-element';
import {actionsPromotion} from "@features/unAuthentication/promotion/redux/reducer";
import {useSelector} from "react-redux";
import {RootState} from "@store/allReducers";
import {FilmProps} from "@features/unAuthentication/home/design";
import {URL_IMAGE} from "@networking";

type MoreProps = StackScreenProps<RootStackParamList, APP_SCREEN.HOME>;

interface VoucherProps {
    "id": string,
    "promotion_id": string,
    "reference": string,
    "title": string,
    "value": number,
    "type": number,
    "status": number
}

export interface PromotionItemProps {
    id: string,
    images: {
        id: string
        updated_at: string
        url: string
    }[],
    "title": string,
    "description": string,
    "date_begin": string,
    "date_end": string,
    "type": number,
    "status": number,
    "vouchers": VoucherProps[]
}

const BACKGROUND_HEIGHT = deviceHeight / 1.6;
const LIST_ITEM_HEIGHT = deviceHeight - (BACKGROUND_HEIGHT / 1.3);
const ITEM_SIZE = Platform.OS === 'ios' ? deviceWidth * 0.85 : deviceWidth * 0.85;
const SPACING = scale(10);
const BACKDROP_HEIGHT = deviceHeight * 0.7;

export const PromotionScreen = ({navigation, route}: MoreProps) => {

    const scrollHorizontalX = useRef<any>(new Animated.Value(0)).current;
    const [dataSource, setDataSource] = useState<PromotionItemProps[]>([]);
    let URL_DOMAIN = useSelector(
        (state: RootState) => state.app?.appUrl
    );

    useEffect(() => {
        dispatch(actionsPromotion.getListPromotion(`${URL_DOMAIN}promotions`, (result) => {
            console.log({result});
            if (result?.data?.data) {
                setDataSource(result?.data?.data)
            }
        }));
    }, []);

    const handleOnPressBanner = (item: PromotionItemProps) => {
        NavigationService.push(APP_SCREEN.PROMOTION_DETAILS, {item})
    };

    const Backdrop = ({item, scrollX}: any) => {
        return (
            <Block style={{height: BACKDROP_HEIGHT, width: deviceWidth, position: 'absolute'}}>
                <FlatList
                    data={item}
                    bounces={false}
                    keyExtractor={(item) => item.id + '-backdrop'}
                    removeClippedSubviews={false}
                    renderItem={({item, index}) => {
                        // if (!item.image) {
                        //     return null;
                        // }
                        const inputRange = [
                            (index - 1) * ITEM_SIZE,
                            index * ITEM_SIZE,
                            (index + 1) * ITEM_SIZE,
                        ];
                        const translateX = scrollX.interpolate({
                            inputRange: inputRange,
                            outputRange: [-deviceWidth, 0, deviceWidth],
                            extrapolate: 'clamp'
                        });
                        return (
                            <Animated.View
                                removeClippedSubviews={false}
                                style={{
                                    position: 'absolute',
                                    width: deviceWidth,
                                    transform: [{translateX: translateX}],
                                    height: deviceHeight,
                                    overflow: 'hidden',
                                }}
                            >
                                <Img
                                    resizeMode={'cover'}
                                    source={{uri: `${URL_IMAGE}${item.images[0].url}` ?? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBaFa2HbWkziCUVIl81KVljzNRb4Cfs7eYXg&usqp=CAU'}}
                                    style={{
                                        width: deviceWidth,
                                        height: BACKDROP_HEIGHT,
                                    }}
                                />
                            </Animated.View>
                        );
                    }}
                />
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
        );
    };

    const _renderHeaderView = () => {
        return (
            <Block>
                <Header headerText={'Promotion'}
                        titleStyle={styles().headerTitle}
                        style={[
                            styles().header,
                            {
                                backgroundColor: ColorsCustom.lime_green
                            }]
                        }/>
            </Block>
        )
    };

    return (
        <Block style={styles().container}>
            {/*{_renderHeaderView()}*/}
            <Backdrop
                item={dataSource} scrollX={scrollHorizontalX}/>
            <Screen>
                <Animated.ScrollView
                    pagingEnabled={true}
                    horizontal={true}
                    onScroll={Animated.event(
                        [{
                            nativeEvent: {contentOffset: {x: scrollHorizontalX}}
                        }],
                        {useNativeDriver: true}
                    )}
                    scrollEventThrottle={1.6}
                    bounces={false}
                    showsHorizontalScrollIndicator={false}
                    decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
                    renderToHardwareTextureAndroid
                    contentContainerStyle={{alignItems: 'center'}}
                    snapToInterval={ITEM_SIZE}
                    style={{
                        flex: 1,
                        position: 'absolute',
                        bottom: scale(20),
                        height: LIST_ITEM_HEIGHT + 50,
                    }}>
                    <Block width={(deviceWidth - ITEM_SIZE) / 2}/>
                    {
                        dataSource.map((item, index) => {
                            const inputRange = [
                                (index - 1) * ITEM_SIZE,
                                index * ITEM_SIZE,
                                (index + 1) * ITEM_SIZE,
                            ];
                            const scaleY = scrollHorizontalX.interpolate({
                                inputRange,
                                outputRange: [0.7, 1, 0.7]
                            });

                            const translateY = scrollHorizontalX.interpolate({
                                inputRange,
                                outputRange: [0, -20, 0],
                                extrapolate: 'clamp',
                            });

                            return (
                                <Button
                                    onPress={() => handleOnPressBanner(item)}
                                    activeOpacity={1}
                                    style={{width: ITEM_SIZE}}
                                    key={index.toString()}>
                                    <SharedElement id={`item.${item.id}.photo`}>
                                        <Animated.View
                                            style={{
                                                marginHorizontal: SPACING,
                                                height: LIST_ITEM_HEIGHT,
                                                width: ITEM_SIZE - SPACING * 2,
                                                alignItems: 'center',
                                                backgroundColor: 'white',
                                                marginTop: scale(50),
                                                borderRadius: scale(20),
                                                transform: [{translateY}, {scaleY}],
                                                overflow: 'hidden'
                                            }}>
                                            <Img
                                                style={{
                                                    height: LIST_ITEM_HEIGHT,
                                                    width: ITEM_SIZE - SPACING * 2,
                                                }}
                                                resizeMode={'cover'}
                                                source={handleImage({
                                                    uri: `${URL_IMAGE}${item.images[0].url}` ?? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBaFa2HbWkziCUVIl81KVljzNRb4Cfs7eYXg&usqp=CAU'
                                                })}
                                            />
                                        </Animated.View>
                                    </SharedElement>
                                </Button>
                            )
                        })
                    }
                    <Block width={(deviceWidth - ITEM_SIZE) / 2}/>
                </Animated.ScrollView>
            </Screen>
        </Block>
    );
};

export default memo(PromotionScreen, isEqual);
