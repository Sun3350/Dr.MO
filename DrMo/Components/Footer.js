import React ,{useEffext, useState}from 'react'
import NetInfo from "@react-native-community/netinfo";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { PanResponder, Animated, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
export const Footer = () => {
    const navigation = useNavigation();

  return (
    <View style={styles.footer}>
       <TouchableOpacity style={styles.footerbutton} onPress={() => navigation.navigate("Homes")}>
         <Ionicons
             style={styles.footericon}
              name="home-sharp"
           size={23}
            />
              <Text style={styles.footerText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerbutton}>
                <Ionicons
                     style={styles.footericon}
                     name="play-circle-sharp"
                  size={23}
                />
              <Text style={styles.footerText}>PlayList</Text>
       </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
    footer:{
      height:50,
      justifyContent:'space-between',
      alignItems:'center',
      flexDirection:'row',
      paddingHorizontal:50
    },
    footericon:{
        color:'#f7961e'
    },
    footerText:{
        color:'green',
        fontSize:15,
        fontWeight:'bold',
        alignSelf:'center',
        
    },
    footerbutton:{
        justifyContent:'center',
        alignItems:'center'
    }
  })