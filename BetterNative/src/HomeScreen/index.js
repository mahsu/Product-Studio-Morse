import React, { Component } from "react";
import Signin from "../Signin.js";

import { StackNavigator } from "react-navigation";

const AppNavigator = StackNavigator(
    {
        Signin: { screen: Signin }
    },
    {
        initialRouteName: "Signin",
    }
);

export default AppNavigator;