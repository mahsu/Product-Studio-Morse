import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import {Button, Container, Header, Content, Form, Item, Input, Left, Icon, Body, Right, Title} from "native-base";


export default class Signin extends React.Component {

    static propTypes = {
        email: PropTypes.string,
        onLoginSubmit: PropTypes.func
    };

    static defaultProps = {
        email: '',
    };

    constructor(props) {
        super(props);
        this.state = {
            email: props.email,
            password: "password"
        }
    }

    changeHandler = (e) => {
        if (typeof this.props.onLoginSubmit === 'function') {
            this.props.onLoginSubmit(this.state.email, this.state.password);
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
                            <Input placeholder="Email" value={this.state.email}/>
                        </Item>
                        <Item last>
                            <Input placeholder="Password" value={this.state.password} secureTextEntry={true}/>
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
