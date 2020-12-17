import React, {memo} from 'react';
// @ts-ignore
import {StackScreenProps} from '@react-navigation/stack';
import isEqual from 'react-fast-compare';
import {RootStackParamList, APP_SCREEN} from '@navigation/screenTypes';
import {Block, Header, Img, Screen, Wallpaper} from "@components"
import {ColorsCustom} from "@theme/color";
import {styles} from "@features/unAuthentication/promotion/design/style";
import {images} from "@assets/image";
import {deviceHeight, deviceWidth} from "@utils";
import {scale} from "@common";
import {ScrollView, StyleSheet} from "react-native";

type MoreProps = StackScreenProps<RootStackParamList, APP_SCREEN.HOME>;

const BACKGROUND_HEIGHT = deviceHeight / 1.6;
const LIST_ITEM_HEIGHT = deviceHeight - (BACKGROUND_HEIGHT/1.3);

export const PromotionScreen = ({navigation, route}: MoreProps) => {

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
                <ScrollView
                    pagingEnabled={true}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={{
                        flex: 1,
                        position: 'absolute',
                        bottom: scale(40),
                        height: LIST_ITEM_HEIGHT,
                        width: deviceWidth
                    }}>
                    {
                        [1, 2, 3, 4].map(() => {
                            return (
                                <Block style={{
                                    marginLeft: scale(20),
                                    height: LIST_ITEM_HEIGHT,
                                    width: LIST_ITEM_HEIGHT/1.2,
                                    backgroundColor: 'white',
                                    borderRadius: scale(10),
                                }}>
                                </Block>
                            )
                        })
                    }
                </ScrollView>
            </Screen>
        </Block>
    );
};

export default memo(PromotionScreen, isEqual);
