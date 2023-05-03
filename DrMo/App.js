import React, { useRef, useState, useEffect, useCallback } from 'react';
import { PanResponder, Animated,BackHandler, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import { useKeepAwake } from 'expo-keep-awake';
import WebScreen from './Components/WebView';
import HomeScreen from './Components/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WebinerScreen from './Components/Webiner';
import { Footer } from './Components/Footer';
import 'react-native-gesture-handler';
const Stack = createStackNavigator();
export default function App() {
  useKeepAwake();
  const [isConnected, setIsConnected] = useState(true);
  useEffect(() => {
    // Subscribe to changes in the network status
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    // Unsubscribe from network status changes when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    
    <NavigationContainer>
      <Stack.Navigator  >
      { isConnected ? (<Stack.Screen options={{headerShown: false}} name="Home" component={HomeScreen} />
      )
    : (<Stack.Screen  options={{headerShown: false}}  name="Home" component={HomeScreen} />)
    }<Stack.Screen options={{headerShown: false}} name="Homes" component={HomeScreen} />
    <Stack.Screen options={{headerShown: false}} name="About" component={WebScreen} />
    <Stack.Screen options={{headerShown: false}} name="Webiner" component={WebinerScreen} />
    
      </Stack.Navigator>
      
     {isConnected ? (<Footer />): (<Footer/>)}
    </NavigationContainer>
  );
}
