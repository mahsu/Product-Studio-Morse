import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Container, Header, Content, Form, Item, Input, Left, Icon, Body, Right, Title} from "native-base";


export default class Notifications extends React.Component {

    data = [{
        date: new Date(),
        text: "You have authorized JPMorgan Chase and Co"
    }, {
        date: new Date(),
        text: "New direct deposit setup by T-Mobile USA"
    }, {
        date: new Date(),
        text: "You have a pending request from American Express"
    }, {
        date: new Date(),
        text: "Verification of your passport is still pending"
    }, {
        date: new Date(),
        text: "You have added a new passport to your account"
    }];

    static navigationOptions = ({ navigation }) => ({
        header: (
            <Header>
                <Left>
                    <Button transparent onPress={() => navigation.navigate("DrawerOpen")}>
                        <Icon name="menu" />
                    </Button>
                </Left>
                <Body>
                <Title>Notifications</Title>
                </Body>
                <Right />
            </Header>
        )
    });

    const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    });

    constructor(props) {
        super(props);
        var CategoryMap = {};
        if (!CategoryMap[divider]) {
            CategoryMap[divider] = [];
        }
        CategoryMap[divider].push(row);
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
                        dataSource={ds.cloneWithRowsAndSections(CategoryMap)}
                        renderRow={
                            (detail) => < ListItem listItem ></ ListItem >
                        }
                        renderSectionHeader={
                            (sectionData, category) => < ListItem itemDivider theme={baseTheme}>< Text></ Text></ ListItem>
                        }
                    />
                </Content>
            </Container>
        )
    }
}