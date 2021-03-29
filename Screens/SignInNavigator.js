import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import StartScreen from './SignIn/StartScreen';
import SignUpScreen from './SignIn/SignUpScreen';
import EmailSignUpScreen from './SignIn/EmailSignUpScreen';
import EmailSignUpFormScreen from './SignIn/EmailSignUpFormScreen';
import LogInScreen from './SignIn/LogInScreen';

const SignInStack = createStackNavigator();

const SignInNavigator = () => {
    return (
        <SignInStack.Navigator headerMode='None'>
            <SignInStack.Screen name="Start" component={StartScreen} />
            <SignInStack.Screen name="SignUp" component={SignUpScreen} />
            <SignInStack.Screen name="EmailSignUp" component={EmailSignUpScreen} />
            <SignInStack.Screen name="EmailSignUpForm" component={EmailSignUpFormScreen} />
            <SignInStack.Screen name="LogIn" component={LogInScreen} />
        </SignInStack.Navigator>
    );
};

export default SignInNavigator;