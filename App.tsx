import React, {Suspense} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import configureStore from '@store/store';
import I18n from '@library/utils/i18n/i18n';
import {AppContainer} from '@navigation/AppNavigation';
import {Transitioning} from 'react-native-reanimated';
import {_transitionApp, transition} from '@transition';
import {I18nextProvider} from 'react-i18next';
import {PersistGate} from "redux-persist/es/integration/react";

// console.disableYellowBox = true;
const styles = StyleSheet.create({
    root: {
        flex: 1
    }
});
export const MyApp = () => {
    const {store} = configureStore();
    const {persistor} = configureStore();
    return (
        <SafeAreaProvider>
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <I18nextProvider i18n={I18n}>
                        <Suspense fallback={<View/>}>
                            <Transitioning.View style={styles.root} transition={transition} ref={_transitionApp}>
                                <AppContainer/>
                            </Transitioning.View>
                        </Suspense>
                    </I18nextProvider>
                </PersistGate>
            </Provider>
        </SafeAreaProvider>
    );
};
