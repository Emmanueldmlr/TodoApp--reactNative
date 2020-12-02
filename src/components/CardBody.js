import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {  CardItem, Body} from 'native-base';

const CardBody = (props) => {
    return (
        <CardItem>
            <Body>
                <View>
                    <Text>{props.title}</Text>
                </View>
            </Body>
        </CardItem>
    )
}

export default CardBody
