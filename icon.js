import React, { Component } from 'react';
import {View, StyleSheet, Text,TextInput, Image, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
export default class Drawer extends Component{

render(){
    return(


        <View>
            <Icon  name={Platform.OS === "ios" ? "ios-add" : "mail-outline"}
  color="#1DA1F2"
  size={30}/>
        </View>
    )
}

}
