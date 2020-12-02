import { action, thunk } from "easy-peasy";
import {getTokenData, getUserData, token, setUserToken} from '../config/index'
import { navigate } from "../config/navigationRef";
import {LoginService, RegisterService, 
  EmailConfirmationService, ResendEmailService,
  ForgotPasswordService, ChangePasswordService
} from '../services/authServices'
import {saveTokenData, saveUserData} from '../config/index'
import AsyncStorage from '@react-native-async-storage/async-storage';

const authModel = {
    isAuthed : false,
    isLoading: false,
    requestResponse: null,

    login: thunk((Actions, loginData) => {
      Actions.toggleIsLoading();
      return LoginService(loginData)
        .then((data) => {
          if (data.status) {
            saveTokenData(data.data.token)
            saveUserData(JSON.stringify(data.data.user))
            Actions.toggleIsLoading();  
            if(data.data.user.isVerified === 0){
              navigate('AccountVerificationScreen') 
            }else{
              navigate('Home') 
            }        
          }
           else {
              // const payload = {
              //     type: 'error',
              //     msg:data.error
              // }
              // Actions.updateRequestResponse(payload);
              Actions.updateRequestResponse(data.error)
              console.log(data)
              Actions.toggleIsLoading();
          }
        })
    }),

    register: thunk((Actions, registerData) => {
      Actions.toggleIsLoading();
      RegisterService(registerData)
      .then((data) =>{
          if (data.status) {
            Actions.toggleIsLoading();
            navigate('EmailVerificationScreen')
          }
           else {
            Actions.updateRequestResponse(data.error);
            Actions.toggleIsLoading();
          }
      })
      .catch(error => console.log(error))
    }),

    logout: thunk( async (Actions) => {
            await AsyncStorage.removeItem(token)
            await AsyncStorage.removeItem(setUserToken)
            Actions.toggleAuth()
            navigate('SigninScreen')    
    }),

    handleRedirection:thunk( async (Actions) => {
          Actions.toggleAuth()
          navigate('Home')
    }),  

    verifyAccount: thunk(async (Actions) => {
      Actions.toggleIsLoading();
      const userDetails = JSON.parse(await AsyncStorage.getItem(setUserToken));
      ResendEmailService(userDetails.token)
      .then((data) =>{
          if (data.status) {
            Actions.updateRequestResponse(data.data.message);
            Actions.toggleIsLoading();
          }
           else {
            Actions.updateRequestResponse(data.error);
            Actions.toggleIsLoading();
          }
      })
    }),



    updateRequestResponse: action((state, payload) => {
      state.requestResponse = payload;
    }),

    toggleIsLoading : action((state) => {
      state.isLoading = !state.isLoading;
    }),

    clearResponse: action((state) => {
      state.requestResponse = null;
    }),

    toggleAuth: action((state) => {
      state.isAuthed = !state.isAuthed
    }),

  }; 
export default authModel