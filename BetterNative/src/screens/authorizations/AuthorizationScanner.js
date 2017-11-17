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
import QRCodeScanner from "../../components/QRCodeScanner";
import PropTypes from 'prop-types';

export default class AuthorizationScanner extends React.Component {

    static propTypes = {
        onAuthorizationParsed: PropTypes.func
    };

    static defaultProps = {};

    onAuthorizationParsed = (data) => {
        if (typeof this.props.navigation.state.params.onAuthorizationParsed === 'function') {
            this.props.navigation.state.params.onAuthorizationParsed(data);
        } else {
            alert("onauthorizationparsed undefined");
        }
    };

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.setState({scanned: false});
    }

    componentDidMount() {
        console.log(this.props.navigation);
    }

    onBarCodeRead = (data, bounds) => {
        if (!this.state.scanned) {
            this.setState({scanned: true});
            this.props.navigation.goBack();
            this.onAuthorizationParsed(data);
        }
    };

    render() {
        return (
            <QRCodeScanner onBarCodeRead={this.onBarCodeRead}/>
        )
    }
}