import React from "react";
import {AppRegistry, Image, StatusBar} from "react-native";
import {Container, Content, Text, List, ListItem} from "native-base";
import Notifications from "../screens/Notifications.js";
import Authorizations from "../screens/Authorizations.js";
import Wallet from "../screens/Wallet.js";
import Profile from "../screens/Profile.js";
import Settings from "../screens/Settings.js";
import AddIdentity from "../screens/AddIdentity.js";

import { DrawerNavigator, StackNavigator } from "react-navigation";

const routes = ["Notifications", "Authorizations", "Wallet", "Profile", "Settings"/*, "Logout"*/];

class Sidebar extends React.Component {

    render() {
        return (
            <Container>
                <Content>
                    <Image
                        source={{
                            uri: "https://github.com/GeekyAnts/NativeBase-KitchenSink/blob/master/img/drawer-cover.png?raw=true"
                        }}
                        style={{
                            height: 120,
                            alignSelf: "stretch",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                        <Image
                            square
                            style={{height: 80, width: 70}}
                            source={{
                                uri: "https://github.com/GeekyAnts/NativeBase-KitchenSink/blob/master/img/logo.png?raw=true"
                            }}
                        />
                    </Image>
                    <List
                        dataArray={routes}
                        renderRow={data => {
                            return (
                                <ListItem
                                    button
                                    onPress={() => this.props.navigation.navigate(data)}>
                                    <Text>{data}</Text>
                                </ListItem>
                            );
                        }}
                    />
                </Content>
            </Container>
        );
    }
}

const NotificationsNavigator = StackNavigator({
    Notifications: {screen: Notifications}
});

const AuthorizationsNavigator = StackNavigator({
    Authorizations: {screen: Authorizations}
});

const WalletNavigator = StackNavigator({
    Wallet: {screen: Wallet}
});

const ProfileNavigator = StackNavigator({
    Profile: {screen: Profile},
    AddIdentity: {screen: AddIdentity}
});

const SettingsNavigator = StackNavigator({
    Settings: {screen: Settings}
});

const SidebarNavigator = DrawerNavigator(
    {
        Notifications: {screen: NotificationsNavigator},
        Authorizations: {screen: AuthorizationsNavigator},
        Wallet: {screen: WalletNavigator},
        Profile: {screen: ProfileNavigator},
        Settings: {screen: SettingsNavigator},
        //Logout: {screen: Logout}
    },
    {
        initialRouteName: "Notifications",
        contentOptions: {
            activeTintColor: "#e91e63"
        },
        contentComponent: props => <Sidebar {...props} />
    }
);
export default SidebarNavigator;
