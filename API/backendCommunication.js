import axios from 'axios';
import { Alert } from 'react-native';

export async function backendTest() {
  try {
    const res = await axios.get('http://192.168.1.41:3000/');

    if (res.status === 200) {
      Alert.alert(
        'Connection Succesfull via localhost backend res is ' + res.data.name
      );
    }

    console.log(res.data);
  } catch (err) {
    Alert.alert('There is something wrong!', err.message);
  }
}
