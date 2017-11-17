import React from "react";
import {Image, ImageBackground} from "react-native";
import {Container, Content, Text, List, ListItem, Icon} from "native-base";
import Notifications from "../screens/Notifications.js";
import Authorizations from "../screens/authorizations/Authorizations.js";
import AuthorizationScanner from "../screens/authorizations/AuthorizationScanner";
import NewAuthorization from "../screens/authorizations/NewAuthorization.js";
import Wallet from "../screens/Wallet.js";
import Profile from "../screens/profile/Profile.js";
import Settings from "../screens/Settings.js";
import AddIdentity from "../screens/profile/AddIdentity.js";
import CameraTest from "../screens/test/CameraTest";
import QRCodeTest from "../screens/test/QRCodeTest";
import IdentityCamera from "../screens/profile/IdentityCamera";

import {DrawerNavigator, StackNavigator} from "react-navigation";

const routes = [
    {
        "name": "Notifications",
        "icon": "ios-notifications"
    },
    {
        "name": "Authorizations",
        "icon": "ios-card"
    },
    {
        "name": "Profile",
        "icon": "ios-person"
    },
    {
        "name": "Settings",
        "icon": "ios-cog"
    },
    /*{
        "name": "QRCodeTest",
        "icon": "contract"
    },
    {
        "name": "CameraTest",
        "icon": "contract"
    },
    {
        "name": "NewAuthorization",
        "icon": "contract"
    },
    {
        "name": "Logout",
        "icon": "wallet"
    }*/
];

class Sidebar extends React.Component {

    render() {
        return (
            <Container>
                <Content style={{backgroundColor:"rgb(82,96,113)"}}>
                    <ImageBackground
                        source={require('../../res/img/city.png')}
                        style={{
                            height: 120,
                            alignSelf: "stretch",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                    <Image
                        square
                        style={{height: 80, width: 80}}
                        source={require('../../res/img/morse.png')}/>
                    </ImageBackground>
                    <List
                        dataArray={routes}
                        renderRow={data => {
                            return (
                                <ListItem
                                    style={{backgroundColor:"rgb(82,96,113)"}}
                                    button
                                    onPress={() => this.props.navigation.navigate(data.name)}>
                                    <Text style={{color:"#bac2c6"}}><Icon name={data.icon} style={{fontSize:15, color:"#bac2c6"}} />  {data.name}</Text>
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
    Authorizations: {screen: Authorizations},
    AuthorizationScanner: {screen: AuthorizationScanner},
    NewAuthorization: {screen: NewAuthorization}
});

const NewAuthorizationNavigator = StackNavigator({
    NewAuthorization: {screen: NewAuthorization}
});

const WalletNavigator = StackNavigator({
    Wallet: {screen: Wallet}
});

const ProfileNavigator = StackNavigator({
    Profile: {screen: Profile},
    AddIdentity: {screen: AddIdentity},
    IdentityCamera: {screen: IdentityCamera}
});

const SettingsNavigator = StackNavigator({
    Settings: {screen: Settings}
});

const SidebarNavigator = DrawerNavigator(
    {
        Notifications: {screen: NotificationsNavigator},
        Authorizations: {screen: AuthorizationsNavigator},
        NewAuthorization: {screen: NewAuthorizationNavigator},
        Wallet: {screen: WalletNavigator},
        Profile: {screen: ProfileNavigator},
        Settings: {screen: SettingsNavigator},
        CameraTest: {screen: CameraTest},
        QRCodeTest: {screen: QRCodeTest}
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
