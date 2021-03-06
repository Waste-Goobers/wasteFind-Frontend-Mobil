import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import { Alert } from "react-native";

export async function registration(email, password, lastName, firstName) {
    try {
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, email, password).catch((error) => {
            console.error(error);
        });


        const currentUser = auth.currentUser;

        const db = getFirestore();

        // Add a new document in collection "users"
        await setDoc(doc(db, "users", currentUser.uid), {
            email: currentUser.email,
            lastName: lastName,
            firstName: firstName,
            scanHistory: []
        });

    } catch (err) {
        Alert.alert("There is something wrong!!!", err.message);
    }
}

export async function signIn(email, password) {
    try {

        const auth = getAuth();
        await signInWithEmailAndPassword(auth, email, password);
        console.log('I am here now')
        // const currentUser = auth.currentUser;
        // currentUser.getIdToken().then((token) => console.log(token));
    } catch (err) {
        Alert.alert("There is something wrong!", err.message);
    }
}

export async function loggingOut() {
    try {
        const auth = getAuth();
        await signOut(auth);
    } catch (err) {
        Alert.alert('There is something wrong!', err.message);
    }
}