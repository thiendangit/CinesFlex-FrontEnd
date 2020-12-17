import React, {memo} from 'react';
import {Avatar, Text} from 'react-native-paper';
import {useDispatch} from 'react-redux';
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

interface IState {

}

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

    // useEffect(() => {
    // @ts-ignore
    // if (!loginReducer.isLoggedIn) {
    //     NavigationService.navigate('LoginScreen')
    // }
    // @ts-ignore
    // }, [(!loginReducer.isLoggedIn)]);

    // const id = useSelector((state: IState) => state.loginReducer.id);
    const dispatch = useDispatch();
    const onLogout = () => {
        // dispatch(loginActions.logOut());
        // NavigationService.navigate('LoginScreen')
    };

    const handleOnPressLineItem = (item: lineItemProps) => {
        if(item.detail !== APP_SCREEN.LOGOUT){
            NavigationService.navigate(item.detail)
        }else {
            alert('Logout')
        }
    };

    const onPressEdit = () => {
        alert('Edit')
    };

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
        }, {
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
                                          source={{uri: 'https://avatars2.githubusercontent.com/u/56025627?s=460&u=6c1c2577adb2c45d76167d061cf68b05e9b3e43d&v=4'}}>
                            </Avatar.Image>
                        </Block>
                        <Button
                            style={styles.IconEditContainer}
                            onPress={onPressEdit}>
                            <Img source={icons.edit} style={[styles.IconEdit]} tintColor={ColorsCustom.lightWhite}/>
                        </Button>
                    </Block>
                    <Block marginLeft={scale(10)} width={deviceWidth / 2}>
                        <Text style={{
                            fontWeight: 'bold',
                            fontSize: FontSizeDefault.FONT_18,
                        }} numberOfLines={1}>
                            Dang Tibbers
                        </Text>
                        <Block direction={'row'} alignItems={'center'} paddingVertical={scale(5)}>
                            <Img source={images.mail} style={styles.IconMail} tintColor={ColorsCustom.blue}
                                 resizeMode={'contain'}/>
                            <Text style={{
                                fontSize: FontSizeDefault.FONT_13,
                            }} numberOfLines={1}>
                                thiendangit1102@gmail.com
                            </Text>
                        </Block>
                        <Block direction={'row'} alignItems={'center'} paddingVertical={scale(5)}>
                            <Img source={images.phone} tintColor={ColorsCustom.blue} style={styles.IconMail}
                                 resizeMode={'contain'}/>
                            <Text style={{
                                fontSize: FontSizeDefault.FONT_13
                            }} numberOfLines={1}>
                                0927371897
                            </Text>
                        </Block>
                    </Block>
                </Block>
                <Block marginTop={scale(50)}>
                    {
                        lineItemOption.map((item, index) => {
                            return (
                                <_lineItem key={index.toString()} item={item} index={index.toString()} onPressItem={handleOnPressLineItem}/>
                            )
                        })
                    }
                </Block>
            </Screen>
        </Block>
    );
};

export default memo(UserProfileScreen, isEqual);
