import AsyncStorage from '@react-native-async-storage/async-storage';

export const baseUrl = 'http://17fc6fa5fd1c.ngrok.io/api/';

export const token = "XscOe3Nc0ttKWpN4CY5U";

export const setUserToken = "S6bD0pHsYpSB500n0P4V"

export const getTokenData = () => {
    try {
        const data =  AsyncStorage.getItem(token);
        return data;
    } catch (error) {
    console.log(error);
    }
}
    

export const getUserData =  async () => {
    try {
        const data = await AsyncStorage.getItem(setUserToken);
        return data;
      } catch (error) {
        console.log(error);
      }
}

export const saveTokenData = async (data) => {
    await AsyncStorage.setItem(token, data)
}

export const saveUserData = async (data) => {
    await AsyncStorage.setItem(setUserToken, data)
}
