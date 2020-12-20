import React, {memo, useRef, useState} from 'react';
// @ts-ignore
import {StackScreenProps} from '@react-navigation/stack';
import isEqual from 'react-fast-compare';
import {RootStackParamList, APP_SCREEN} from '@navigation/screenTypes';
import {Block, Button, Header, Img, Screen, Wallpaper} from "@components"
import {ColorsCustom} from "@theme/color";
import {styles} from "@features/unAuthentication/promotion/design/style";
import {images} from "@assets/image";
import {deviceHeight, deviceWidth} from "@utils";
import {handleImage, scale} from "@common";
import {Animated, FlatList, Platform, ScrollView, StyleSheet, TouchableOpacity} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import {NavigationService} from "@navigation/navigationService";


type MoreProps = StackScreenProps<RootStackParamList, APP_SCREEN.HOME>;
export interface PromotionItemProps {
    image : string
}

const BACKGROUND_HEIGHT = deviceHeight / 1.6;
const LIST_ITEM_HEIGHT = deviceHeight - (BACKGROUND_HEIGHT / 1.3);
const ITEM_SIZE = Platform.OS === 'ios' ? deviceWidth * 0.85 : deviceWidth * 0.85;
const SPACING = scale(10);
const BACKDROP_HEIGHT = deviceHeight * 0.7;

export const PromotionScreen = ({navigation, route}: MoreProps) => {

    const scrollHorizontalX = useRef<any>(new Animated.Value(0)).current;
    let data : PromotionItemProps[] = [{image: 'https://www.elle.vn/wp-content/uploads/2019/12/17/382575/phim-han-quoc-hay-nam-2019.jpg'}, {
        image: 'https://upload.wikimedia.org/wikipedia/vi/thumb/0/0e/Ng%C6%B0%E1%BB%9Di_%C4%91%C3%A0m_ph%C3%A1n_%28phim_truy%E1%BB%81n_h%C3%ACnh%29_poster.jpg/250px-Ng%C6%B0%E1%BB%9Di_%C4%91%C3%A0m_ph%C3%A1n_%28phim_truy%E1%BB%81n_h%C3%ACnh%29_poster.jpg'
    }, {image: 'https://www.elle.vn/wp-content/uploads/2019/12/17/382575/phim-han-quoc-hay-nam-2019.jpg'},
        {
            image: 'https://upload.wikimedia.org/wikipedia/vi/thumb/0/0e/Ng%C6%B0%E1%BB%9Di_%C4%91%C3%A0m_ph%C3%A1n_%28phim_truy%E1%BB%81n_h%C3%ACnh%29_poster.jpg/250px-Ng%C6%B0%E1%BB%9Di_%C4%91%C3%A0m_ph%C3%A1n_%28phim_truy%E1%BB%81n_h%C3%ACnh%29_poster.jpg'
        }];
    const [dataSource, setDataSource] = useState<PromotionItemProps[]>(data);

    const handleOnPressBanner = (item : PromotionItemProps) => {
        NavigationService.navigate(APP_SCREEN.PROMOTION_DETAILS,{item})
    };

    const Backdrop = ({item, scrollX}: any) => {
        return (
            <Block style={{height: BACKDROP_HEIGHT, width: deviceWidth, position: 'absolute'}}>
                <FlatList
                    data={item}
                    bounces={false}
                    keyExtractor={(item) => item.key + '-backdrop'}
                    removeClippedSubviews={false}
                    // horizontal
                    contentContainerStyle={{width: deviceWidth, height: BACKDROP_HEIGHT}}
                    renderItem={({item, index}) => {
                        if (!item.image) {
                            return null;
                        }
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
                                    source={{uri: item.image}}
                                    style={{
                                        width: deviceWidth,
                                        height: BACKDROP_HEIGHT,
                                        position: 'absolute',
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
                                    onPress={()=>handleOnPressBanner(item)}
                                    activeOpacity={1}
                                    style={{width: ITEM_SIZE}}
                                    key={index.toString()}>
                                    <Animated.View
                                        style={{
                                            marginHorizontal: SPACING,
                                            height: LIST_ITEM_HEIGHT,
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
                                                uri: item.image
                                            })}
                                        />
                                    </Animated.View>
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
