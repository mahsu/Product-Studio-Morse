import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
    Button,
    Container,
    Header,
    Content,
    Form,
    Item,
    Input,
    Left,
    Icon,
    Body,
    Right,
    Title,
    List,
    ListItem,
    Thumbnail
} from "native-base";
import QRCodeScanner from "../../components/QRCodeScanner";
import {endpoint} from '../../util';

const authorizations = [
    {
        "institution": "Bank of America",
        "icon": require("../../../res/img/boa.png"),
        "type": "Premier Checking Account",
        "number": "#881928239"
    }
];

export default class Authorizations extends React.Component {
    static navigationOptions = ({navigation}) => {
        const state = navigation.state.params;
        return ({
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
                    <Right>
                        <Button transparent onPress={() => {
                            console.log(state);
                            state.handleBarCodePress();
                        }}>
                            <Icon name="ios-barcode-outline"/>
                        </Button>
                    </Right>
                </Header>
            )
        })
    };

    handleBarCodePress = () => {
        console.log("Handle bar code press");
        this.setState({isScanRequest: true});
    };

    componentDidMount() {
        this.props.navigation.setParams({handleBarCodePress: this.handleBarCodePress});
    }

    constructor(props) {
        super(props);

        this.state = {
            authorizations: authorizations,
            isScanRequest: false
        };
    }

    onBarCodeRead = (data, bounds) => {
        console.log(data, bounds);
        alert(JSON.stringify(data));
        this.setState({isScanRequest: false});
    };

    render() {
        if (this.state.isScanRequest) {
            return (
                <QRCodeScanner onBarCodeRead={this.onBarCodeRead}/>
            )
        }
        return (
            <Container>
                <Content style={{backgroundColor: "white"}}>
                    <List>
                        {this.state.authorizations.map((authorization, index) => {
                            return (
                                <ListItem avatar key="index">
                                    <Left>
                                        <Thumbnail source={authorization.icon}/>
                                    </Left>
                                    <Body>
                                    <Text style={{fontWeight: "bold"}}>{authorization.institution}</Text>
                                    <Text style={{color: "#787878"}} note>{authorization.type}</Text>
                                    </Body>
                                    <Right>
                                        <Text style={{color: "#787878"}} note>{authorization.number}</Text>
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


