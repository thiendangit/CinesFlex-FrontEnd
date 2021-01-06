import React, {memo} from "react";
import {styles} from './style'
import {Block, IconBack, Img, ListView, Screen, Text, Wallpaper} from "@components";
import {useTranslation} from 'react-i18next';
import {NavigationService} from "@navigation/navigationService";
import isEqual from "react-fast-compare";
import {dispatch, scale, verticalScale} from "@common";
import {_coinPurseListItem} from "./components";
import {FilmProps} from "@features/unAuthentication/home/design";
import {APP_SCREEN} from "@navigation/screenTypes";
import {Alert} from "react-native";
import {actionsCinemas} from "@features/unAuthentication/cinemas/redux/reducer";
import {useSelector} from "react-redux";
import {RootState} from "@store/allReducers";
import {deviceHeight, deviceWidth} from "@utils";
import {images} from "@assets/image";
import {ColorsCustom} from "@theme/color";

export interface Props {
    route: {
        params: {
            text: string
        }
    },
}

const CoinPurseListScreen: React.FC<Props> = (props): React.ReactElement => {
    const [t] = useTranslation();

    const onPressBack = () => {
        NavigationService.goBack()
    };

    const onPressItem = (item: FilmProps) => {
        NavigationService.navigate(APP_SCREEN.FILM_DETAILS, {item, isComing: item.type === 2});
    };

    const onPressDelete = (item: FilmProps) => {
        Alert.alert(
            "",
            "Do you want to delete this film ?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "destructive"
                },
                {text: "OK", onPress: () => dispatch(actionsCinemas.onAddFilmToFavoriteList(item))}
            ],
            {cancelable: false}
        );
    };

    let {currentSeeList} = useSelector(
        (state: RootState) => state.cinemas
    );

    const _renderItem = ({item, index}: any) => {
        return <_coinPurseListItem item={item} index={index} onPressItem={onPressItem} onPressDelete={onPressDelete}/>
    };

    return (
        <Block style={styles.container}>
            <Wallpaper style={{
                height: deviceHeight / 3.5,
                width: deviceWidth,
            }} backgroundImage={images.header}/>
            <Screen>
                <ListView style={styles.listContainer}
                          data={currentSeeList}
                          ListHeaderComponent={() => {
                              return <>
                                  <Text style={styles.text}>
                                      Coin purse CinesFlex
                                  </Text>
                                  <Block height={deviceHeight / 7} marginTop={scale(10)} width={deviceWidth - scale(40)}
                                         style={[styles.coinPurseContainer]}>
                                      <>
                                          <Block direction={'row'}>
                                              <Text>
                                                  Accumulation:
                                              </Text>
                                              <Text fontWeight={'bold'}>
                                                  {' '}0 Coin
                                              </Text>
                                          </Block>
                                          <Block direction={'row'} marginTop={scale(10)}>
                                              <Text>
                                                  Conversion rate :
                                              </Text>
                                              <Text fontWeight={'bold'}>
                                                  {' '}1 VNĐ = 1 Coin
                                              </Text>
                                          </Block>
                                      </>
                                  </Block>
                                  <Text style={styles.textReward}>
                                      Reward redemption
                                  </Text>
                              </>
                          }}
                          showsVerticalScrollIndicator={false}
                          renderItem={_renderItem}
                          keyExtractor={(item, index) => index.toString()}
                          contentContainerStyle={{
                              marginTop: verticalScale(deviceHeight / 3.5 / 4), alignSelf: 'center',
                              paddingBottom: verticalScale(deviceHeight / 3.5 / 4 + scale(10))
                          }}
                />
            </Screen>
            <IconBack containerStyle={{marginTop: verticalScale(20)}} onPress={onPressBack}/>
        </Block>
    )
};

export default memo(CoinPurseListScreen, isEqual);
