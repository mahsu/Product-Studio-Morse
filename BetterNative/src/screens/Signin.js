import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import {Button, Container, Header, Content, Form, Item, Input, Left, Icon, Body, Right, Title} from "native-base";


export default class Signin extends React.Component {

    static propTypes = {
        value: PropTypes.string,
        onLoginSubmit: PropTypes.func
    };

    static defaultProps = {
        value: ''
    };

    constructor(props) {
        super(props);
    }

    changeHandler = (e) => {
        if (typeof this.props.onLoginSubmit === 'function') {
            this.props.onLoginSubmit(e.target.value);
        }
    };

    render() {
        return (
            <Container>
                <Header>
                    <Left/>
                    <Body>
                    <Title>Signin</Title>
                    </Body>
                    <Right/>
                </Header>
                <Content>
                    <Form>
                        <Item>
                            <Input placeholder="Username" value={this.props.value}/>
                        </Item>
                        <Item last>
                            <Input placeholder="Password"/>
                        </Item>
                    </Form>
                    <Button block primary onPress={this.changeHandler}>
                        <Text>Login</Text>
                    </Button>
                </Content>
            </Container>
        )
    }
}

Signin.navigationOptions = ({navigation}) => ({
    header: (
        <Header>
            <Left>
                <Button transparent onPress={() => navigation.navigate("DrawerOpen")}>
                    <Icon name="menu"/>
                </Button>
            </Left>
            <Body>
            <Title>Signin</Title>
            </Body>
            <Right/>
        </Header>
    )
});
