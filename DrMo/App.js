import React, { useRef, useState, useEffect, useCallback } from 'react';
import { PanResponder, Animated,BackHandler, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import RegisterScreen from './Components/Register';
import LoginScreen from './Components/Login';
import WebView from './Components/WebView';
import WebScreen from './Components/WebView';

export default function App() {
 
  return (
    ///OFFINE 2..
    <View style={{flex: 1}}>
     <WebScreen/>
    </View>
  );
}
