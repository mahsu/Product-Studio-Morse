import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Root, Container, Header, Content, Form, Item, Input} from "native-base";
import Expo from "expo";
import AppNavigator from "./src/navigation/MainNavigator.js";
import SidebarNavigator from "./src/navigation/SidebarNavigator.js";



export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            fontsAreLoaded: false,
            authenticated: true
        }
    }

    authenticate() {
        //todo set state to authenticated
        return;
    }

    async componentWillMount() {
        await Expo.Font.loadAsync({
            'Ionicons': require('native-base/Fonts/Ionicons.ttf'),
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        });
        this.setState({fontsAreLoaded: true});
    }

    render() {
        if (!this.state.fontsAreLoaded) {
            return <Expo.AppLoading/>;
        }
        if (!this.state.authenticated) {
            return (
                <Root>
                    <AppNavigator/>
                </Root>
            );
        }

        return (
            <Root>
                <SidebarNavigator/>
            </Root>
        )

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
