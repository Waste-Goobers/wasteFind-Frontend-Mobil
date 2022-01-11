import { ImageBackground, StyleSheet, View, Text, Image } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LogBox } from 'react-native';
import _ from 'lodash';
import { FontAwesome } from '@expo/vector-icons';

export default function WelcomeScreen({ navigation }) {
  LogBox.ignoreLogs(['Warning:...']); // ignore specific logs
  LogBox.ignoreAllLogs(); // ignore all logs
  const _console = _.clone(console);
  console.warn = (message) => {
    if (message.indexOf('Setting a timer') <= -1) {
      _console.warn(message);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="contain"
        style={styles.background}
        source={require('../assets/wasteFind_logo.png')}
      >
        <Image
          style={styles.logoImage}
          source={require('../assets/wastefind_searchicon.png')}
        />
        <View style={styles.verificationButtonsContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Sign Up')}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          <Text style={styles.inlineText}>Already have an account?</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Sign In')}
          >
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#e6e0cd',
    paddingTop: 70,
    paddingBottom: 100,
  },

  background: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    width: 280,
    height: 280,
  },
  button: {
    width: 170,
    height: 50,
    justifyContent: 'center',
    borderRadius: 40,
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
  inlineText: {
    fontSize: 13,
    color: '#444',
    textAlign: 'center',
    marginTop: '5%',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fffafa',
    textAlign: 'center',
  },
  titleContainer: {
    position: 'relative',
    marginTop: 50,
  },

  verificationButtonsContainer: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
  },

  functionalityButtonsContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'relative',
  },
  logoImage: {
    marginTop: -25,
    height: 140,
    width: 120,
  },
});
