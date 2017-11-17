import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {Button, Container, Header, Content, Form, Item, Input, Left, Icon, Body, Right, Title, Card, CardItem, Row, Col, Picker} from "native-base";

const IdStyle = StyleSheet.create({
    content: {
      flex: 0.7,
      flexDirection:'column',
      justifyContent: 'center'
    },
    label: {
      flex: 0.3,
      alignItems: 'center'
    },
    icon: {
      fontSize: 65
    },
    approvedIcon: {
      fontSize: 15
    },
});

const Identities = [
    {
        key: "String1",
        type: "Address",
        status: "Approved",
        date: new Date(),
        content: "2 West Loop Road\nApt 131\nNew York, NY 10044",
        message: "Your address was confirmed by the US postal service on 9/22/2016"
    },
    {
        key: "String2",
        type: "SSN",
        status: "Approved",
        date: new Date(),
        content: "044-**-****",
        message: "Your SSN was confirmed by the Social Security Administration on 8/14/2016"
    },
    {
        key: "String3",
        type: "Passport",
        status: "Pending",
        date: new Date(),
        content: "United States of America\n#43819929181\nExpires: 12/20/2019",
        message: "Your Passport verification is still pending and should be approved within 2 hours"
    },
]

const IdentityIcons = {
    Passport: "ios-plane-outline",
    Address: "ios-home-outline",
    SSN: "card"
}

const StatusIcons = {
    Approved: "md-checkmark-circle-outline",
    Pending: "ios-clock-outline",
    Denied: "ios-close-circle-outline",
}

const StatusColors = {
    Approved: "green",
    Pending: "#969300",
    Denied: "red"
}

const IdTypes = [
    {"type": "Passport"},
    {"type": "Driver's License"},
    {"type": "Health Insurance Card"},
    {"type": "State ID"},
    {"type": "Social Security Card"},
    {"type": "Birth Certificate"},
    {"type": "Student ID"},
    {"type": "DOD ID"},
    {"type": "VA Document"},
    {"type": "Native American Tribal Document"}
];

export default class Profile extends React.Component {
    onNewID(value: string) {
        // do something
    }

    static navigationOptions = ({navigation}) => ({
        header: (
            <Header>
                <Left>
                    <Button transparent onPress={() => navigation.navigate("DrawerOpen")}>
                        <Icon name="menu"/>
                    </Button>
                </Left>

                <Body>
                    <Title>Profile</Title>
                </Body>
                
                <Right>
                    <Button transparent onPress={() => navigation.navigate("AddIdentity")}>
                        <Icon name="ios-add"/>

                    </Button>
                </Right>
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
                    {Identities.map((Identity, index) =>  {
                        return (
                            <Card key={index}>
                                <CardItem>
                                    <Body>
                                        <Row>
                                            <Col style={IdStyle.label}>
                                                <Text><Icon name={IdentityIcons[Identity.type]} style={IdStyle.icon} /></Text>

                                                <Text style={{color: StatusColors[Identity.status]}} onPress={() => alert(Identity.message)}>{Identity.type} <Icon name={StatusIcons[Identity.status]} style={[IdStyle.approvedIcon, {color: StatusColors[Identity.status]}]} /></Text>
                                            </Col>
                                            <Col style={IdStyle.content}><Text>{Identity.content}</Text></Col>
                                        </Row>
                                    </Body>
                                </CardItem>
                            </Card>
                        )
                    })}
                </Content>
            </Container>
        )
    }
}