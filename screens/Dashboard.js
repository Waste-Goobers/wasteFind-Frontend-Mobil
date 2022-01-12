import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as firebase from 'firebase/app';
import { loggingOut } from '../API/firebaseMethods';
import { getAuth } from 'firebase/auth';
import { doc, setDoc, getDoc, getFirestore } from 'firebase/firestore';
import { LogBox } from 'react-native';
import _ from 'lodash';
import { Avatar } from 'react-native-elements';

export default function Dashboard({ navigation }) {
  LogBox.ignoreLogs(['Warning:...']); // ignore specific logs
  LogBox.ignoreAllLogs(); // ignore all logs
  const _console = _.clone(console);
  console.warn = (message) => {
    if (message.indexOf('Setting a timer') <= -1) {
      _console.warn(message);
    }
  };

  const [firstName, setFirstName] = useState('');
  const [flag, setFlag] = useState(true);

  useEffect(() => {
    async function getUserInfo() {
      const auth = getAuth();
      let currentUserUID = auth.currentUser.uid;
      const db = getFirestore();
      const docRef = doc(db, 'users', currentUserUID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        //Alert.alert('Successfully Signed In');
        let dataObj = docSnap.data();
        setFirstName(dataObj.firstName);
      } else {
        Alert.alert('No user data found!');
      }
    }
    if (flag) {
      getUserInfo();
      setFlag(false);
    }
  }, []);

  const handleLogOutPress = () => {
    loggingOut();
    navigation.replace('Home');
  };

  const handleVideoCamPress = () => {
    navigation.replace('VideoInput');
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <View>
          <Avatar
            size={40}
            rounded
            title={firstName.substring(0, 2)}
            containerStyle={{ backgroundColor: '#444', marginLeft: 10 }}
          />
        </View>
        <Image
          style={styles.navlogoImage}
          source={require('../assets/wasteFind_logo.png')}
        />
        <TouchableOpacity onPress={handleLogOutPress}>
          <Avatar
            size={40}
            rounded
            source={{
              uri: 'https://images.emojiterra.com/twitter/v13.1/128px/1fa99.png',
            }}
            containerStyle={{ marginRight: 10 }}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.buttonAnalyzeWasteContainer}>
        <Text style={styles.descText}>Tap to Scan Trash</Text>

        <TouchableOpacity
          style={styles.buttonAnalyzeWaste}
          onPress={handleVideoCamPress}
        >
          <Image
            style={styles.logoImage}
            source={require('../assets/wastefind_searchicon.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#01A263',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 30,
    height: 80,
    width: '100%',
    backgroundColor: '#e6e0cd',
  },
  button: {
    marginTop: 30,
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
  buttonOpenCamText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  text: {
    textAlign: 'center',
    fontSize: 25,
    color: '#444',
  },
  titleText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2E6194',
  },
  buttonAnalyzeWasteContainer: {
    marginTop: '23%',
    alignItems: 'center',
    margin: 30,
    padding: 30,
  },
  buttonAnalyzeWaste: {
    height: 220,
    width: 220,
    borderRadius: 110,
    backgroundColor: '#e6e0cd',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 0,
    borderWidth: 4,
    borderBottomWidth: 6,
    borderColor: '#d3cebd',
  },
  buttonAnalyzeWasteText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  navlogoImage: {
    height: 32,
    width: 120,
  },
  logoImage: {
    marginTop: 35,
    height: 210,
    width: 180,
  },

  descText: {
    marginBottom: 15,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e6e0cd',
  },
});
