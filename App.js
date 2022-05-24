

import React,{Component}from "react";
import { 
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Touchable,
  Image,Alert,
  PermissionsAndroid,
  TouchableOpacity,
  Platform,
  Modal,
  Button
 } from 'react-native';
 import { NavigationContainer } from "@react-navigation/native";

 import Navigation from './Navigation/Navigation';
 import DrawerNavigator from './Navigation/DrawerNavigator'
 export default class App extends Component{
  render(){
  return (
    <NavigationContainer>
     <DrawerNavigator/> 
     </NavigationContainer>
   );
  }
   }
 const styles = StyleSheet.create({
   
 });
 
 