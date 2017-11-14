import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Container, Header, Content, Form, Item, Input, Left, Icon, Body, Right, Title} from "native-base";


export default class Signin extends React.Component {
    static navigationOptions = {
        title: 'Home',
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <Content>
                    <Form>
                        <Item>
                            <Input placeholder="Username"/>
                        </Item>
                        <Item last>
                            <Input placeholder="Password"/>
                        </Item>
                    </Form>
                    <Button block primary onPress={() => this.props.navigation.navigate('Profile', {name: 'Lucy'})}>
                        <Text>Login</Text>
                    </Button>
                </Content>
            </Container>
        )
    }
}

Signin.navigationOptions = ({ navigation }) => ({
    header: (
        <Header>
            <Left>
                <Button transparent onPress={() => navigation.navigate("DrawerOpen")}>
                    <Icon name="menu" />
                </Button>
            </Left>
            <Body>
            <Title>Signin</Title>
            </Body>
            <Right />
        </Header>
    )
});