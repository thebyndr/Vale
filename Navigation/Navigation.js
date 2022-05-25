import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator,TransitionPresets,CardStyleInterpolators,HeaderStyleInterpolators} from  '@react-navigation/stack';
import { View, Text } from 'react-native';
import { fromLeft, zoomIn, zoomOut } from 'react-navigation-transitions'
import { createDrawerNavigator } from '@react-navigation/drawer';
import SignUp from '../screens/SignUp';
import Login from '../screens/Login';
import araba from '../screens/araba';
import forgot from'../screens/forgot';
import map from '../screens/map';
import iücdoluluk from'../screens/OtoparkDoluluk/iüc/iücdoluluk'
import iücotoparkalanlar from'../screens/OtoparkDoluluk/iüc/iücotoparkalanlar'
import timer from '../screens/timer'
import iletisim from '../screens/iletisim'
import drawer from '../screens/drawer'
const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();



const Navigation = props => {
    return (
      
     
      
      
        
        
     
            <Stack.Navigator >
                <Stack.Screen name="Login" component={Login} options={{headerShown: false,...TransitionPresets.RevealFromBottomAndroid}} />
                <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false,...TransitionPresets.RevealFromBottomAndroid}} />
                <Stack.Screen name="araba" component={araba} options={{headerShown: false,  ...TransitionPresets.RevealFromBottomAndroid}} />
                <Stack.Screen name="forgot" component={forgot} options={{headerShown: false, ...TransitionPresets.RevealFromBottomAndroid}} />
                <Stack.Screen name="map" component={map} options={{headerShown: false,...TransitionPresets.RevealFromBottomAndroid}} />
                <Stack.Screen name="iücdoluluk" component={iücdoluluk}   options={{headerShown: false,...TransitionPresets.RevealFromBottomAndroid}} />
                <Stack.Screen name="iücotoparkalanlar" component={iücotoparkalanlar} options={{headerShown: false,...TransitionPresets.RevealFromBottomAndroid}} />
                <Stack.Screen name="timer" component={timer} options={{headerShown: false,...TransitionPresets.RevealFromBottomAndroid}} />
                <Stack.Screen name="iletisim" component={iletisim} options={{headerShown: false,...TransitionPresets.RevealFromBottomAndroid}} />

                <Stack.Screen name="drawer" component={drawer} options={{headerShown: false,...TransitionPresets.SlideFromRightIOS}} />

            </Stack.Navigator>

   
    );
    
};



export {Navigation};