import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground,Animated, ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
export default function HomeScreen({navigation}) {
  const [fadeInOpacity] = useState(new Animated.Value(0));
  const [fadeInOpacity1] = useState(new Animated.Value(0));
  const [fadeInOpacity2] = useState(new Animated.Value(0));
  const [fadeInOpacity3] = useState(new Animated.Value(0));
  const [fadeInOpacity4] = useState(new Animated.Value(0));
  useEffect(() => {
    fadeIn();
    fadeIn1();
    fadeIn2();
    fadeIn3();
    fadeIn4();
  }, []);

  const fadeIn = () => {
    Animated.timing(fadeInOpacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };
  const fadeIn1 = () => {
    Animated.timing(fadeInOpacity1, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };
  const fadeIn2 = () => {
    Animated.timing(fadeInOpacity2, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  };
  const fadeIn3 = () => {
    Animated.timing(fadeInOpacity3, {
      toValue: 1,
      duration: 4000,
      useNativeDriver: true,
    }).start();
  };
  const fadeIn4 = () => {
    Animated.timing(fadeInOpacity4, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  };

  
  return (
   <ScrollView>
    <View style={styles.container}>
     <Animated.View style={{ opacity: fadeInOpacity }}>
     <ImageBackground
      source={require('../assets/about.png')}
          style={styles.image}>
      <View  style={styles.textContainer}>
             <Text style={styles.text1} >
               Dr.Mo
             </Text>
              <Text style={styles.text}>
              Dr Makanjuola Ojewumi is a real estate professional and property developer.
              </Text>
       </View>
      </ImageBackground>
      
      </Animated.View>
      <Animated.View style={{ opacity: fadeInOpacity1 }}>
        <View style={{flexDirection: "row", marginTop: 10, alignItems:'center',justifyContent:"center"}}>
           <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("About")} >
                 <Text style={styles.ebookText}>
                   eBooks  <Ionicons
           style={styles.arrow}
           name="book-sharp"
        size={30}
      />
                 </Text>
                 <Ionicons
           style={styles.arrow}
           name="add-sharp"
        size={30}
      />
                 <Text style={styles.audioText}>
                   AudioBooks  <Ionicons
           style={styles.arrow}
           name="headset-sharp"
        size={30}
      />
                 </Text>
           </TouchableOpacity>
        </View>
        </Animated.View>
        <Animated.View style={{ opacity: fadeInOpacity3 }}>
       <View style={styles.webna} >
       <TouchableOpacity style={styles.webnabutton} onPress={() => navigation.navigate("Webiner")}>
           <Text style={styles.webinerText} >
                  Webinar
                 </Text>
                 <TouchableOpacity  style={styles.webnacamera} onPress={() => navigation.navigate("Webiner")}>
                 <Ionicons
           style={styles.camera}
           name="videocam"
        size={40}
      /></TouchableOpacity>
      <View style={styles.downwebn}>
      <Text style={styles.text}>Live BroadCast, Podcast And Training</Text>
       <Ionicons
           style={styles.webnaarrow}
           name="arrow-forward-sharp"
        size={30}
      /></View>
           </TouchableOpacity>
       </View>
       </Animated.View>
       <Animated.View style={{ opacity: fadeInOpacity4}}>
       <View style={styles.newsbox} >
        <Text style={styles.newsText}>NewsUpdates</Text><Text style={styles.newsTextd}>.....</Text>
       
       </View>
       </Animated.View>
        </View>
        </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    //marginTop:20
  },
  container2: {
    width: '100%',
    height: 200,
   backgroundColor: '#1F1B18',
    borderRadius: 5,
    alignSelf: "center",
    flexDirection: 'row'
  },
  textContainer:{
    justifyContent:'center',
   backgroundColor:'rgba(0, 0, 0, 0.5)',
   height:'100%'
  },
  image:{
    width: '100%',
    height: 200,
    borderRadius: 8,
    resizeMode:'contain',
    alignSelf: 'center'
  },
  text1: {
    fontSize: 50,
    fontWeight: 'bold',
    marginLeft:30,
    color: "#f7961e",
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: "white",
    justifyContent:'center',
    marginLeft:30,
  },
  button:{
    padding:10,
    backgroundColor: '#f7961e',
    borderRadius: 5,
    margin: 8,
    width:"87%",
    height: '100%',
  },
  ebookText:{
    fontSize: 25,
    color: 'white',
    fontWeight: 700
  },
  audioText:{
    fontSize: 25,
    color: 'white',
    fontWeight: 700,
    alignSelf:'flex-end',
  },
  arrow:{
    marginRight: 10,
    alignSelf:'center',
    color:'green'
  },
  webnaarrow:{
    alignSelf:'flex-end',
    color:'white',
    marginLeft: 10,
  },
  webinerText:{
    fontSize: 30,
    marginTop:5,
    color: 'white',
    fontWeight: 700
  },
  webna:{
    height: 150,
    marginTop: 10,
    alignItems:'center',
    justifyContent: 'center',
    alignSelf:'center',
    width: '87%',
  },
  webnabutton:{
    width:"100%",
    height: '100%',
    backgroundColor: '#f7961e',
    alignItems:'center',
    borderRadius:8,
    marginTop: 5
  },
  webnacamera:{
    width:70,
    height:70,
    backgroundColor:"green",
    borderRadius:50,
    alignItems:'center',
    justifyContent:'center',
    marginTop:8
  },
  camera:{
    color:'white'
  },
  newsbox:{
    height: 150,
    marginTop: 10,
    marginBottom:20,
    borderRadius: 5,
    alignSelf:'center',
    width: '87%',
    flexDirection:'row',
    backgroundColor:'#f7961e'
  },
  newsText:{
    color:'white',
    fontSize:35,
    fontWeight:800,
    marginTop:20,
    marginLeft:5
  },
  newsTextd:{
    color:'green',
    fontSize:30,
    fontWeight:800,
    marginTop:20
  },
  downwebn:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  }
});
