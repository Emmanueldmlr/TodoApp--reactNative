import React, { Fragment, useEffect, useState} from 'react'
import { View, Text, StyleSheet, ScrollView, ActivityIndicator} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../../store/config/color';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeCardComponent from '../../components/HomeCardComponent';
import { useStoreState, useStoreActions } from 'easy-peasy';
import {setUserToken, token} from '../../store/config/index'
import { cos } from 'react-native-reanimated';
import { FlatList } from 'react-native-gesture-handler';


const HomeScreen = () => {
    const [user, setUser] = useState(null)
     const {isLoading, todos} = useStoreState((state)=>state.todo)
     const {fetchTodos, updateTodos}  = useStoreActions(actions => actions.todo)
    useEffect(() => { 
        async function fetchData() {
             const userDetails = await AsyncStorage.getItem(setUserToken);
             setUser(JSON.parse(userDetails))
        }
        fetchData();
        fetchTodos()
    }, [])

    const filterTodos = () => {
        return todos.filter(todo => {
            return todo.main.isCompleted === 0;
        })
    }

    const handleTodoUpdate = (id) => {
        const payload = {
            'id' : id,
            data: {
                isCompleted: 1
            }
        }
        updateTodos(payload)
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.parentStyle}>
            { isLoading
            ? 
            <> 
                <ActivityIndicator size="small" color={colors.base} />
                <Text style={styles.textStyle} >Loading...</Text> 
            </>
            :
            <>
                <View> 
                    <Text style={styles.headerTextStyle}>
                        {
                            user ? <>{user.nickname}, <Icon style={{color: colors.base, fontSize: 30}}  name="angellist" /></> 
                            : null
                        }
                        
                    </Text>
                    <Text style={{fontSize: 16}}>
                        Welcome, these are your pending tasks
                    </Text>
                </View> 
                <View style ={ styles.cardStyle}>
                    {
                        filterTodos().length > 0 ? 
                            filterTodos().map((todo)=> (
                                <Fragment key={todo.main.token}>
                                    <HomeCardComponent handleTodoUpdate={(id) => handleTodoUpdate(id)} data={todo.main}/>
                                </Fragment>
                            ))
                        :
                        <Text style={{fontSize:18, color: 'red', alignSelf:"center"}}>No Pending Task</Text>
                    }
                </View>
            </>
        }
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
    },
    textStyle : {
        alignSelf: 'center',
        fontSize: 18
    }
})


HomeScreen.navigationOptions = () => {
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
               <Icon name='home'
               style ={{color: colors.base, fontSize: 20}}/>
           )
       }
    };
  };

export default HomeScreen;