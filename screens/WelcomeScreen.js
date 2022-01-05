import { ImageBackground, StyleSheet, View, Text } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LogBox } from 'react-native';
import _ from 'lodash';
import VideoInput from './VideoInput';
import { FontAwesome } from '@expo/vector-icons';

export default function WelcomeScreen({ navigation }) {
    LogBox.ignoreLogs(['Warning:...']); // ignore specific logs
    LogBox.ignoreAllLogs(); // ignore all logs
    const _console = _.clone(console);
    console.warn = message => {
        if (message.indexOf('Setting a timer') <= -1) {
            _console.warn(message);
        }
    };


    return (
        <ImageBackground resizeMode='contain'
            style={styles.background}
            source={require('../assets/logo-for-wasteFind.png')}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Welcome to wasteFind App (Firebase/Firestore) <FontAwesome name="trash" size={30} color="green" /></Text>
            </View>
            <View style={styles.functionalityButtonsContainer}>
                {/* <VideoInput /> */}
            </View>
            <View style={styles.verificationButtonsContainer}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Sign Up')} >
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
                <Text style={styles.inlineText}>Already have an account?</Text>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Sign In')}>
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>
            </View>

        </ImageBackground>
    )
}


const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#deb887'
    },
    button: {
        width: 200,
        borderRadius: 15,
        borderWidth: 3,
        borderColor: 'white',
        backgroundColor: '#4ecdc4',
        padding: 5,
        margin: '2%'
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'navy',
        textAlign: 'center'
    },
    inlineText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'navy',
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
        marginTop: 50
    },

    verificationButtonsContainer: {
        position: 'absolute',
        bottom: 0,
        alignItems: 'center'
    },

    functionalityButtonsContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        position: 'relative'

    }
});