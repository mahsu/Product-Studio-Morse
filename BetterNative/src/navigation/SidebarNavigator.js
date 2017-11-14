import React from "react";
import {AppRegistry, Image, StatusBar} from "react-native";
import {Container, Content, Text, List, ListItem} from "native-base";
import Notifications from "../screens/Notifications.js";
import Authorizations from "../screens/Authorizations.js";
import Wallet from "../screens/Wallet.js";
import Profile from "../screens/Profile.js";
import Settings from "../screens/Settings.js";

import { DrawerNavigator } from "react-navigation";

const routes = ["Notifications", "Authorizations", "Wallet", "Profile", "Settings"/*, "Logout"*/];

class Sidebar extends React.Component {
    render() {
        return (
            <Container>
                <Content>
                    <Image
                        source={{
                            uri: "https://github.com/GeekyAnts/NativeBase-KitchenSink/raw/react-navigation/img/drawer-cover.png"
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
                                uri: "https://github.com/GeekyAnts/NativeBase-KitchenSink/raw/react-navigation/img/logo.png"
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

const SidebarNavigator = DrawerNavigator(
    {
        Notifications: {screen: Notifications},
        Authorizations: {screen: Authorizations},
        Wallet: {screen: Wallet},
        Profile: {screen: Profile},
        Settings: {screen: Profile},
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
