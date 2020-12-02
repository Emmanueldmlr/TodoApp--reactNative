import React from 'react'
import { Text, StyleSheet} from 'react-native'
import { Body, Left} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useStoreActions } from 'easy-peasy';


const options = { year: "numeric", month: "long", day: "numeric" }
const FooterDetails = ({id, date}) => {
    const {deleteTodo} = useStoreActions(actions => actions.todo)
    const handleDeleteTodo = (id) => {
        deleteTodo(id)
    }
    return (
        <>
            <Left>
                <Text style={styles.footerTextStyle}> {new Date(date).toLocaleDateString(undefined, options)}</Text>
            </Left>
            <Body>          
                <TouchableOpacity onPress={()=>handleDeleteTodo(id)}>
                    <Icon style={{alignSelf:"center", color: 'red', fontSize: 18}}  name="trash" />
                    <Text style={styles.footerTextStyle}>Delete</Text>
                </TouchableOpacity>
            </Body>
        </>
    )
}

const styles = StyleSheet.create({
    footerTextStyle: {
        fontWeight: 'bold',
        alignSelf: "center"
    }
   
})

export default FooterDetails
