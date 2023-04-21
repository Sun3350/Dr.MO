import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Animated,BackHandler, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import NetInfo from '@react-native-community/netinfo';
import Ionicons from 'react-native-vector-icons/Ionicons';
//import { RefreshControl } from 'react-native-web-refresh-control'
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function WebScreen() {
  const webViewRef = useRef(null)
  const [offline, setOffline] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshAnimation] = useState(new Animated.Value(0));
  const [canGoBack, setCanGoBack] = useState(false);

  //styling.....
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 30,
    },
   offlineContainer:{
      flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
   },
    appButtonText: {
      color: '#f7961e',
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },
    button: {
      height: 40,
    width: 100,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7961e',
    borderRadius: 5,
    marginTop: 2,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
  },
    offline: {
      backgroundColor: '#fff',
      alignSelf: 'center',
    },
    loadingContainer: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
   
  });

  const iconStyle = {
    color: '#fff',
    fontWeight: 'bold',
  };
   
  
    // Function to hide the loader and reset the animation
    const hideLoader = () => {
      setIsRefreshing(false);
      refreshAnimation.setValue(0);
    };
  
  ////OFFLINE
  useEffect(() => {
    NetInfo.fetch().then((state) => {
      setOffline(!state.isConnected);
    });
  }, []);


  useEffect(() => {
    const getLastVisitedPage = async () => {
      try {
        const lastVisitedPage = await AsyncStorage.getItem('lastVisitedPage');
        if (lastVisitedPage) {
          webViewRef.current.injectJavaScript(`window.location.href = '${lastVisitedPage}'`);
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    getLastVisitedPage();
  }, []);
  
/////BACK BUTTON....
  const onNavigationStateChange = async (navState) => {
    try {
      
      await AsyncStorage.setItem('lastVisitedPage', navState.url);
    } catch (error) {
      console.log(error);
    }
  
    setCanGoBack(navState.canGoBack);
  };
  useEffect(() => {
    const handleBackButton = () => {
      if (webViewRef.current && canGoBack) {
        webViewRef.current.goBack();
        return true;
      }
      return false;
    };
  
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
  
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButton
      );
    };
  }, [canGoBack]);
   const end = () => {
    setIsLoading(false)
    hideLoader(true)
   }
  return (
    ///OFFINE 2..
    <View style={styles.container}>
      {offline ? (
        <View  style={styles.offlineContainer} >
          <Ionicons
            style={styles.offline}
            name="cloud-offline-outline"
            size={100}
          />
          <Text style={styles.appButtonText}>
            Sorry, no internet connection.
          </Text>
          <TouchableOpacity style={styles.button}
          onPress={() => {
              NetInfo.fetch().then((state) => {
                setOffline(!state.isConnected);
                webViewRef.current.reload();
              });
            }}>
      <Text style={styles.buttonText}>Retry</Text>
    </TouchableOpacity>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
        {isRefreshing && (
        <Animated.View style={[styles.refreshView, { opacity: refreshAnimation }]}>
          {/* Insert your custom loader here */}
        </Animated.View>
      )}
          {isLoading && <ActivityIndicator style={styles.loadingContainer} size="large" color="#f7961e" animating={true}/>}
          <WebView
          style={{ flex: 1 }}
            source={{ uri: 'https://loja.ng' }}
            ref={webViewRef}
            originWhitelist={['*']}
            onError={() => setOffline(true)} 
            onLoadStart={() => setIsLoading(true)}
            onLoadEnd={end}
            setSupportMultipleWindows={false}
            incognito={true}
            cacheEnabled={true}
            cacheMode={'LOAD_DEFAULT'}
            onNavigationStateChange={onNavigationStateChange}
           
          />
        
          
        </View>
      )}
    </View>
  );
}
