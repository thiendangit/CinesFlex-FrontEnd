import React, {memo, useRef, useState} from 'react';
// @ts-ignore
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
import {_ButtonBuy} from "@features/unAuthentication/cinemasDetails/design/components/buttonBuy/buttonBuy";
import {SharedElement} from "react-navigation-shared-element";
import {FilmProps} from "@features/unAuthentication/home/design";
import {StackScreenProps} from "@react-navigation/stack";

interface leftTabOption {
    title: string
}

export interface FilmDetailsProps {
    route: {
        params: {
            item: FilmProps
        }
    },
}

type DetailsProps = StackScreenProps<RootStackParamList, APP_SCREEN.FILM_DETAILS>;

let LEFT_BAR_HEIGHT = deviceHeight / 2;
let LEFT_BAR_WIDTH = deviceWidth / 6;

export const FilmDetailsScreen = (props: FilmDetailsProps | DetailsProps) => {

    let film = props.route.params?.item;
    const [dataSourceCords, setDataSourceCords] = useState<any>([]);
    const [barAnim] = useState(new Animated.Value(0));
    const [currentTab, setCurrentTab] = useState(0);
    const [isLike, setIsLike] = useState(false);

    const scrollRef = useRef<any>();

    const onPressBack = () => {
        NavigationService.goBack()
    };

    const onPressBuy = () => {
        NavigationService.navigate(APP_SCREEN.CINEMAS, {film: film})
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
                    <Animated.View style={[styles().leftBarContainer, {
                        transform: [{
                            translateY: barAnim.interpolate({
                                inputRange: [0, 1, 2],
                                outputRange: [scale((0)), scale((60 + 60 / 2)), scale(((60 + 60 / 2) * 2))],
                                extrapolate: "clamp"
                            }),
                        }, {
                            rotate: '90deg',
                        }],
                    }]}>
                    </Animated.View>
                    {
                        leftTabOption.map((tab, index) => {
                            return <Button style={styles().leftBarButtonContainer}>
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
                                    style={[styles().leftBarTitle,
                                        {
                                            color: currentTab === index ?
                                                ColorsCustom.lightWhite : ColorsCustom.blackTextPrimary
                                        }]}> {tab.title}</Text>
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
                        <SharedElement id={`item.${film?.id}.photo`}>
                            <Img style={{
                                flex: 1,
                                borderBottomLeftRadius: scale(deviceHeight / 2 / 5)
                            }}
                                 containerStyle={{
                                     height: deviceHeight / 2,
                                 }}
                                 resizeMode={'cover'}
                                 source={{
                                     uri: film?.image
                                 }}
                            />
                        </SharedElement>
                        <Icon
                            onPress={() => {
                                setIsLike(!isLike)
                            }}
                            icon={'heart'}
                            style={[styles().heartIconStyle, {tintColor: isLike ? ColorsCustom.red : ColorsCustom.lightWhite}]}/>
                        <Text
                            style={styles().rateStyle}>
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
                                            style={styles().typeFilm}>
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
                                style={styles().ageLimited}>
                                18+
                            </Text>
                        </Block>
                        <_ButtonBuy text={'BOOK'} image={images.cart} onPressBuy={onPressBuy}/>
                    </Block>
                </Animated.ScrollView>
            </Block>
            <IconBack containerStyle={{marginTop: verticalScale(20)}} onPress={onPressBack}/>
        </Block>
    );
};

FilmDetailsScreen.sharedElements = (route: any, otherNavigation: any, showing: any) => {
    const film = route.params?.item;
    return [{
        id: `item.${film?.id}.photo`,
    }];
};

export default memo(FilmDetailsScreen, isEqual);
