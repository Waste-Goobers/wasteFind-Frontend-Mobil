import axios from 'axios';
import { Alert } from 'react-native';

/**
 * @backend_base_url
 * @dev     local IP changes change IP
 * @prod    production code set api url
 */
export const baseUrl = 'http://192.168.1.41:3000';

/**
 * API Calls
 */
export async function backendTest() {
  try {
    const res = await axios.get(`${baseUrl}`);

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

export async function backendPhotoUpload(base64, accessToken, navigation) {
  fetch(`${baseUrl}/waste/photo-upload-mobile`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      imgsource: base64,
    }),
  })
    .then((response) => {
      if (!response.ok) throw new Error(response.status);
      else return response.json();
    })
    .then((data) => {
      navigation.navigate('Materialresult', {
        material_type: data.material,
      });
    })
    .catch((error) => {
      console.log('error: ' + error);
    });
}

export async function backendMappingLocation(data, accessToken, navigation) {
  try {
    const response = await axios.post(`${baseUrl}/mapping/location`, data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: `Bearer ${accessToken}`,
      },
    });

    //TODO: response will go to google maps component
    if (response.status === 200) {
      Alert.alert(
        'Nearest Recycling Center: ' +
        response.data.recycle_centers.name +
        '(' +
        response.data.recycle_centers.district +
        ')'
      );
    }
  } catch (error) {
    console.log('error: ' + error);
  }
}
