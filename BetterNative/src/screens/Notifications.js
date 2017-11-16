import React from 'react';
import {StyleSheet, Text, ListView} from 'react-native';
import {Button, Container, Header, Content, Form, Item, Input, Left, Icon, Body, Right, Title, List, ListItem} from "native-base";
import moment from "moment";


export default class Notifications extends React.Component {

    static data = [{
        date: moment("2017-11-16"),
        text: "You have authorized JPMorgan Chase and Co"
    }, {
        date: moment("2017-11-16"),
        text: "New direct deposit setup by T-Mobile USA"
    }, {
        date: moment("2017-11-15"),
        text: "You have a pending request from American Express"
    }, {
        date: moment("2017-11-14"),
        text: "Verification of your passport is still pending"
    }, {
        date: moment("2017-11-14"),
        text: "You have added a new passport to your account"
    }];

    static navigationOptions = ({navigation}) => ({
        header: (
            <Header>
                <Left>
                    <Button transparent onPress={() => navigation.navigate("DrawerOpen")}>
                        <Icon name="menu"/>
                    </Button>
                </Left>
                <Body>
                <Title>Notifications</Title>
                </Body>
                <Right/>
            </Header>
        )
    });

    convertNotificationsArrayToMap(notifs) {
        let dateCategoryMap = {}; // Create the blank map
        notifs.forEach(function (notif) {
            let dateBucket = notif.date.format("LL");
            if (!dateCategoryMap[dateBucket]) {
                // Create an entry in the map for the category if it hasn't yet been created
                dateCategoryMap[dateBucket] = [];
            }
            dateCategoryMap[dateBucket].push(notif);
        });

        return dateCategoryMap;
    }


    constructor(props) {
        super(props);

        this.ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        });
    }

    componentWillMount() {
        //todo fetch notifications
        let processedData = this.convertNotificationsArrayToMap(Notifications.data);

        console.log(processedData);

        this.setState({
            dataSource: this.ds.cloneWithRowsAndSections(processedData)
        });
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
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={
                            (detail) => < ListItem><Text>{detail.text}</Text></ ListItem>
                        }
                        renderSectionHeader={
                            (sectionData, category) => < ListItem itemDivider><Text>{category}</ Text></ ListItem>
                        }
                    />
                </Content>
            </Container>
        )
    }
}