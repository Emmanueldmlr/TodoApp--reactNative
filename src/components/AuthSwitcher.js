import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import {withNavigation} from 'react-navigation'
import colors from '../store/config/color'

const AuthSwitcher = ({text, navigation, route}) => {
    return (
        <TouchableOpacity onPress={() => navigation.navigate(route)} style={{ alignSelf : 'center', marginTop: 10}}>
             <Text style={{color: colors.base}}>{text} </Text>
        </TouchableOpacity>
    )
}

export default withNavigation(AuthSwitcher)
