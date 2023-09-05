import * as React from 'react';
import { Text, View, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './Home'
import Start from './Start';
import Setting  from './Setting'
import Login from './Login'
import Register from './Register'
import OtpVerify from './OtpVerify'
import Profile from './Profile'
import About from './about'

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push('Details')}
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

function Root() {
  return (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Women Safety App') {
                iconName = focused
                ? 'ios-home'
                : 'ios-home-outline';
            } else if (route.name === 'Emergency') {
                iconName = focused ? 'md-call' : 'md-call-outline';
            } else if (route.name === 'Profile') {
                iconName = focused ? 'ios-person' : 'ios-person-outline';
            } else if (route.name === 'Settings') {
                iconName = focused ? 'ios-settings' : 'ios-settings-outline';
            } else if (route.name === 'About') {
                iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen name="Women Safety App" component={Start} options={{unmountOnBlur: true}} />
        <Tab.Screen name="About" component={About} options={{unmountOnBlur: true}} />
        <Tab.Screen name="Emergency" component={Home} options={{unmountOnBlur: true}} />
        <Tab.Screen name="Profile" component={Profile} options={{unmountOnBlur: true}} />
        <Tab.Screen name="Settings" component={Setting} options={{unmountOnBlur: true}} />
      </Tab.Navigator>
  );
}


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home"
      creenOptions={{
        headerShown: false
      }}
      >
        <Stack.Screen 
              name="Home" 
              component={Login} 
              options={{headerShown: false}}
        />
        <Stack.Screen 
              name="Register" 
              component={Register} 
              options={{headerShown: false}}
        />
        <Stack.Screen 
              name="OtpVerify" 
              component={OtpVerify} 
              options={{headerShown: false}}
        />
        <Stack.Screen 
              name="Details" 
              component={Root} 
              options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}