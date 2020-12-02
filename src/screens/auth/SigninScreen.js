import React, {useEffect, useState} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native'
import { Toast} from 'native-base';
import { Input, Button } from 'react-native-elements';
import {useStoreState, useStoreActions} from 'easy-peasy'
import AuthSwitcher from '../../components/AuthSwitcher'
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../store/config/color';
import { useForm, Controller } from 'react-hook-form';
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


const SigninScreen =  ({navigation})  => {
    const { handleSubmit, control, errors } = useForm();
    const {isLoading, requestResponse} = useStoreState(state => state.auth)

    const {login, clearResponse} = useStoreActions(state => state.auth)

    useEffect(() => {
        console.log(requestResponse)
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
        login(data)
    };

    return (
        <View style={styles.parentStyle}>
            <View style={styles.headerWrapper}>
                    <Icon
                        name='user'
                        style ={styles.iconStyle}
                    />
            </View>
            <Text style={{fontSize:25, marginBottom: 20, marginHorizontal: 10, color: colors.base}}>SIGN IN</Text>
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
                    required: { value: true, message: 'Password is required' }
                  }}
                name="password"
                control={control}
                defaultValue=''
                render={({ onChange, value }) => (
                    <Input
                         error={errors.password}
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
                        onChangeText={(password) => onChange(password)}
                    />
                )}
            />
            <TouchableOpacity style={{alignSelf: 'flex-end', marginBottom: 10}}>
                <Text style={{color: colors.base}}>Forgot your password ? </Text>
            </TouchableOpacity>
            <Button
                disabled = { isLoading ? true : false}
                buttonStyle={{backgroundColor: 'green'}}   
                title={isLoading ? <ActivityIndicator size="large" color={colors.base} /> : "Login"}
                onPress={handleSubmit(onSubmit)}
            />
            <AuthSwitcher  text='Dont have an account? Signup' route='SignupScreen'/>
        </View>
    )
}

const styles = StyleSheet.create({

    parentStyle: {
        justifyContent:"center",
        flex: 1,
        margin:20
    },

    headerWrapper : {
        marginTop: 30,
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

SigninScreen.navigationOptions = () => {
    return {
      headerShown: false,
    };
  };

export default SigninScreen;