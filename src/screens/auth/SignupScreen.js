import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { Input, Button } from 'react-native-elements';
import {useStoreState, useStoreActions} from 'easy-peasy'
import AuthSwitcher from '../../components/AuthSwitcher'
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../store/config/color';
import { useForm, Controller } from 'react-hook-form';
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


const SignupScreen =  ()  => {
    const { handleSubmit, control, errors } = useForm();
    const {isLoading, requestResponse} = useStoreState(state => state.auth)
    const {register, clearResponse} = useStoreActions(state => state.auth)

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
        register(data)
    };

    return (
        <View style={styles.parentStyle}>
            <View style={styles.headerWrapper}>
                    <Icon
                    name='user-plus'
                    style ={styles.iconStyle}
                    />
            </View>
            <Text style={{fontSize:25, marginBottom: 20, marginHorizontal: 10, color: colors.base}}>SIGN UP</Text>
            <Controller
                rules={{
                    required: { value: true, message: 'Username is required' },
                }}
                name="nickname"
                control={control}
                defaultValue=''
                render={({ onChange, value }) => (
                    <Input
                        error={errors.email}
                        errorMessage={errors?.nickname?.message}
                        placeholder='Username'
                        leftIcon={
                            <Icon
                            name='user-circle-o'
                            size={24}
                            color= {colors.base}
                            />
                        }
                        value={value}
                        autoCapitalize='none'
                        autoCorrect ={false}
                        onChangeText={(text) => onChange(text)}
                    />
                )}
            />
            <Controller
                rules={{
                    required: { value: true, message: 'Email is required' },
                    pattern:{value: EMAIL_REGEX,message: 'Not a valid email'}
                }}
                name="email"
                control={control}
                defaultValue=''
                render={({ onChange, value }) => (
                    <Input
                        error={errors.email}
                        errorMessage={errors?.email?.message}
                        placeholder='Email Address'
                        leftIcon={
                            <Icon
                            name='user'
                            size={24}
                            color= {colors.base}
                            />
                        }
                        value={value}
                        autoCapitalize='none'
                        autoCorrect ={false}
                        onChangeText={(text) => onChange(text)}
                    />
                )}
            />
            <Controller
                rules={{
                    required: { value: true, message: 'Password is required'},
                }}
                
                name="password"
                control={control}
                defaultValue=''
                render={({ onChange, value }) => (
                    <Input
                        error={errors.email}
                        errorMessage={errors?.password?.message}
                        placeholder='Password'
                        leftIcon={
                            <Icon
                            name='lock'
                            size={24}
                            color= {colors.base}
                            />
                        }
                        secureTextEntry
                        value={value}
                        autoCapitalize='none'
                        autoCorrect ={false}
                        onChangeText={(text) => onChange(text)}
                    />
                )}
            />
        
             <Button
                disabled = { isLoading ? true : false}
                buttonStyle={{backgroundColor: 'green'}}   
                title={isLoading ? <ActivityIndicator size="large" color={colors.base} /> : "Register"}
                onPress={handleSubmit(onSubmit)}
            />
            <AuthSwitcher  text='Already have an account? Signin' route='SigninScreen'/>
        </View>
    )
}

const styles = StyleSheet.create({

    parentStyle: {
        justifyContent:"center",
        flex: 1,
        margin:20,
        
    },

    headerWrapper : {
        alignSelf: 'center',
        marginBottom: 20
    },

    iconStyle: {
        fontSize: 70,
        color: colors.base,
        
    },

    textStyle: {
        fontSize: 20
    },

   
   
})

SignupScreen.navigationOptions = () => {
    return {
      headerShown: false,
    };
  };

export default SignupScreen;