import React, {useEffect} from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../store/config/color';
import { useForm, Controller } from 'react-hook-form';
import {useStoreState, useStoreActions} from 'easy-peasy'
import { Toast} from 'native-base';
import {NavigationEvents, navigationEvents} from 'react-navigation'



const CreateTodoScreen =  ({navigation})  => {
    const { handleSubmit, control, errors, reset } = useForm();
    const {isLoading, requestResponse} = useStoreState(state => state.todo)
    const {addTodo , clearResponse} = useStoreActions(state => state.todo)

    useEffect(() => {
        requestResponse ? 
            handleNotification()
        : null
    }, [requestResponse])

    const handleNotification = () => {
        Toast.show({
            text: requestResponse,
            type:'danger'
        })
        clearResponse();
    }

    const onSubmit = (data) => {
        addTodo(data)
    }
    return (
        <View style={styles.parentStyle}>
            <Text style={{fontSize:25, marginBottom: 20, marginHorizontal: 10, color: colors.base}}>Create Todo</Text>
            <NavigationEvents
                onWillBlur = {()=>reset()}
            />
            <Controller
                rules={{
                    required: { value: true, message: 'Title is Required' },
                }}
                name="title"
                control={control}
                defaultValue=''
                render={({ onChange, value }) => (
                    <Input
                        error={errors.title}
                        errorMessage={errors?.title?.message}
                        placeholder='Title'
                        leftIcon={
                            <Icon
                            name='file'
                            size={24}
                            color= {colors.base}
                            />
                        }
                        value={value}
                        autoCapitalize='none'
                        autoCorrect ={false}
                        onChangeText={(title) => onChange(title)}
                    />
                )}
            />
            <Button
                buttonStyle={{backgroundColor: 'green'}}   
                title="Create Todo"
                onPress = { handleSubmit(onSubmit)}
            />
        </View>
    )
}

const styles = StyleSheet.create({

    parentStyle: {
        justifyContent:"center",
        flex: 1,
        margin:20
    },

    textStyle: {
        fontSize: 20
    },

})

CreateTodoScreen.navigationOptions = () => {
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
               <Icon name='plus'
               style ={{color: colors.base, fontSize: 20}}/>
           )
       }
    };
  };

export default CreateTodoScreen;