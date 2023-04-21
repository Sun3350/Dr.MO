import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);


  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      const response = await fetch('https://your-backend-api.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Account created successfully');
        navigation.navigate('LoginScreen');
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while registering. Please try again later.');
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ImageBackground source={require('../assets/Logos.png')} style={styles.background}>
    
    <View style={styles.container}>
      <Text style={styles.heading}>SignUp</Text>
      <TextInput
        style={styles.input}
        placeholder="FullName"
        value={username}
        onChangeText={setUsername}
        required
        placeholderTextColor="white"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        required
        onChangeText={setEmail}
        placeholderTextColor="white"
      />
     
     
      <View style={styles.passwordInputContainer}>
      <TextInput
        style={styles.passwordInput}
        placeholder="Password"
        secureTextEntry={!showPassword}
        value={password}
        required
        placeholderTextColor="white"
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.showHideButton} onPress={toggleShowPassword}>
        <MaterialCommunityIcons name={showPassword ? 'eye-off' : 'eye'} size={24} color="white" />
      </TouchableOpacity>
    </View>
    <View style={styles.passwordInputContainer}>
      <TextInput
        style={styles.passwordInput}
        placeholder="Confirm Password"
        secureTextEntry={!showPassword}
        placeholderTextColor="white"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <TouchableOpacity style={styles.showHideButton} onPress={toggleShowPassword}>
        <MaterialCommunityIcons name={showPassword ? 'eye-off' : 'eye'} size={24} color="white"/>
      </TouchableOpacity>
    </View>
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
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

export default RegisterScreen;
