import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { signIn } from '../API/firebaseMethods';
import { LogBox } from 'react-native';
import _ from 'lodash';

export default function SignIn({ navigation }) {
  LogBox.ignoreLogs(['Warning:...']); // ignore specific logs
  LogBox.ignoreAllLogs(); // ignore all logs
  const _console = _.clone(console);
  console.warn = (message) => {
    if (message.indexOf('Setting a timer') <= -1) {
      _console.warn(message);
    }
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handlePress = async () => {
    if (!email) {
      Alert.alert('Email field is required.');
    } else if (!password) {
      Alert.alert('Password field is required.');
    } else {
      await signIn(email, password);
      setEmail('');
      setPassword('');
      navigation.replace('Dashboard');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logoImage}
        source={require('../assets/wastefind_searchicon.png')}
      />
      <View style={styles.formContainer}>
        <Text style={styles.text}>Sign in to your account:</Text>

        <TextInput
          style={styles.textInput}
          placeholder="Enter your email"
          value={email}
          onChangeText={(email) => setEmail(email)}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.textInput}
          placeholder="Enter your password"
          value={password}
          placeholderTextColor={"#fff8dc"}
          onChangeText={(password) => setPassword(password)}
          secureTextEntry={true}
        />

        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#e6e0cd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: -40,
  },
  textInput: {
    width: 300,
    fontSize: 18,
    borderRadius: 18,
    color: '#e6e0cd',
    borderWidth: 1,
    backgroundColor: '#01A263',
    borderColor: '#e6e0cd',
    padding: 10,
    margin: 5,
  },
  button: {
    width: 170,
    height: 50,
    justifyContent: 'center',
    borderRadius: 45,
    borderColor: 'white',
    backgroundColor: '#01A263',
    padding: 5,
    margin: '2%',
  },

  buttonText: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
  },

  text: {
    textAlign: 'center',
    fontSize: 22,
    margin: '5%',
    marginTop: '15%',
    fontWeight: 'bold',
    color: '#01A263',
  },
  logoImage: {
    marginTop: 80,
    height: 210,
    width: 180,
  },
});
