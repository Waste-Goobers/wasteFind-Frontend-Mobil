import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import * as firebase from 'firebase/app';
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function LoadingScreen({ navigation }) {
    useEffect(
        () => {
            const auth = getAuth();
            onAuthStateChanged(auth, (user) => {
                console.log(user);
                if (user) {
                    navigation.replace('Dashboard');
                } else {
                    navigation.replace('Home');
                }
            });
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