import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as firebase from 'firebase/app';
import { loggingOut } from '../API/firebaseMethods';
import { getAuth } from 'firebase/auth';
import { doc, setDoc, getDoc, getFirestore } from 'firebase/firestore';
import { LogBox } from 'react-native';
import _ from 'lodash';
import VideoInput from './VideoInput';
import { backendTest } from '../API/backendCommunication';

export default function Dashboard({ navigation }) {
  LogBox.ignoreLogs(['Warning:...']); // ignore specific logs
  LogBox.ignoreAllLogs(); // ignore all logs
  const _console = _.clone(console);
  console.warn = (message) => {
    if (message.indexOf('Setting a timer') <= -1) {
      _console.warn(message);
    }
  };

  const auth = getAuth();
  let currentUserUID = auth.currentUser.uid;
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    async function getUserInfo() {
      const db = getFirestore();
      const docRef = doc(db, 'users', currentUserUID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        Alert.alert('Successfully Signed In');
        let dataObj = docSnap.data();
        setFirstName(dataObj.firstName);
      } else {
        Alert.alert('No user data found!');
      }
    }
    getUserInfo();
  });

  const handlePress = () => {
    loggingOut();
    navigation.replace('Home');
  };

  const handlePressTestBackend = () => {
    backendTest();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Dashboard</Text>
      <Text style={styles.text}>Hello {firstName}</Text>
      <TouchableOpacity>
        <VideoInput />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonLogOutText}>Log Out</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handlePressTestBackend}>
        <Text style={styles.buttonLogOutText}>Test</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 150,
    padding: 5,
    backgroundColor: '#ff9999',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 15,
    alignSelf: 'center',
  },
  buttonLogOutText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#bdb76b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 30,
    fontStyle: 'italic',
    marginTop: '2%',
    marginBottom: '10%',
    fontWeight: 'bold',
    color: '#a52a2a',
  },
  titleText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2E6194',
  },
});
