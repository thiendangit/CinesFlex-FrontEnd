import React, {memo, useEffect, useRef, useState} from "react";
import {styles} from './style'
import {Block, Button, IconBack, Img, ListView, ModalBoxRef, Screen, Text, Wallpaper} from "@components";
import {useTranslation} from 'react-i18next';
import {NavigationService} from "@navigation/navigationService";
import isEqual from "react-fast-compare";
import {dispatch, scale, toast, verticalScale} from "@common";
import {_coinPurseListItem, _modalMyPromotion} from "./components";
import {FilmProps} from "@features/unAuthentication/home/design";
import {APP_SCREEN} from "@navigation/screenTypes";
import {Alert} from "react-native";
import {actionsCinemas} from "@features/unAuthentication/cinemas/redux/reducer";
import {useSelector} from "react-redux";
import {RootState} from "@store/allReducers";
import {deviceHeight, deviceWidth} from "@utils";
import {images} from "@assets/image";
import {ColorsCustom} from "@theme/color";
import {icons} from "@assets/icon";

export interface Props {
    route: {
        params: {
            text: string
        }
    },
}

export interface coinPureProps {
    coin: number
    description: string
    discount: number
    id: string
    images: { url: string }[]
    status: number
    title: string
    type: number,
    reference?: string
}

const CoinPurseListScreen: React.FC<Props> = (props): React.ReactElement => {
    const [t] = useTranslation();
    const myPromotionRef = useRef<ModalBoxRef>();
    const [coin, setCoin] = useState<{ point: number }>({point: 0});
    const [gift, setGift] = useState<coinPureProps[] | []>([]);
    let {myGiftList} = useSelector(
        (state: RootState) => state.cinemas
    );
    const onPressBack = () => {
        NavigationService.goBack()
    };

    let URL_DOMAIN = useSelector(
        (state: RootState) => state.app?.appUrl
    );

    const onPressItem = (item: coinPureProps) => {
        if (coin.point >= item.coin) {
            let body = {
                "gift_id": item.id
            }
            dispatch(actionsCinemas.createReferenceGift(`${URL_DOMAIN}gifts/get-gift`, body, (result) => {
                console.log({result});
                if (result?.data?.data) {
                    item.reference = result.data.data.reference;
                    dispatch(actionsCinemas.onAddGiftToMyGiftList(item));
                    dispatch(actionsCinemas.fetchMyCoin(`${URL_DOMAIN}users/get-profile`, (result_coin) => {
                        if (result_coin?.data?.data) {
                            setCoin(result_coin.data.data)
                        }
                    }))
                }
            }));
        } else {
            toast("your coin is not enough for this gift")
        }
    };

    useEffect(() => {
        dispatch(actionsCinemas.fetchMyCoin(`${URL_DOMAIN}users/get-profile`, (result_coin) => {
            if (result_coin && result_coin?.data?.data) {
                setCoin(result_coin.data.data);
            }
        }));
        dispatch(actionsCinemas.fetchGift(`${URL_DOMAIN}gifts`, (result_gift) => {
            if (result_gift && result_gift?.data?.data) {
                setGift(result_gift.data.data);
            }
        }))
    }, []);

    const _renderItem = ({item, index}: any) => {
        return <_coinPurseListItem item={item} index={index} key={index.toString()} onPressGetItem={onPressItem}/>
    };

    return (
        <Block style={styles.container}>
            <Wallpaper style={{
                height: deviceHeight / 3.5,
                width: deviceWidth,
            }} backgroundImage={images.header}/>
            <Screen>
                <ListView style={styles.listContainer}
                          data={gift}
                          ListHeaderComponent={() => {
                              return <>
                                  <Text style={styles.text}>
                                      Coin purse CinesFlex
                                  </Text>
                                  <Block height={deviceHeight / 7} marginTop={scale(10)} width={deviceWidth - scale(40)}
                                         style={[styles.coinPurseContainer]}>
                                      <>
                                          <Block direction={'row'}>
                                              <Text>Accumulation:</Text>
                                              <Text fontWeight={'bold'}>{' '}{coin?.point} Coin</Text>
                                          </Block>
                                          <Block direction={'row'} marginTop={scale(10)}>
                                              <Text>Conversion rate :</Text>
                                              <Text fontWeight={'bold'}>{' '}500 VNĐ = 1 Coin</Text>
                                          </Block>
                                          <Button
                                              onPress={() => myPromotionRef.current?.show()}
                                              style={styles.buttonMyGift}>
                                              <Img style={{
                                                  height: scale(35), width: scale(35)
                                              }}
                                                   source={icons.gift}
                                              />
                                              <Block
                                                  height={scale(20)}
                                                  width={scale(20)}
                                                  style={{
                                                      backgroundColor: 'blue',
                                                      position: 'absolute',
                                                      borderRadius: scale(10),
                                                      alignItems: 'center',
                                                      justifyContent: 'center',
                                                      right: -5,
                                                      top: -2
                                                  }}>
                                                  <Text color={ColorsCustom.lightWhite}>
                                                      {myGiftList ? myGiftList.length : 0}
                                                  </Text>
                                              </Block>
                                          </Button>
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
            <_modalMyPromotion ref={myPromotionRef}/>
            <IconBack containerStyle={{marginTop: verticalScale(20)}} onPress={onPressBack}/>
        </Block>
    )
};

export default memo(CoinPurseListScreen, isEqual);
