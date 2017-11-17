import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Root, Container, Header, Content, Form, Item, Input} from "native-base";
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import AppNavigator from "./src/navigation/AppNavigator.js";
import SidebarNavigator from "./src/navigation/SidebarNavigator.js";
import identityApp from "./src/redux/reducers";

let store = createStore(identityApp);

class AppContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            fontsAreLoaded: false,
            authenticated: false
        }
    }

    authenticate() {
        //todo set state to authenticated
        return;
    }

    render() {

        if (!this.state.authenticated) {
            return (
                <Provider store={store}>
                    <Root>
                        <AppNavigator/>
                    </Root>
                </Provider>
            );
        }

        return (
            <Provider store={store}>
                <Root>
                    <SidebarNavigator/>
                </Root>
            </Provider>
        )

    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        active: ownProps.filter === state.visibilityFilter
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick: () => {
            dispatch(setVisibilityFilter(ownProps.filter))
        }
    }
};

const ConnectedApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppContainer);

export default ConnectedApp;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
