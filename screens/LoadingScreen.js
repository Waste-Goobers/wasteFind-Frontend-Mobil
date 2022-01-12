import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, View } from 'react-native';
//import * as firebase from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { LogBox } from 'react-native';
import _ from 'lodash';
//import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoadingScreen({ navigation, setToken }) {
  LogBox.ignoreLogs(['Warning:...']); // ignore specific logs
  LogBox.ignoreAllLogs(); // ignore all logs
  const _console = _.clone(console);
  console.warn = (message) => {
    if (message.indexOf('Setting a timer') <= -1) {
      _console.warn(message);
    }
  };

  const [accessToken, setAccessToken] = useState('dondurma');
  // const [auth, setAuth] = useState(false || AsyncStorage.getItem("auth").then((isAuthenticated) => isAuthenticated === 'true'));

  useEffect(() => {
    let unmounted = false;
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // setAuth(true);

        user.getIdToken().then((token) => {
          console.log(
            'Here is your user access token(use this in communications between wasteFind backend and Frontend instead of using user.uid):\n' +
              token
          );
          setAccessToken(token);
          setToken(token);
          // if (!unmounted) {
          //     setAccessToken(token);
          // }
        });
        navigation.replace('Dashboard');
      } else {
        navigation.replace('Home');
      }
    });
    //return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={styles.logoImage}
        source={require('../assets/wastefind_searchicon.png')}
      />
      <ActivityIndicator size="large" />
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
  logoImage: {
    marginTop: 80,
    height: 210,
    width: 180,
  },
});
