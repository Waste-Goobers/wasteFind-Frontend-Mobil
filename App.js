import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as firebase from 'firebase/app';
import { initializeApp } from 'firebase/app';
import apiKeys from './config/keys';
import WelcomeScreen from './screens/WelcomeScreen';
import Mapping from './screens/Mapping';
import SignUp from './screens/SignUp';
import SignIn from './screens/SignIn';
import LoadingScreen from './screens/LoadingScreen';
import Dashboard from './screens/Dashboard';
import VideoInput from './screens/VideoInput';
import Materialresult from './screens/Materialresult';


const Stack = createStackNavigator();

export default function App() {
  initializeApp(apiKeys.firebaseConfig);
  console.log('Connected with Firebase');

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={'Loading'}
          component={LoadingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Mapping"
          component={Mapping}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Sign Up"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Sign In"
          component={SignIn}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={'Dashboard'}
          component={Dashboard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={'VideoInput'}
          component={VideoInput}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={'Materialresult'}
          component={Materialresult}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
