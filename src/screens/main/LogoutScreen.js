import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../store/config/color';
import {  Card, CardItem, Right, Left,  Button} from 'native-base';
import { StyleSheet, View, Text } from 'react-native';
import {useStoreActions} from 'easy-peasy'


const LogoutScreen = () =>{
    const Actions = useStoreActions(actions => actions.auth)
    return (
        <View style={styles.parentStyle}>
            <Card>
            <CardItem>
              <Left>
                <Button transparent>
                  <Text>Kindly Logout</Text>
                </Button>
              </Left>
              
              <Right>
                <Button onPress={()=>Actions.logout()} transparent>
                  <Icon active style={{fontSize:18, color:'red'}} name="sign-out" />
                  <Text style={{fontSize:18, color:'red'}}> Logout</Text>
                </Button>
              </Right>
            </CardItem>
            
                {/* <CardItem footer bordered>
                    <FooterDetails/>
                    <Right>
                        <Icon style={{alignSelf:"center", color: colors.base, fontSize: 18}}  name="check" />
                        <Text style={styles.footerTextStyle}>Mark</Text>
                    </Right>
                </CardItem> */}
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    parentStyle : {
        marginTop: 60,
        marginHorizontal: 20,
        flex:1
    },

    cardParent:{
        
    }
})
LogoutScreen.navigationOptions = () => {
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
               <Icon name='user'
               style ={{color: colors.base, fontSize: 20}}/>
           )
       }
    };
  };

  export default LogoutScreen
