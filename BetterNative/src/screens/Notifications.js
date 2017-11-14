import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Container, Header, Content, Form, Item, Input, Left, Icon, Body, Right, Title} from "native-base";


export default class Notifications extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        header: (
            <Header>
                <Left>
                    <Button transparent onPress={() => navigation.navigate("DrawerOpen")}>
                        <Icon name="menu" />
                    </Button>
                </Left>
                <Body>
                <Title>Notifications</Title>
                </Body>
                <Right />
            </Header>
        )
    });

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <Content>
                    <Header>
                        <Body>
                        <Text>Alerts & Updates</Text>
                        </Body>
                    </Header>

                    <Button block primary onPress={() => this.props.navigation.navigate('Profile', {name: 'Lucy'})}>
                        <Text>Notification</Text>
                    </Button>
                </Content>
            </Container>
        )
    }
}