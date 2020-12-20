import React, {memo, useRef} from 'react';
// @ts-ignore
import {StackScreenProps} from '@react-navigation/stack';
import isEqual from 'react-fast-compare';
import {RootStackParamList, APP_SCREEN} from '@navigation/screenTypes';
import {Block, Header, Img, Screen, Wallpaper} from "@components"
import {ColorsCustom} from "@theme/color";
import {styles} from "@features/unAuthentication/promotion/design/style";
import {images} from "@assets/image";
import {deviceHeight, deviceWidth} from "@utils";
import {handleImage, scale} from "@common";
import {Animated, Platform, ScrollView, StyleSheet} from "react-native";

type MoreProps = StackScreenProps<RootStackParamList, APP_SCREEN.HOME>;

const BACKGROUND_HEIGHT = deviceHeight / 1.6;
const LIST_ITEM_HEIGHT = deviceHeight - (BACKGROUND_HEIGHT / 1.3);
const LIST_ITEM_WIDTH = deviceWidth * 0.8;
const SPACING = scale(10);

export const PromotionScreen = ({navigation, route}: MoreProps) => {

    const scrollHorizontalX = useRef<any>(new Animated.Value(0)).current;

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
            <Img source={images.bg_promotion} style={{
                height: BACKGROUND_HEIGHT,
                borderRadius: scale(20)
            }}/>
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
                    showsHorizontalScrollIndicator={false}
                    decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
                    renderToHardwareTextureAndroid
                    contentContainerStyle={{alignItems: 'center'}}
                    snapToInterval={LIST_ITEM_WIDTH}
                    style={{
                        flex: 1,
                        position: 'absolute',
                        bottom: scale(20),
                        height: LIST_ITEM_HEIGHT + 50,
                    }}>
                    <Block width={(deviceWidth - LIST_ITEM_WIDTH) / 2}/>
                    {
                        [1, 2, 3, 4].map((item, index) => {
                            const inputRange = [
                                (index - 1) * LIST_ITEM_WIDTH,
                                index * LIST_ITEM_WIDTH,
                                (index + 1) * LIST_ITEM_WIDTH,
                            ];
                            const scaleY = scrollHorizontalX.interpolate({
                                inputRange,
                                outputRange: [0.7, 1, 0.7]
                            });

                            const translateY = scrollHorizontalX.interpolate({
                                inputRange,
                                outputRange: [0, -20, 0]
                            });

                            return (
                                <Block width={LIST_ITEM_WIDTH} key={index.toString()}>
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
                                                width: LIST_ITEM_WIDTH - SPACING * 2,
                                            }}
                                            resizeMode={'stretch'}
                                            source={handleImage({
                                                uri: 'https://www.elle.vn/wp-content/uploads/2019/12/17/382575/phim-han-quoc-hay-nam-2019.jpg'
                                            })}
                                        />
                                    </Animated.View>
                                </Block>
                            )
                        })
                    }
                </Animated.ScrollView>
            </Screen>
        </Block>
    );
};

export default memo(PromotionScreen, isEqual);
