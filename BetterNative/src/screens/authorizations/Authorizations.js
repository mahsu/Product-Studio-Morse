import React from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
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

const chase = {
    "institution": "Chase",
    "icon": require("../../../res/img/jpm.png"),
    "type": "Advantage Checking",
    "number": "-",
    "status": "Pending"
};

const authorizations = [
    {
        "institution": "Bank of America",
        "icon": require("../../../res/img/boa.png"),
        "type": "Premier Checking Account",
        "number": "#881928239",
        "status": "Approved"
    },
    {
        "institution": "HSBC",
        "icon": require("../../../res/img/hsbc.png"),
        "type": "Savings Plus",
        "number": "#22919235",
        "status": "Approved"
    }
];

const colors = {
    Approved: "green",
    Pending: "#969300"
};

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
                        <Button transparent onPress={() => navigation.navigate("AuthorizationScanner", state)}>
                            <Icon name="ios-barcode-outline"/>
                        </Button>
                    </Right>
                </Header>
            )
        })
    };

    addAuthorization = (data) => {
        this.state.authorizations.push(chase);
        this.setState({authorizations: this.state.authorizations});
    };

    componentDidMount() {
        this.props.navigation.setParams({
            onAuthorizationParsed: this.onAuthorizationParsed,
            onAuthorizationAdd: this.addAuthorization
        });
    }

    onAuthorizationParsed = (payload) => {
        //called when we get the qr code payload from the authorizationscanner
        var newauth = {onAuthorizationAdd: this.addAuthorization};
        this.props.navigation.navigate("NewAuthorization", newauth);
        //alert(payload);
    };

    constructor(props) {
        super(props);

        this.state = {
            authorizations: authorizations
        };
    }


    render() {
        return (
            <Container>
                <Content style={{backgroundColor: "white"}}>
                    <List>
                        {this.state.authorizations.map((authorization, index) => {
                            let spinner = null;

                            if (authorization.status == "Pending")
                                spinner = <ActivityIndicator style={{width: 28, height: 10}} color="#969300"/>

                            return (
                                <ListItem avatar key={index}>
                                    <Left>
                                        <Thumbnail source={authorization.icon}/>
                                    </Left>
                                    <Body>
                                    <Text style={{fontWeight: "bold"}}>{authorization.institution}</Text>
                                    <Text style={{color: "#787878"}} note>{authorization.type}</Text>
                                    <Text style={{color: "#787878"}} note>{authorization.number}</Text>
                                    </Body>
                                    <Right>
                                        <Text style={{fontWeight: "bold"}}> </Text>
                                        <Text style={{color: colors[authorization.status]}}>

                                            {authorization.status}
                                        </Text>
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


