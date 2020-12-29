import React, {memo} from "react";
import {styles} from './style'
import {Block, IconBack, ListView, Screen, Text} from "@components";
import {useTranslation} from 'react-i18next';
import {NavigationService} from "@navigation/navigationService";
import isEqual from "react-fast-compare";
import {verticalScale} from "@common";
import {_favoriteListItem} from "./components";

export interface Props {
    route: {
        params: {
            text: string
        }
    },
}

const FavoriteListScreen: React.FC<Props> = (props): React.ReactElement => {
    const [t] = useTranslation();

    const onPressBack = () => {
        NavigationService.goBack()
    };

    const onPressItem = (item: any) => {
        // NavigationService.navigate(APP_SCREEN.BOOK_TICKET);
    };

    const _renderItem = ({item, index}: any) => {
        return <_favoriteListItem item={item} index={index} onPressItem={onPressItem}/>
    };

    return (
        <Block style={styles.container}>
            <Screen>
                <ListView style={styles.listContainer}
                          data={[1, 2, 3, 4, 5, 6]}
                          ListHeaderComponent={() => {
                              return <Text style={styles.text}>
                                  Favorite List
                              </Text>
                          }}
                          showsVerticalScrollIndicator={false}
                          renderItem={_renderItem}
                          keyExtractor={(item, index) => index.toString()}
                          contentContainerStyle={{
                              marginTop: verticalScale(50), alignSelf: 'center',
                              paddingBottom: verticalScale(60)
                          }}
                />
            </Screen>
            <IconBack containerStyle={{marginTop: verticalScale(20)}} onPress={onPressBack}/>
        </Block>
    )
};

export default memo(FavoriteListScreen, isEqual);
