import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await fetch('https://backend-api-url.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      });
      const data = await response.json();
      if (data.success) {
        navigation.navigate('WebView');
      } else {
        Alert.alert('Login Failed', 'Please enter valid credentials');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong while logging in');
    }
  }
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <ImageBackground source={require('../assets/Logos.png')} style={styles.background}>
    <View style={styles.container}>
  
    <Text style={styles.heading}>Login</Text>
      <TextInput
      style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
        placeholderTextColor="white"
      />
       <View style={styles.passwordInputContainer}>
      <TextInput
        style={styles.passwordInput}
        placeholder="Password"
        secureTextEntry={!showPassword}
        placeholderTextColor="white"
      />
      <TouchableOpacity style={styles.showHideButton} onPress={toggleShowPassword}>
        <MaterialCommunityIcons name={showPassword ? 'eye-off' : 'eye'} size={24}  color="white" />
      </TouchableOpacity>
    </View>
      
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      
    </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  form: {
    width: '80%',
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20
  },
  input: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 4,
    padding: 10,
    marginBottom: 20,
    width: '100%',
    color: 'white',
   
  },
  button: {
    backgroundColor: '#f7961e',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    width: '100%',
    color: 'white',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
   
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white',
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
    fontSize: 18,
    padding: 10,
    width: '100%',
    color: 'white',
  },
  showHideButton: {
    marginLeft: 5,
    padding: 5,
  },
});
export default Login;
