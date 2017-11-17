import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Container, Header, Content, Form, Item, Input, Left, Icon, Body, Right, Title, List, ListItem, Thumbnail} from "native-base";
import {endpoint} from '../util';

export default class Authorizations extends React.Component {
    static navigationOptions = ({navigation}) => ({
        header: (
            <Header>
                <Left>
                    <Button transparent onPress={() => navigation.navigate("DrawerOpen")}>
                        <Icon name="menu"/>
                    </Button>
                </Left>
                <Body>
                    <Title>Authorizations</Title>
                </Body>
                <Right/>
            </Header>
        )
    });

    constructor(props) {
        super(props);

        this.state = {
            authorizations: [
                {
                    "institution": "Bank of America",
                    "icon": require("../../res/img/boa.png"),
                    "type": "Premier Checking Account",
                    "number": "#881928239"
                }
            ]
        };
    }

    render() {
        return (
            <Container>
                <Content style={{backgroundColor:"white"}}>
                  <List>
                    {this.state.authorizations.map((authorization, index) =>  {
                        return (
                            <ListItem avatar key="index">
                              <Left>
                                <Thumbnail source={authorization.icon}  />
                              </Left>
                              <Body>
                                <Text style={{fontWeight:"bold"}}>{authorization.institution}</Text>
                                <Text style={{color:"#787878"}} note>{authorization.type}</Text>
                              </Body>
                              <Right>
                                <Text style={{color:"#787878"}} note>{authorization.number}</Text>
                              </Right>
                            </ListItem>
                        )
                    })}
                  </List>
                </Content>
            </Container>
        )
    }
}


