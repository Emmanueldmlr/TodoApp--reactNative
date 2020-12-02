import React, {useEffect} from 'react'
import { View, Text, StyleSheet, ActivityIndicator} from 'react-native'
import { Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useStoreActions, useStoreState} from 'easy-peasy'
import { Toast} from 'native-base';
import colors from '../../store/config/color';

const AccountVerificationScreen =  ({navigation})  => {
    const {verifyAccount,clearResponse} = useStoreActions(actions => actions.auth)
    const {requestResponse, isLoading} = useStoreState(state=> state.auth)
    useEffect(() => {
        console.log(requestResponse)
        requestResponse ? 
            handleNotification()
        : null
    }, [requestResponse])

    const handleNotification = () => {
        Toast.show({
            text: requestResponse,
            buttonText: 'Okay'
        })
        setTimeout(() => {
            clearResponse();
        }, 3000);
    }
    return (
        <View style={styles.parentStyle}>
            <View style={styles.headerWrapper}>
                <Icon
                    name='info-circle'
                    style ={styles.iconStyle}
                />
            </View>
            <Text style={styles.textStyle}>Your Email Address is Not Yet Verified</Text>
            <View style={styles.buttonWrapperStyle}>
                <Button
                    buttonStyle={{backgroundColor: 'green', marginHorizontal:10, paddingHorizontal:50}} 
                    title='Verify'  
                    onPress={() => verifyAccount()}
                    style={{paddingHorizontal: 20}}
                    disabled = { isLoading ? true : false}
                    title={isLoading ? <ActivityIndicator size="small" color={colors.base}/> : "Verify"}
                />
                <Button
                    buttonStyle={{backgroundColor: '#0080FF',  marginHorizontal:10, paddingHorizontal:50}} 
                    title='Login'  
                    onPress={() => navigation.navigate('SigninScreen')}
                    title={"Login"}
                />
            </View>
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
        color: 'red',
        
    },

    textStyle: {
        fontSize:18,
        marginBottom: 20,
        marginHorizontal: 10,
        color: 'red',
        textAlign: 'center'
    },
    buttonWrapperStyle : {
        flexDirection: 'row',
        justifyContent: 'center',
    }

   
   
})

AccountVerificationScreen.navigationOptions = () => {
    return {
      headerShown: false,
    };
  };

export default AccountVerificationScreen;