
import React, {Component} from 'react';
import { 
  View,
  Text,
  StyleSheet,BackHandler,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Touchable,
  Image,
  TouchableOpacity
 } from 'react-native';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";
import Icon from "react-native-vector-icons/Ionicons"
import LinearGradient from 'react-native-linear-gradient';
export default class Drawer extends Component{
    constructor(){
      super();
  }
 
  
  render(){
  


     
  return (
    <LinearGradient colors={['#0f2027', '#203a43', '#2c5364']} style={{width:'100%',height:'100%'}}>

        
          <View style={{alignItems:'center'}}>
              <Text style={{fontSize:50,color:'white'}}>Menü</Text>
          </View>

          <TouchableOpacity style={{padding:15}} onPress={()=>this.props.navigation.closeDrawer()}>
          <Icon  name={Platform.OS === "ios" ? "ios-add" : "arrow-back-outline"}
  color="white"
  size={50}/>
  </TouchableOpacity>

  


  
  <TouchableOpacity style={{marginTop:25,padding:5}}onPress={()=>this.props.navigation.navigate('iletisim')}>
   
   
  <Icon  name={Platform.OS === "ios" ? "ios-add" : "call-outline"}
  color="white"
  size={30}>
<Text style={{

        fontSize:35, 
  margin: 0,
  padding: 10,
  width: 110,
  }}>
     İletişim
    </Text>
  </Icon>
   
  </TouchableOpacity>
  {/* <TouchableOpacity style={{marginTop:25,padding:5}}onPress={()=>this.props.navigation.navigate('iletisim')}>
   
   
  <Icon  name={Platform.OS === "ios" ? "ios-add" : "call-outline"}
  color="white"
  size={30}>
<Text style={{

        fontSize:35, 
  margin: 0,
  padding: 10,
  width: 110,
  }}>
     asdas
    </Text>
  </Icon>
   
  </TouchableOpacity> */}
<View style={{position: 'absolute', left: 0, right: 0, bottom: 0, flexDirection:'row-reverse',marginBottom:'35%',marginRight:'23%'}}>
  <TouchableOpacity style={{alignItems: "center",justifyContent: "center",width:150,borderRadius:105, height:75,backgroundColor:'red'}} 
  onPress={()=>
    BackHandler.exitApp()
  }>
   
   
   
 <Text style={{
 
         fontSize:35, 
   margin: 0,
   padding: 10,
   width: 110,
   color:'white'
   }}>
    ÇIKIŞ
     </Text>
   
    
   </TouchableOpacity>
   
   </View>
          </LinearGradient>
          
  )
  
  }
  }