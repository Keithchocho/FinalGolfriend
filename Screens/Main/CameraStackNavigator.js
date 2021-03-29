import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import RecordScreen from '../Camera/RecordScreen';
import VideoScreen from '../Camera/VideoScreen';
import FeedbackScreen from '../Camera/FeedbackScreen';

import { Entypo } from '@expo/vector-icons'; 

const CameraStack = createStackNavigator();

const CameraStackNavigator = () => {
    return (
        <CameraStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <CameraStack.Screen name="Record" component={RecordScreen} />
            <CameraStack.Screen name="Video" component={VideoScreen} />
            <CameraStack.Screen 
                name="Feedback" 
                component={FeedbackScreen} 
                options={{ 
                    headerShown: true,
                    title: '분석 결과',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerStyle: {
                        height: 70,
                    },
                    // headerRight: () => (
                    //     <View style={{ flexDirection: 'row' }}>
                    //         <Entypo name="slideshare" size={24} color="black" />
                    //     </View>
                    // )
                }}
            />
        </CameraStack.Navigator>
    )
}

export default CameraStackNavigator;