import React, {memo, useRef, useState} from 'react';
// @ts-ignore
import isEqual from 'react-fast-compare';
import {RootStackParamList, APP_SCREEN} from '@navigation/screenTypes';
import {Block, Button, Icon, IconBack, Img, Text} from "@components"
import {styles} from "@features/unAuthentication/filmDetails/design/style";
import {ColorsCustom} from "@theme/color";
import {NavigationService} from "@navigation/navigationService";
import {dispatch, formatDateToDDMM, formatMinusToHours, handleImage, scale, verticalScale} from "@common";
import {deviceHeight, deviceWidth} from "@utils";
import {StatusBar, Animated, TouchableOpacity, ScrollView} from "react-native";
import {images} from "@assets/image";
import {_ButtonBuy} from "@features/unAuthentication/cinemasDetails/design/components/buttonBuy/buttonBuy";
import {SharedElement} from "react-navigation-shared-element";
import {FilmProps} from "@features/unAuthentication/home/design";
import {StackScreenProps} from "@react-navigation/stack";
import {URL_IMAGE} from "@networking";
import {actionsCinemas} from "@features/unAuthentication/cinemas/redux/reducer";

interface leftTabOption {
    id: number
    title: string
}

export interface FilmDetailsProps {
    route: {
        params: {
            item: FilmProps,
            isComing: boolean
        }
    },
}

type DetailsProps = StackScreenProps<RootStackParamList, APP_SCREEN.FILM_DETAILS>;

let LEFT_BAR_HEIGHT = deviceHeight / 2;
let LEFT_BAR_WIDTH = deviceWidth / 6;

export const FilmDetailsScreen = (props: FilmDetailsProps) => {

    let film = props.route.params.item ?? null;
    let isComing = props.route.params.isComing ?? false;
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

    //left tab option
    let leftTabOption: leftTabOption[] = [
        {
            id: 1,
            title: 'Info'
        },
        {
            id: 2,
            title: 'Cast'
        },
        {
            id: 3,
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
                        // style animation for left tab
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
                                    // process animation for left tab
                                    onPress={() => {
                                        setCurrentTab(index);
                                        Animated.timing(barAnim, {
                                            toValue: index,
                                            duration: 300,
                                            useNativeDriver: true
                                        }).start(() => {
                                            barAnim.setValue(index);
                                            scrollRef.current.scrollTo({
                                                x: 0,
                                                y: dataSourceCords[index],
                                                animated: true,
                                            });
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
                                     ref={scrollRef}>
                    <Block onLayout={(event) => {
                        const layout = event.nativeEvent.layout;
                        dataSourceCords[0] = layout.y;
                        setDataSourceCords(dataSourceCords);
                    }}>
                        <SharedElement id={`item.${film?.id}.photo`}>
                            <Img style={styles().imageBg}
                                 containerStyle={{
                                     height: deviceHeight / 2,
                                 }}
                                 resizeMode={'cover'}
                                 source={{
                                     uri: `${URL_IMAGE}${film?.detail?.images[0]?.url}`
                                 }}
                            />
                        </SharedElement>
                        <Icon
                            onPress={async () => {
                                await dispatch(actionsCinemas.onAddFilmToFavoriteList(film));
                                // setIsLike(!isLike)
                            }}
                            icon={'heart'}
                            style={[styles().heartIconStyle, {tintColor: isLike ? ColorsCustom.red : ColorsCustom.lightWhite}]}/>
                        <Text
                            style={styles().rateStyle}>
                            {isComing ? formatDateToDDMM(film?.date_begin) : film?.detail?.rating}
                        </Text>
                    </Block>
                    {/*film name */}
                    <Block marginLeft={scale(10)}>
                        <Text fontSize={"FONT_22"}
                              fontWeight={'600'}
                              marginTop={scale(10)}
                              color={ColorsCustom.blue}
                        >{film?.name}</Text>
                        <Block direction={'row'} marginTop={scale(10)}>
                            {
                                film?.detail?.categories.map((item: any, index: number) => {
                                    return (
                                        <Text marginLeft={scale(5)}
                                              color={ColorsCustom.grey}
                                              fontWeight={'400'}
                                        >
                                            {item?.title}
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
                                    {formatMinusToHours(film?.detail?.duration_min)}
                                </Text>
                            </Block>
                        </Block>
                        <Block direction={'row'} marginTop={scale(10)}>
                            {
                                film?.detail?.languages.map((item: any, index: number) => {
                                    return (
                                        <TouchableOpacity
                                            activeOpacity={1}
                                            style={styles().typeFilm}>
                                            <Text
                                                style={styles().filmTitle}
                                                fontWeight={'600'}
                                                color={ColorsCustom.grey}
                                            >
                                                {item.title}
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </Block>
                        {/*film description*/}
                        <Block marginTop={scale(10)}>
                            <Text fontWeight={'400'}>
                                {film?.detail?.description} Hai anh em Mai và Men cùng yêu một cô gái tên Pon, nhưng do
                                điều kiện gia đình không tốt, hai anh em đành dấn thân vào thế giới đen tối. Nhờ sự giới
                                thiệu của Bo, hai anh em họ gia nhập vào một nhóm cướp xe do To dẫn đầu. Không lâu sau,
                                bố của Mai là Sorn mất, Men cũng biết về quan hệ yêu dương của Mai và Pon. Lần này, Mai
                                đã vướng phải vô vàn rắc rối, bao gồm cả sự truy sát của To. Chính vì vậy, Mai buộc phải
                                giải quyết hết mọi rắc rối của mình, dù là trong tình cảm hay với những người xung
                                quanh.
                            </Text>
                        </Block>
                    </Block>
                    {/*caster list*/}
                    <Block onLayout={(event) => {
                        const layout = event.nativeEvent.layout;
                        dataSourceCords[1] = layout.y;
                        setDataSourceCords(dataSourceCords);
                    }}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginTop: scale(10)}}>
                            {film?.detail.casters.map((item: any, index: number) => {
                                return (
                                    <Block marginLeft={scale(10)}>
                                        <Img style={styles().imageCaster}
                                             resizeMode={'cover'}
                                             source={handleImage(
                                                 {
                                                     uri: `${URL_IMAGE}${item.images[0].url}`
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
                            style={{}} width={deviceWidth / 3} height={scale(deviceWidth / 6)} alignItems={'center'}
                            direction={'row'} justifyContent={'center'}>
                            <Img style={styles().rateImage}
                                 source={handleImage(images.age_limit)}/>
                            <Text
                                marginLeft={scale(10)}
                                fontSize={"FONT_24"}
                                fontWeight={'600'}
                                style={styles().ageLimited}>
                                {film?.detail?.rated}+
                            </Text>
                        </Block>
                        <_ButtonBuy text={'BOOK'} disable={isComing} image={images.cart} onPressBuy={onPressBuy}/>
                    </Block>
                </Animated.ScrollView>
            </Block>
            <IconBack containerStyle={{marginTop: verticalScale(20)}} onPress={onPressBack}/>
        </Block>
    );
};

// process share element
FilmDetailsScreen.sharedElements = (route: any, otherNavigation: any, showing: any) => {
    const film = route.params?.item;
    return [{
        id: `item.${film?.id}.photo`,
    }];
};

export default memo(FilmDetailsScreen, isEqual);
