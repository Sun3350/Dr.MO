import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Animated,BackHandler, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import NetInfo from '@react-native-community/netinfo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const LastVisitedUrlContext = React.createContext();
export default function WebScreen() {
  const webViewRef = useRef(null)
  const [offline, setOffline] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshAnimation] = useState(new Animated.Value(0));
  const [canGoBack, setCanGoBack] = useState(false);
 
  


  const styles = StyleSheet.create({
    container: {
      flex: 1,
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
   button:  {height: 40,
    width: 100,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7961e' ,   borderRadius: 5,
    marginTop: 2,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
  },
    offline: {
      backgroundColor: 'transparent',
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
      backgroundColor: '#000000',
    },
   
  });
  const iconStyle = {
    color: '#fff',
    fontWeight: 'bold',
  };

  const [lastVisitedUrl, setLastVisitedUrl] = useState(null);

  useEffect(() => {
    // Load the last visited URL from AsyncStorage when the component mounts
    const loadLastVisitedUrl = async () => {
      try {
        const url = await AsyncStorage.getItem('lastVisitedUrl');
        if (url !== null) {
          setLastVisitedUrl(url);
        }
      } catch (e) {
        console.log('Error loading last visited URL:', e);
      }
    };
    loadLastVisitedUrl();
  }, []);

  const handleNavigationStateChange = (navState) => {
    if (navState && navState.url) { // add a check to ensure navState and navState.url are defined
      setLastVisitedUrl(navState.url);
      // Save the last visited URL to AsyncStorage
      try {
        AsyncStorage.setItem('lastVisitedUrl', navState.url);
      } catch (e) {
        console.log('Error saving last visited URL:', e);
      }
    }
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
/////BACK BUTTON....
  const onNavigationStateChange = async (navState) => {
    handleNavigationStateChange()
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
          <LastVisitedUrlContext.Provider value={lastVisitedUrl}>
          <WebView
          style={{ flex: 1 }}
            source={{  uri: lastVisitedUrl || 'http://drmakanjuolaojewumi.com.preview.my-hosting-panel.com/ebook/' }}
            ref={webViewRef}
            originWhitelist={['*']}
            onError={() => setOffline(true)} 
            onLoadStart={() => setIsLoading(true)}
            onLoadEnd={end}
            cacheEnabled={true}
            cacheMode={'LOAD_CACHE_ELSE_NETWORK'}
            domStorageEnabled={true}
            javaScriptEnabled={true}
            onNavigationStateChange={onNavigationStateChange}
          />
          </LastVisitedUrlContext.Provider>
        </View>
      )}
    </View>
 
 );
}
