import React, {memo, useEffect, useRef, useState} from 'react';
// @ts-ignore
import {StackScreenProps} from '@react-navigation/stack';
import isEqual from 'react-fast-compare';
import {RootStackParamList, APP_SCREEN} from '@navigation/screenTypes';
import {Block, Button, Icon, IconBack, Img, Text} from "@components"
import {styles} from "@features/unAuthentication/filmDetails/design/style";
import {ColorsCustom} from "@theme/color";
import {NavigationService} from "@navigation/navigationService";
import {handleImage, scale, verticalScale} from "@common";
import {deviceHeight, deviceWidth} from "@utils";
import {StatusBar, Animated, TouchableOpacity, ScrollView} from "react-native";
import {FontSizeDefault} from "@theme/fontSize";
import {images} from "@assets/image";
import {useValue} from "react-native-reanimated";
import {icons} from "@assets/icon";
import {_ButtonBuy} from "@features/unAuthentication/cinemasDetails/design/components/buttonBuy/buttonBuy";


type MoreProps = StackScreenProps<RootStackParamList, APP_SCREEN.HOME>;

interface leftTabOption {
    title: string
}

let LEFT_BAR_HEIGHT = deviceHeight / 2;
let LEFT_BAR_WIDTH = deviceWidth / 6;

export const FilmDetailsScreen = ({navigation, route}: MoreProps) => {

    const [dataSourceCords, setDataSourceCords] = useState<any>([]);
    const [barAnim] = useState(new Animated.Value(0));
    const [currentTab, setCurrentTab] = useState(0);
    const [isLike, setIsLike] = useState(false);

    const scrollRef = useRef<any>();

    const onPressBack = () => {
        NavigationService.goBack()
    };

    const onPressBuy = () => {
        NavigationService.navigate(APP_SCREEN.CINEMAS)
    };

    let leftTabOption: leftTabOption[] = [
        {
            title: 'Info'
        },
        {
            title: 'Cast'
        },
        {
            title: 'Ticket'
        }
    ];

    return (
        <Block style={{flex: 1}}>
            <StatusBar hidden={true}/>
            <Block style={styles().container} block
                   direction={'row'}
            >
                <Block style={{}}
                       marginTop={deviceHeight / 3}
                       width={LEFT_BAR_WIDTH}
                       height={LEFT_BAR_HEIGHT}>
                    <Animated.View style={{
                        top: scale(66),
                        position: 'absolute',
                        backgroundColor: ColorsCustom.lime_green,
                        height: scale(22),
                        width: scale(68),
                        borderRadius: scale(22 / 2),
                        transform: [{
                            translateY: barAnim.interpolate({
                                inputRange: [0, 1, 2],
                                outputRange: [scale((0)), scale((60 + 60 / 2)), scale(((60 + 60 / 2) * 2))],
                                extrapolate: "clamp"
                            }),
                        }, {
                            rotate: '90deg',
                        }],
                    }}>
                    </Animated.View>
                    {
                        leftTabOption.map((tab, index) => {
                            return <Button style={{
                                marginTop: scale(60),
                                transform: ([{rotate: '90deg'}]),
                                width: scale(70),
                            }}>
                                <Text
                                    onPress={() => {
                                        setCurrentTab(index);
                                        Animated.timing(barAnim, {
                                            toValue: index,
                                            duration: 300,
                                            useNativeDriver: true
                                        }).start(() => {
                                            barAnim.setValue(index);
                                        });
                                        scrollRef.current.scrollTo({
                                            x: 0,
                                            y: dataSourceCords[index],
                                            animated: true,
                                        });
                                    }}
                                    style={{
                                        fontSize: FontSizeDefault.FONT_14,
                                        fontWeight: '600',
                                        color: currentTab === index ? ColorsCustom.lightWhite : ColorsCustom.blackTextPrimary
                                    }}> {tab.title}</Text>
                            </Button>
                        })
                    }
                </Block>

                <Animated.ScrollView style={{flex: 1}} bounces={false} showsVerticalScrollIndicator={false}
                                     ref={scrollRef}
                >
                    <Block onLayout={(event) => {
                        const layout = event.nativeEvent.layout;
                        dataSourceCords[0] = layout.y;
                        setDataSourceCords(dataSourceCords);
                    }}>
                        <Img style={{
                            flex: 1,
                            borderBottomLeftRadius: scale(deviceHeight / 2 / 5)
                        }}
                             containerStyle={{
                                 height: deviceHeight / 2,
                             }}
                             resizeMode={'cover'}
                             source={{
                                 uri: 'https://phimgi.tv/wp-content/uploads/sat-thu-john-wick-phan-3-chuan-bi-chien-tranh-john-wick-chapter-3-parabellum-9544-2.jpg'
                             }}
                        />
                        <Icon
                            onPress={() => {
                                setIsLike(!isLike)
                            }}
                            icon={'heart'}
                            style={{
                                tintColor: isLike ? ColorsCustom.red : ColorsCustom.lightWhite,
                                position: 'absolute',
                                bottom: scale(20),
                                right: scale(30),
                                height: scale(30),
                                width: scale(30)
                            }}/>
                        <Text
                            style={{
                                position: 'absolute',
                                top: scale(30),
                                right: scale(30),
                                color: ColorsCustom.lightWhite,
                                fontSize: FontSizeDefault.FONT_24,
                                fontWeight: 'bold'
                            }}>
                            9.0
                        </Text>
                    </Block>
                    <Block marginLeft={scale(10)}>
                        <Text fontSize={"FONT_22"}
                              fontWeight={'600'}
                              marginTop={scale(10)}
                              color={ColorsCustom.blue}
                        >John Wick 3 : Parabelum</Text>
                        <Block direction={'row'} marginTop={scale(10)}>
                            {
                                [1, 2, 3].map(() => {
                                    return (
                                        <Text marginLeft={scale(5)}
                                              color={ColorsCustom.grey}
                                              fontWeight={'400'}
                                        >
                                            Action
                                        </Text>
                                    )
                                })
                            }
                            <Text paddingHorizontal={scale(5)}
                                  color={ColorsCustom.grey}
                                  fontWeight={'400'}>
                                |
                            </Text>
                            <Block>
                                <Text fontWeight={'600'} color={ColorsCustom.grey}>
                                    1h45m
                                </Text>
                            </Block>
                        </Block>
                        <Block direction={'row'} marginTop={scale(10)}>
                            {
                                [1, 2].map(() => {
                                    return (
                                        <TouchableOpacity
                                            activeOpacity={1}
                                            style={{
                                                borderWidth: 1,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                height: scale(25),
                                                marginLeft: scale(10),
                                                width: scale(60),
                                                borderRadius: scale(25 / 2),
                                                borderColor: ColorsCustom.grey
                                            }}>
                                            <Text style={{fontSize: FontSizeDefault.FONT_14}}
                                                  fontWeight={'600'}
                                                  color={ColorsCustom.grey}
                                            >
                                                VieSubs
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </Block>
                        <Block marginTop={scale(10)}>
                            <Text fontWeight={'400'}>
                                Sau phần 2, John Wick bị treo thưởng với hợp đồng mở 14 triệu đô la (tăng lên 15 triệu
                                đô la sau này)
                                vì đã phá vỡ quy tắc ngầm: giết người trong khách sạn Continental. Nạn nhân, Santino
                                D'Antonio
                                (Riccardo Scamarcio) là một thành viên của Hội đồng tối cao đã ra lệnh ký hợp đồng mở lý
                                của Continental,
                                Winston (Ian McShane), đã cho anh một giờ để chạy trốn trước khi bị "Trừ khử".
                                Vào tháng 10 năm 2016, Stahelski đã công bố phát triển phần phim thứ ba. Sát thủ John
                                Wick:
                                Phần 3 – Chuẩn bị chiến tranh được sản xuất vào đầu năm 2018.
                            </Text>
                        </Block>
                    </Block>
                    <Block onLayout={(event) => {
                        const layout = event.nativeEvent.layout;
                        dataSourceCords[1] = layout.y;
                        setDataSourceCords(dataSourceCords);
                    }}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginTop: scale(10)}}>
                            {[1, 2, 3].map(() => {
                                return (
                                    <Block marginLeft={scale(10)}>
                                        <Img style={{
                                            borderRadius: scale(10),
                                            height: deviceWidth / 6,
                                            width: deviceWidth / 3
                                        }}
                                             source={handleImage(
                                                 {
                                                     uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9' +
                                                         'GcQgTo7YNajkAvSihDUJWKYKtfVx8qCamxnucw&usqp=CAU'
                                                 })}/>
                                    </Block>
                                )
                            })}
                        </ScrollView>
                    </Block>
                    <Block direction={'row'} marginLeft={scale(20)} alignItems={'center'}
                           justifyContent={'space-between'} marginTop={scale(10)}
                           onLayout={(event) => {
                               const layout = event.nativeEvent.layout;
                               dataSourceCords[2] = layout.y;
                               setDataSourceCords(dataSourceCords);
                           }}
                    >
                        <Block
                            style={{}}
                            width={deviceWidth / 3}
                            height={scale(deviceWidth / 6)}
                            alignItems={'center'}
                            direction={'row'}
                            justifyContent={'center'}>
                            <Img style={{
                                height: scale(28),
                                width: scale(28),
                            }}
                                 source={handleImage(images.age_limit)}/>
                            <Text
                                marginLeft={scale(10)}
                                fontSize={"FONT_24"}
                                fontWeight={'600'}
                                style={{
                                    color: ColorsCustom.light_red,
                                    textAlign: 'center',
                                }}>
                                18+
                            </Text>
                        </Block>
                        <_ButtonBuy text={'BOOK'} image={images.cart} onPressBuy={onPressBuy}/>
                    </Block>
                </Animated.ScrollView>

            </Block>
            <IconBack  containerStyle={{marginTop: verticalScale(20)}} onPress={onPressBack}/>
        </Block>
    );
};

export default memo(FilmDetailsScreen, isEqual);
