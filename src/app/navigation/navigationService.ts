import * as React from 'react';
import {
    StackActions,
    NavigationContainerRef, NavigationAction
} from '@react-navigation/native';

export const navigationRef:
    React.RefObject<NavigationContainerRef> = React.createRef();

function navigate(name: string, params?: object): void {
    navigationRef.current?.navigate(name, params);
}

function dispatch(action: NavigationAction): void {
    navigationRef.current?.dispatch(action);
}

function replace(name: string, params?: object): void {
    navigationRef.current?.dispatch(StackActions.replace(name, params));
}

function push(name: string, params?: object): void {
    navigationRef.current?.dispatch(StackActions.push(name, params));
}

function pop(count: number): void {
    navigationRef.current?.dispatch(StackActions.pop(count));
}

function popToTop(): void {
    navigationRef.current?.dispatch(StackActions.popToTop());
}

function goBack(): void {
    navigationRef.current?.goBack()
}

function reset(routes?: any): void {
    navigationRef.current?.reset({
        routes: [{name: routes}],
    })
}

export const NavigationService = {
    navigate,
    dispatch,
    replace,
    push,
    goBack,
    reset,
    pop,
    popToTop
};
