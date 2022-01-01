import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, View } from 'react-native';
import * as firebase from 'firebase/app';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { LogBox } from 'react-native';
import _ from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoadingScreen({ navigation }) {
    LogBox.ignoreLogs(['Warning:...']); // ignore specific logs
    LogBox.ignoreAllLogs(); // ignore all logs
    const _console = _.clone(console);
    console.warn = message => {
        if (message.indexOf('Setting a timer') <= -1) {
            _console.warn(message);
        }
    };

    const [accessToken, setAccessToken] = useState('dondurma');
    // const [auth, setAuth] = useState(false || AsyncStorage.getItem("auth").then((isAuthenticated) => isAuthenticated === 'true'));

    useEffect(
        () => {
            let unmounted = false;
            const auth = getAuth();
            onAuthStateChanged(auth, (user) => {
                if (user !== null) {
                    // setAuth(true);

                    user.getIdToken().then((token) => {
                        console.log('Here is your user access token(use this in communications between wasteFind backend and Frontend instead of using user.uid):\n' + token);
                        if (!unmounted) {
                            setAccessToken(token);
                        }
                    });
                    navigation.replace('Dashboard');

                } else {
                    navigation.replace('Home');
                }

            });
            return () => { unmounted = true };
        }
    );

    return (
        <View style={styles.container}>
            <ActivityIndicator size='large' />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: '#3FC5AB',
        alignItems: 'center',
        justifyContent: 'center',
    },
});