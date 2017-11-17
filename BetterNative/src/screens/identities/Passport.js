import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Container, Header, Content, Form, Item, Input, Left, Icon, Body, Right, Title, Card, CardItem, Row, Col} from "native-base";

import {IdStyle} from './IdStyle'

export default class IdentityPassport extends Component {
    render() {
        return (
            <Card>
                <CardItem>
                    <Body>
                        <Row>
                            <Col style={IdStyle.label}>
                                <Text><Icon name='ios-plane-outline' style={IdStyle.icon} /></Text>

                                <Text style={IdStyle.approved}>SSN <Icon name='md-checkmark-circle-outline' style={[IdStyle.approved, IdStyle.approvedIcon]} /></Text>
                            </Col>
                            <Col style={IdStyle.content}>
                                <Text>United States of America</Text>
                                <Text>#43819929181</Text>
                                <Text>Expires: 12/20/2019</Text>
                            </Col>
                        </Row>
                    </Body>
                </CardItem>
            </Card>
        )
    }
}