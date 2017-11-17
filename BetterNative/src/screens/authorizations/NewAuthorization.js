import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Button, Container, Header, Content, Form, Item, Input, Left, Icon, Body, Right, Title, Card, CardItem, Row, Col, Footer} from "native-base";

const RequestedData = [
    {
        type: "Name",
        icon: "ios-person-outline"
    },
    {
        type: "Home Address",
        icon: "ios-home-outline"
    },
    {
        type: "SSN",
        icon: "card"
    },
    {
        type: "Cell Phone Number",
        icon: "ios-call-outline"
    }
]

export default class NewAuthorization extends React.Component {
    static navigationOptions = ({navigation}) => ({
        header: (
            <Header>
                <Left>
                    <Button transparent onPress={() => navigation.navigate("DrawerOpen")}>
                        <Icon name="menu"/>
                    </Button>
                </Left>
                <Body>
                    <Title>Auth Request</Title>
                </Body>
                <Right/>
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
                    <Row style={{backgroundColor:'#117ACA', padding:30}}>
                        <Col>
                            <Image 
                                source={require('../../../res/img/chase-white.png')}
                                style={{
                                    width: '100%',
                                    resizeMode: 'contain',
                                    height:60
                                }}>
                            </Image>
                        </Col>
                    </Row>

                    <Row style={{padding:10}}>
                        <Col>
                            <Text style={{fontSize:11}}>JP Morgan Chase has requested to receive your personal information for:</Text>
                            <Text />
                            <Text style={{fontStyle:"italic"}}>New Advantage Checking Account Opening</Text>
                        </Col>
                    </Row>

                    {RequestedData.map((Data, index) =>  {
                        return (
                            <Card key={index}>
                                <CardItem>
                                    <Body>
                                        
                                        <Text style={{alignItems:"center", justifyContent:"center"}}>
                                            <Icon name={Data.icon} style={{fontSize:20}} />   {Data.type}
                                        </Text>
                                    </Body>
                                </CardItem>
                            </Card>
                        )
                    })}
                </Content>
                <Footer>
                    <Row>
                        <Col>
                            <Button full danger style={{ height:55 }}>
                                <Text style={{color:"white"}}>Deny</Text>
                            </Button>
                        </Col>
                        <Col>
                            <Button full success style={{ height:55 }}>
                                <Text style={{color:"white"}}>Approve</Text>
                            </Button>
                        </Col>
                    </Row>
                </Footer>
            </Container>
        )
    }
}