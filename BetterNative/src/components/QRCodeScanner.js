'use strict';
import React, { Component } from 'react';
import {
    AppRegistry,
    Dimensions,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from 'react-native';
import PropTypes from 'prop-types';
import Camera from 'react-native-camera';

export default class QRCodeScanner extends Component {

    static propTypes = {
        email: PropTypes.string,
        onBarCodeRead: PropTypes.func
    };

    static defaultProps = {
        email: '',
    };

    barcodeHandler = ({data, bounds}) => {
        if (typeof this.props.onBarCodeRead === 'function') {
            this.props.onBarCodeRead(data, bounds);
        }
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Camera
                    ref={(cam) => {
                        this.camera = cam;
                    }}
                    onBarCodeRead={this.barcodeHandler}
                    barCodeTypes={[Camera.constants.BarCodeType.qr]}
                    style={styles.preview}
                    aspect={Camera.constants.Aspect.fill}>
                </Camera>
            </View>
        );
    }

    takePicture() {
        const options = {};
        //options.location = ...
        this.camera.capture({metadata: options})
            .then((data) => console.log(data))
            .catch(err => console.error(err));
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        color: '#000',
        padding: 10,
        margin: 40
    }
});
