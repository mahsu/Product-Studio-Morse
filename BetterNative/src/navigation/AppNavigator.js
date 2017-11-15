import React, { Component } from "react";
import Signin from "../screens/Signin.js";
import Notifications from "../screens/Notifications.js";

import { StackNavigator } from "react-navigation";
import SidebarNavigator from "./SidebarNavigator";

const AppNavigator = StackNavigator(
    {
        Drawer: {screen: SidebarNavigator},
        Notifications: {screen: Notifications}
    },
    {
        initialRouteName: "Drawer",
        headerMode: "none",

    }
);

export default AppNavigator;