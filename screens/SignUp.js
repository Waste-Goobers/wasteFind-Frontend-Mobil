import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  ScrollView,
  Keyboard,
  StyleSheet,
  Image,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { registration } from '../API/firebaseMethods';
import { LogBox } from 'react-native';
import _ from 'lodash';

export default function SignUp({ navigation }) {
  LogBox.ignoreLogs(['Warning:...']); // ignore specific logs
  LogBox.ignoreAllLogs(); // ignore all logs
  const _console = _.clone(console);
  console.warn = (message) => {
    if (message.indexOf('Setting a timer') <= -1) {
      _console.warn(message);
    }
  };

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const emptyState = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const handlePress = async () => {
    if (!firstName) {
      Alert.alert('First name is required');
    } else if (!email) {
      Alert.alert('Email field is required.');
    } else if (!password) {
      Alert.alert('Password field is required.');
    } else if (!confirmPassword) {
      setPassword('');
      Alert.alert('Confirm password field is required.');
    } else if (password !== confirmPassword) {
      Alert.alert('Password does not match!');
    } else if (password.length < 6 || confirmPassword.length < 6) {
      Alert.alert('Password length must be greater than 6!');
    } else {
      await registration(email, password, lastName, firstName);
      navigation.navigate('Loading');
      emptyState();
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logoImage}
        source={require('../assets/wastefind_searchicon.png')}
      />
      <Text style={styles.text}>Create an account </Text>

      <ScrollView onBlur={Keyboard.dismiss}>
        <TextInput
          style={styles.textInput}
          placeholder="First name*"
          value={firstName}
          onChangeText={(name) => setFirstName(name)}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Last name"
          value={lastName}
          onChangeText={(name) => setLastName(name)}
        />

        <TextInput
          style={styles.textInput}
          placeholder="Enter your email*"
          value={email}
          onChangeText={(email) => setEmail(email)}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.textInput}
          placeholder="Enter your password*"
          value={password}
          onChangeText={(password) => setPassword(password)}
          secureTextEntry={true}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Retype your password to confirm*"
          value={confirmPassword}
          onChangeText={(password2) => setConfirmPassword(password2)}
          secureTextEntry={true}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          <Text style={styles.inlineText}>Already have an account?</Text>
          <TouchableOpacity
            style={styles.buttonAlternative}
            onPress={() => navigation.navigate('Sign In')}
          >
            <Text style={styles.buttonTextAlternative}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 35,
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
  buttonAlternative: {
    width: 170,
    height: 50,
    justifyContent: 'center',
    borderRadius: 45,
    borderColor: 'white',
    backgroundColor: '#e6e0cd',
    padding: 5,
    margin: '2%',
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
  },
  buttonTextAlternative: {
    fontSize: 20,
    color: '#01A263',
    textAlign: 'center',
  },
  inlineText: {
    fontSize: 13,
    color: '#444',
    textAlign: 'center',
    marginTop: '5%',
  },
  text: {
    textAlign: 'center',
    fontSize: 25,
    margin: '5%',
    marginTop: '15%',
    fontWeight: 'bold',
    color: '#01A263',
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
  logoImage: {
    height: 80,
    width: 60,
    marginBottom: -60,
    marginTop: 30,
  },
});
