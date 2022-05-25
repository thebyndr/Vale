import React from "react";
import {NavigationContainer} from '@react-navigation/native';

import { createDrawerNavigator } from "@react-navigation/drawer";
import timer from '../screens/timer'
import iücdoluluk from'../screens/OtoparkDoluluk/iüc/iücdoluluk'
import {Navigation} from './Navigation'
import Drawerr from "../screens/drawer"
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    
    <Drawer.Navigator drawerPosition='left' drawerContent={(props) => <Drawerr {...props} />}>
        <Drawer.Screen name="Bir Önceki Sayfa" component={Navigation} />
        
     
      </Drawer.Navigator>
      
  );
}

export default DrawerNavigator;