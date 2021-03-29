
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from './ProfileScreen';
import golfriend from './golfriendInfo';
import UserLatestSwingScreen from '../Main/UserLatestSwingScreen';



const EtcStack = createStackNavigator();

const EtcStackScreen = ({ navigation }) => (
    <RootStack.Navigator headerMode = 'None'>
        <EtcStack.Screen name = {'Profile'} component ={ProfileScreen}/>
        <EtcStack.Screen name = {'GolfriendInfo'} component ={ golfriend } />
    </RootStack.Navigator>
);

export default EtcStackScreen;
