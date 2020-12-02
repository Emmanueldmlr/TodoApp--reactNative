import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../store/config/color';


const EmailVerificationScreen =  ({navigation})  => {
    return (
        <View style={styles.parentStyle}>
            <View style={styles.headerWrapper}>
                <Icon
                    name='check'
                    style ={styles.iconStyle}
                />
            </View>
            <Text style={styles.textStyle}>Registration Successful !!! , Kindly Check Your Email To Follow Through</Text>
            <Button
                buttonStyle={{backgroundColor: 'green'}} 
                title='Login'  
                onPress={() => navigation.navigate('SigninScreen')}
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
        fontSize:18,
        marginBottom: 20,
        marginHorizontal: 10,
        color: colors.base,
        textAlign: 'center'
    },

   
   
})

EmailVerificationScreen.navigationOptions = () => {
    return {
      headerShown: false,
    };
  };

export default EmailVerificationScreen;