import React, {memo} from 'react';
import {Avatar, Text} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import styles from './styles';
import {scale} from "@common";
import isEqual from "react-fast-compare";
import {icons} from "@assets/icon";
import {ColorsCustom} from "@theme/color";
import {Block, Button, Img, Screen} from "@components";
import {FontSizeDefault} from "@theme/fontSize";
import {deviceWidth} from "@utils";
import {images} from "@assets/image";
import {_lineItem} from "@features/authentication/userProfile/design/components";
import {APP_SCREEN} from "@navigation/screenTypes";
import {NavigationService} from "@navigation/navigationService";
import {onLogout} from "@app_redux/reducer";
import {RootState} from "@store/allReducers";
import {actionsCinemas} from "@features/unAuthentication/cinemas/redux/reducer";
import {GoogleSignin} from "@react-native-community/google-signin";

export interface lineItemProps {
    id: number,
    image: any,
    text: string,
    detail: string,
    colorContainerIcon?: string,
    iconColor?: string,
    textColor?: string,
}

const UserProfileScreen = (props: any): React.ReactElement => {

    const dispatch = useDispatch();
    const onPressLogout = async () => {
        dispatch(onLogout());
        dispatch(actionsCinemas.onLogout());
        NavigationService.reset(APP_SCREEN.LOGIN)
    };

    const handleOnPressLineItem = (item: lineItemProps) => {
        if (item.detail !== APP_SCREEN.LOGOUT) {
            NavigationService.navigate(item.detail)
        } else {
            onPressLogout()
        }
    };

    let profile = useSelector(
        (state: RootState) => state.app?.profile
    );

    const onPressEdit = () => {
        NavigationService.navigate(APP_SCREEN.EDIT_PROFILE)
    };

    // option for list item
    const lineItemOption: lineItemProps[] = [
        {
            id: 1,
            image: icons.order,
            text: 'Order History',
            detail: APP_SCREEN.ORDER_HISTORY,
        }, {
            id: 2,
            image: icons.heart,
            text: 'Favorite List',
            detail: APP_SCREEN.FAVORITE_LIST
        }, {
            id: 3,
            image: icons.seeCurrent,
            text: 'Current See',
            detail: APP_SCREEN.CURRENT_SEE
        },
        {
            id: 3,
            image: icons.coin,
            text: 'Coin Purse CinesFlex',
            detail: APP_SCREEN.COIN_PURSE
        },
        {
            id: 4,
            image: icons.logout,
            text: 'Log Out',
            detail: APP_SCREEN.LOGOUT,
            colorContainerIcon: ColorsCustom.light_red,
            iconColor: ColorsCustom.darkRed,
            textColor: ColorsCustom.red
        }
    ];

    return (
        <Block style={styles.container}>
            <Screen>
                <Block style={styles.AvatarContainer}>
                    <Block>
                        <Block style={styles.imageContainer}>
                            <Avatar.Image style={{}} size={(deviceWidth / 2.5 - scale(10))}
                                          source={{
                                              uri: 'https://scontent.fsgn5-6.fna.fbcdn.net/v/t1.0-9/108200276_2405548933075795_7974' +
                                                  '088370686247055_n.jpg?_nc_cat=106&ccb=2&_nc_sid=09cbfe&_nc_ohc=KGBn4x0m754AX-TyvZ7&_nc_ht=scont' +
                                                  'ent.fsgn5-6.fna&oh=66be5a0af52fbcfac2f8a820cc499881&oe=600E6167'
                                          }}>
                            </Avatar.Image>
                            <Button
                                style={styles.IconEditContainer}
                                onPress={onPressEdit}>
                                <Img source={icons.edit} style={[styles.IconEdit]} tintColor={ColorsCustom.lightWhite}/>
                            </Button>
                        </Block>
                    </Block>
                    <Block marginLeft={scale(10)} width={deviceWidth / 2}>
                        <Text style={{
                            fontWeight: 'bold',
                            fontSize: FontSizeDefault.FONT_18,
                        }} numberOfLines={1}>
                            {profile?.name}
                        </Text>
                        <Block direction={'row'} alignItems={'center'} paddingVertical={scale(5)}>
                            <Img source={images.mail} style={styles.IconMail} tintColor={ColorsCustom.blue}
                                 resizeMode={'contain'}/>
                            <Text style={{
                                fontSize: FontSizeDefault.FONT_13,
                            }} numberOfLines={1}>
                                {profile?.email}
                            </Text>
                        </Block>
                        <Block direction={'row'} alignItems={'center'} paddingVertical={scale(5)}>
                            <Img source={images.phone} tintColor={ColorsCustom.blue} style={styles.IconMail}
                                 resizeMode={'contain'}/>
                            <Text style={{
                                fontSize: FontSizeDefault.FONT_13
                            }} numberOfLines={1}>
                                {profile?.phone}
                            </Text>
                        </Block>
                    </Block>
                </Block>
                <Block marginTop={scale(50)}>
                    {
                        lineItemOption.map((item, index) => {
                            return (
                                <_lineItem key={index.toString()} item={item} index={index.toString()}
                                           onPressItem={handleOnPressLineItem}/>
                            )
                        })
                    }
                </Block>
            </Screen>
        </Block>
    );
};

export default memo(UserProfileScreen, isEqual);
