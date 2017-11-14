import React, { Component } from "react";
import Signin from "../screens/Signin.js";
import Notifications from "../screens/Notifications.js";

import { StackNavigator } from "react-navigation";

const AppNavigator = StackNavigator(
    {
        Signin: { screen: Signin },
        Notifications: {screen: Notifications}
    },
    {
        initialRouteName: "Signin",
    }
);

export default AppNavigator;