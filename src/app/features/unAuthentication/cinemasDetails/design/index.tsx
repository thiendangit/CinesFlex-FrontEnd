import React from "react";
import {styles} from './style'
import {Block, IconBack, ListView, Screen, Text} from "@components";
import {useTranslation} from 'react-i18next';
import {verticalScale} from "@common";
import {_cinemasListItem} from "./components";
import {NavigationService} from "@navigation/navigationService";
import {APP_SCREEN} from "@navigation/screenTypes";

export const CinemasDetailsScreen = () => {
    const [t] = useTranslation();

    const _onGoBack = () => {
        NavigationService.goBack()
    };

    const onPressItem = (item: any) => {
        NavigationService.navigate(APP_SCREEN.BOOK_TICKET);
    };

    const _renderItem = ({item, index}: any) => {
        return <_cinemasListItem item={item} index={index} onPressItem={onPressItem}/>
    };

    return (
        <Block style={styles.container}>
            <ListView style={styles.listContainer}
                      data={[1, 2, 3, 4, 5, 6]}
                      ListHeaderComponent={() => {
                          return (
                              <Text style={styles.text}>
                                  CINEMAS LIST
                              </Text>
                          )
                      }}
                      renderItem={_renderItem}
                      keyExtractor={(item, index) => index.toString()}
                      contentContainerStyle={{
                          marginTop: verticalScale(60), alignSelf: 'center',
                          paddingBottom: verticalScale(80)
                      }}
            />
            <IconBack onPress={_onGoBack}/>
        </Block>
    )
};
