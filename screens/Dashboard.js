import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as firebase from 'firebase/app';
import { loggingOut } from '../API/firebaseMethods';
import { getAuth } from 'firebase/auth';
import { doc, setDoc, getDoc, getFirestore } from "firebase/firestore";

export default function Dashboard({ navigation }) {

    const auth = getAuth();
    let currentUserUID = auth.currentUser.uid;
    const [firstName, setFirstName] = useState('');

    useEffect(() => {
        async function getUserInfo() {
            const db = getFirestore();
            const docRef = doc(db, "users", currentUserUID);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                let dataObj = docSnap.data();
                setFirstName(dataObj.firstName)
            } else {
                Alert.alert('No user data found!');
            }
        }
        getUserInfo();
    })

    const handlePress = () => {
        loggingOut();
        navigation.replace('Home');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Dashboard</Text>
            <Text style={styles.text}>Hi {firstName}</Text>
            <TouchableOpacity style={styles.button} onPress={handlePress}>
                <Text style={styles.buttonText}>Log Out</Text>
            </TouchableOpacity>
        </View>
    )
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
    buttonText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: '#3FC5AB',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        textAlign: 'center',
        fontSize: 20,
        fontStyle: 'italic',
        marginTop: '2%',
        marginBottom: '10%',
        fontWeight: 'bold',
        color: 'black',
    },
    titleText: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        color: '#2E6194',
    },
});