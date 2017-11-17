import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Root, Container, Header, Content, Form, Item, Input} from "native-base";
import Expo from "expo";
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import AppNavigator from "./src/navigation/AppNavigator.js";
import SidebarNavigator from "./src/navigation/SidebarNavigator.js";
import identityApp from "./src/redux/reducers";
import Signin from "./src/screens/Signin";
import {endpoint} from "./src/util";

let store = createStore(identityApp);

export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            fontsAreLoaded: false,
            authenticated: false
        }
    }

    authenticate = async (email, password) => {

        try {
            let response = await fetch(endpoint + 'auth/login', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                })
            });

            if (response.status === 200) {
                let responseJson = await response.json();
                console.log(responseJson);
                this.setState({
                    authenticated: true
                })
            }
        } catch(error) {
            console.error(error);
        }

        return;
    };

    unauthenticate = () => {
        return;
    };

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
                <Provider store={store}>
                    <Root>
                        <Signin onLoginSubmit={this.authenticate} email={'test@example.com'}/>
                    </Root>
                </Provider>
            );
        }

        return (
            <Provider store={store}>
                <Root>
                    <AppNavigator/>
                </Root>
            </Provider>
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
