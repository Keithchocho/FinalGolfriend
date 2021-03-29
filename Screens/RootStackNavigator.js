import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';


import { createPortal } from 'react-dom';
import MainNavigator from './MainNavigator';
import ProfileScreen from './Etc/ProfileScreen';
import golfriend from './Etc/golfriendInfo';
import CommentScreen from './Etc/commentScreen';


const RootStack = createStackNavigator();

const RootStackNavigator = ({ navigation }) => (
    <RootStack.Navigator headerMode = 'None'>
        <RootStack.Screen name = 'MainNavigator' component ={MainNavigator}/>
        <RootStack.Screen name = 'Profile' component ={ProfileScreen}/>
        <RootStack.Screen name= "NoDoubt" component={golfriend} />
        <RootStack.Screen name = "CommentScreen" component={CommentScreen} />
    </RootStack.Navigator>
);

export default  RootStackNavigator;