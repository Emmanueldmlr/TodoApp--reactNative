import React, {Fragment} from 'react'
import { View, Text, ScrollView,StyleSheet } from 'react-native'
import colors from '../../store/config/color';
import Icon from 'react-native-vector-icons/FontAwesome';
import FinishedCardComponent from '../../components/FinishedCardComponent';
import { useStoreState, useStoreActions } from 'easy-peasy';

const FinishedTodoScreen = () => {
    const {todos} = useStoreState((state)=>state.todo)
    const {updateTodos}  = useStoreActions(actions => actions.todo)

    const filterTodos = () => {
        return todos.filter(todo => {
            return todo.main.isCompleted === 1;
        })
    }

    const handleTodoUpdate = (id) => {
        const payload = {
            'id' : id,
            data: {
                isCompleted: 0
            }
        }
        updateTodos(payload)
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.parentStyle}>
            <View> 
                <Text style={styles.headerTextStyle}>
                    Finished Tasks <Icon style={{color: colors.base, fontSize: 30}}  name="hand-peace-o" />
                </Text>
                <Text style={{fontSize: 16}}>
                    Here are your finished tasks
                </Text>
            </View> 
            <View style ={ styles.cardStyle}>
                {
                    filterTodos().length > 0 ? 
                        filterTodos().map((todo)=> (
                            <Fragment key={todo.main.token}>
                                <FinishedCardComponent handleTodoUpdate={(id) => handleTodoUpdate(id)} data={todo.main}/>
                            </Fragment>
                        ))
                    :
                    <Text style={{fontSize:18, color: 'red', alignSelf:"center"}}>You havent completed any task yet</Text>
                    }
            </View>           
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    parentStyle : {
        marginTop: 60,
        marginHorizontal: 20,
        flex:1
    },
    headerTextStyle : {
        fontSize: 30,
        fontWeight: "bold",
        color: colors.base
    },

    cardStyle: {
        marginVertical: 30,
        minHeight: 100,
    } 
})

FinishedTodoScreen.navigationOptions = () => {
    return {
       tabBarOptions: {
        activeTintColor: colors.base,
        inactiveTintColor: 'gray',
        labelStyle:{
            fontSize: 14
        }
       },
       tabBarIcon: () => {
           return(
               <Icon name='archive'
               style ={{color: colors.base, fontSize: 20}}/>
           )
       }
    };
  };

export default FinishedTodoScreen;