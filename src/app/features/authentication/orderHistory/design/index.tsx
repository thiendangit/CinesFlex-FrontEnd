import React, {memo, useEffect, useState} from "react";
import {styles} from './style'
import {Block, IconBack, ListView, Screen, Text} from "@components";
import {useTranslation} from 'react-i18next';
import {NavigationService} from "@navigation/navigationService";
import isEqual from "react-fast-compare";
import {dispatch, verticalScale} from "@common";
import {_orderListItem} from "./components";
import {actionsHome} from "@features/unAuthentication/home/redux/reducer";
import {FilmProps} from "@features/unAuthentication/home/design";
import {useSelector} from "react-redux";
import {RootState} from "@store/allReducers";

export interface Props {
    route: {
        params: {
            text: string
        }
    },
}

interface OrderDetail {
    "id": string,
    "order_id": string,
    "quantity": number,
    "total": number
}

interface OrderProps {
    "id": string,
    "voucher_id": string,
    "booker_id": string,
    "reference": string,
    "paid": number,
    "total_paid": number,
    "type": number,
    "status": number,
    "details": OrderDetail[]
}

const OrderHistoryScreen: React.FC<Props> = (props): React.ReactElement => {
    const [t] = useTranslation();
    const [orderDataSource, setOrderDataSource] = useState<OrderProps[] | []>([]);
    let URL_DOMAIN = useSelector(
        (state: RootState) => state.app?.appUrl
    );
    useEffect(() => {
        dispatch(actionsHome.getListOrderProduct(`${URL_DOMAIN}orders/fetch-history`, (result) => {
            console.log({result});
            if (result?.data?.data) {
                let dataSource: OrderProps[] = result?.data?.data[0]?.orders;
                setOrderDataSource(dataSource)
            }
        }))
    }, []);

    const onPressBack = () => {
        NavigationService.goBack()
    };

    const onPressItem = (item: any) => {
        // NavigationService.navigate(APP_SCREEN.BOOK_TICKET);
    };

    const _renderItem = ({item, index}: any) => {
        return <_orderListItem item={item} index={index} onPressItem={onPressItem}/>
    };

    return (
        <Block block style={styles.container}>
            <Screen>
                <ListView style={styles.listContainer}
                          data={orderDataSource}
                          ListHeaderComponent={() => {
                              return <Text style={styles.text}>
                                  Order History
                              </Text>
                          }}
                          horizontal={false}
                          showsVerticalScrollIndicator={false}
                          renderItem={_renderItem}
                          keyExtractor={(item, index) => index.toString()}
                          contentContainerStyle={{
                              marginTop: verticalScale(50),
                              paddingBottom: verticalScale(60)
                          }}
                />
            </Screen>
            <IconBack containerStyle={{marginTop: verticalScale(20)}} onPress={onPressBack}/>
        </Block>
    )
};

export default memo(OrderHistoryScreen, isEqual);
