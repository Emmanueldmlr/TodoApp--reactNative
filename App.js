import React from 'react'
import { Root } from "native-base";
import SplashScreen from './src/screens/SplashScreen'
import AccountVerificationScreen from './src/screens/auth/AccountVerificationScreen'
import EmailVerificationScreen from './src/screens/auth/EmailVerificationScreen'
import SigninScreen from './src/screens/auth/SigninScreen'
import SignupScreen from './src/screens/auth/SignupScreen'
import {createStackNavigator} from 'react-navigation-stack'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import CreateTodoScreen from './src/screens/main/CreateTodoScreen'
import FinishedTodoScreen from './src/screens/main/FinishedTodoScreen'
import HomeScreen from './src/screens/main/HomeScreen'
import store from './src/store/model'
import { StoreProvider } from 'easy-peasy'
import {setNavigator} from './src/store/config/navigationRef'
import LogoutScreen from './src/screens/main/LogoutScreen'
import { enableES5 } from 'immer';
import { enableMapSet } from 'immer';



const SwitchNavigator = createSwitchNavigator({
  alternateFlow : createStackNavigator({
    SplashScreen : SplashScreen
  }),
  loginFlow : createStackNavigator ({
    SigninScreen : SigninScreen,
    SignupScreen: SignupScreen,
    AccountVerificationScreen: AccountVerificationScreen,
    EmailVerificationScreen : EmailVerificationScreen
  }),
  mainFlow : createBottomTabNavigator({
    Home : HomeScreen,
    'Create Todo' : CreateTodoScreen,
    'Finished' : FinishedTodoScreen,
    'Account' : LogoutScreen  
    // TrackCreateScreen: TrackCreateScreen,
    // AccountScreen : AccountScreen,
  })
})

const App = createAppContainer(SwitchNavigator)

export default ()=> {
  enableMapSet();
  return (
    <Root>
      <StoreProvider store={store}>
         <App ref={(navigator) => setNavigator(navigator)}/>
      </StoreProvider> 
   </Root>
  )
}