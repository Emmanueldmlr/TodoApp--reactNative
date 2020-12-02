import React from 'react'
import { Text, StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import {  Card, CardItem, Body, Left, Right} from 'native-base';
import colors from '../store/config/color';
import CardBody from './CardBody';
import FooterDetails from './FooterDetails';
import { TouchableOpacity } from 'react-native-gesture-handler';

const HomeCardComponent = ({data, handleTodoUpdate}) => {
    return (
        <Card>
            <CardBody title={data.title} />
            <CardItem footer bordered>
                <FooterDetails date={data.created_at} id={data.id}/>
                <Right>
                    <TouchableOpacity onPress={()=>handleTodoUpdate(data.id)} >
                        <Icon style={{alignSelf:"center", color: colors.base, fontSize: 18}}  name="check" />
                        <Text style={styles.footerTextStyle}>Mark</Text>
                    </TouchableOpacity>
                </Right>
            </CardItem>
        </Card>
    )
}

const styles = StyleSheet.create({
    footerTextStyle: {
        fontWeight: 'bold',
        alignSelf: "center"
    }
   
})

export default HomeCardComponent
