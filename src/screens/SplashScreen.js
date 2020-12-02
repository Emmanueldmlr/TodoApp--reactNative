import React, {useEffect} from 'react'
import { View, Text,ActivityIndicator, StyleSheet } from 'react-native'
import colors from '../store/config/color'
import {getTokenData, getUserData} from '../../src/store/config/index'
import {useStoreActions, useStoreState} from 'easy-peasy'


const SplashScreen = ({navigation}) => {
    const handleRedirection = useStoreActions(actions => actions.auth.handleRedirection)
    useEffect(() => {
        setTimeout(async()=>{
            await getTokenData() && JSON.parse(await getUserData()).isVerified === 1 ? 
            handleRedirection() : 
            navigation.navigate('SigninScreen')
        }, 5000)
    }, [])
    return (
        <View style={styles.parentStyle}>
            <ActivityIndicator size="large" color={colors.base} />
            <Text style={styles.textStyle} >Loading...</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    parentStyle: {
        flex: 1,
        justifyContent: "center"
    },
    textStyle: {
        alignSelf: 'center',
        fontSize: 18
    }
})

SplashScreen.navigationOptions = () => {
    return {
      headerShown: false,
    };
  };

export default SplashScreen;
