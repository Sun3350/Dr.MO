import React, { useRef, useState, useEffect, useCallback } from 'react';
import { PanResponder, Animated,BackHandler, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import { useKeepAwake } from 'expo-keep-awake';
import WebScreen from './Components/WebView';
import HomeScreen from './Components/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WebinerScreen from './Components/Webiner';
import { Footer } from './Components/Footer';
import messaging from '@react-native-firebase/messaging';
import 'react-native-gesture-handler';
const Stack = createStackNavigator();
export default function App() {

 const requestUserPermission = async () =>  {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
 }
useEffect(() => {
if(requestUserPermission()){
  messaging().getToken().then(token =>{
    console.log(token)
  })
}else{
  console.log('failed to get token', authStatus)
}

/////////
messaging()
.getInitialNotification()
.then(async (remoteMessage) => {
  if (remoteMessage) {
    console.log(
      'Notification caused app to open from quit state:',
      remoteMessage.notification,
    );
  }
});
/////////
messaging().onNotificationOpenedApp( async (remoteMessage) => {
  console.log(
    'Notification caused app to open from background state:',
    remoteMessage.notification,
  );
});

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});



const unsubscribe = messaging().onMessage(async remoteMessage => {
  Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
});

return unsubscribe;
},[])

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
