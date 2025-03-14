import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import IntroApp from './components/intro_app';
import Permission from './components/Permission';
import Homepage from './components/Homepage';
import Alerts from './components/Alerts';
import Chats from './components/Chats';
import Profile from './components/Profile';
import RequestTemplate from './components/RequestTemplate';
import CabTemplate from './components/CabTemplate';
import Login from './components/Login'; 
import 'react-native-gesture-handler';

export type RootStackParamList = {
  IntroApp: undefined;
  Permission: { formType: string } | undefined; 
  Homepage: undefined;
  Alerts: undefined;
  Chats: undefined;
  Profile: undefined;
  RequestTemplate: undefined;
  CabTemplate: undefined;
  Login: { formType: string }; // Add Login to RootStackParamList
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="IntroApp">
        <Stack.Screen
          name="IntroApp"
          component={IntroApp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Permission"
          component={Permission}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Homepage"
          component={Homepage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Alerts"
          component={Alerts}
          options={{ headerShown: true, title: 'Alerts' }}
        />
        <Stack.Screen
          name="Chats"
          component={Chats}
          options={{ headerShown: true, title: 'Chats' }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: true, title: 'Profile' }}
        />
        <Stack.Screen
          name="RequestTemplate"
          component={RequestTemplate}
          options={{ headerShown: true, title: 'Request Vicinity' }}
        />
        <Stack.Screen
          name="CabTemplate"
          component={CabTemplate}
          options={{ headerShown: true, title: 'Share/Rent a Cab' }}
        />
        <Stack.Screen
          name="Login" // Add Login screen
          component={Login}
          options={{ headerShown: true, title: 'Login' }}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
