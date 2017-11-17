import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {
    Button,
    Container,
    Header,
    Content,
    Form,
    Item,
    Input,
    Left,
    Icon,
    Body,
    Right,
    Title,
    Card,
    CardItem,
    Row,
    Col,
    Picker
} from "native-base";
import QRCodeScanner from "../components/QRCodeScanner";

export default class QRCodeTest extends React.Component {

    constructor(props) {
        super(props);
    }

    onBarCodeRead = (data, bounds) => {
        console.log(data,bounds);
        alert(data);
    };

    render() {
        return (
            <QRCodeScanner onBarCodeRead={this.onBarCodeRead}/>
        )
    }
}