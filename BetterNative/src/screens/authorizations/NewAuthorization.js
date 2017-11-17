import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Button, Container, Header, Content, Form, Item, Input, Left, Icon, Body, Right, Title, Card, CardItem, Row, Col, Footer} from "native-base";
import {third_party} from "../../util";

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
];

export default class NewAuthorization extends React.Component {
    static navigationOptions = ({navigation}) => ({
        header: (<View/>)
    });

    constructor(props) {
        super(props);
    }

    approveHandler = async () => {
        console.log("approved");
        let body = {
            customer: {
                name: "John Doe",
                email: "jdoe@cornell.edu",
                ssn: "044-123-6789",
                address: {
                    lineOne: "2 West Loop Road",
                    lineTwo: "Apt 131",
                    city: "New York",
                    state: "NY",
                    zip: "10044"
                }
            }
        };

        try {
        let response = await fetch(third_party + 'sendInfo', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });

        if (response.status === 200) {
            let responseJson = await response.json();
            console.log(responseJson);
            //store.dispatch(setLogin(responseJson.token));
            this.setState({
                authenticated: true
            })
        }
    } catch(error) {
        console.error(error);
    }

        this.props.navigation.goBack();
    };

    denyHandler = () => {
        this.props.navigation.goBack();
    };

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
                            <Button full danger style={{ height:55 }} onPress={() => {this.denyHandler()}}>
                                <Text style={{color:"white"}}>Deny</Text>
                            </Button>
                        </Col>
                        <Col>
                            <Button full success style={{ height:55 }} onPress={() => {this.approveHandler()}}>
                                <Text style={{color:"white"}}>Approve</Text>
                            </Button>
                        </Col>
                    </Row>
                </Footer>
            </Container>
        )
    }
}