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

    if (response.status === 200) {
      Alert.alert(
        'Nearest Recycling Center: ' +
          response.data.recycle_centers.name +
          '(' +
          response.data.recycle_centers.district +
          ')' +
          ' Route has been calculated 🥳'
      );
      const dest_route = [
        {
          title: 'Gazi University',
          coordinates: {
            latitude: 39.9314346,
            longitude: 32.8442926,
          },
        },
        {
          title: response.data.recycle_centers.name,
          coordinates: {
            latitude: response.data.recycle_centers.location.lat,
            longitude: response.data.recycle_centers.location.lng,
          },
        },
      ];
      navigation.navigate('Mapping', {
        destination_cordinates: dest_route,
      });
    }
  } catch (error) {
    console.log('error: ' + error);
  }
}

export async function backendMappingZipcodeLocation(data, navigation) {
  try {
    const response = await axios.post(`${baseUrl}/mapping/zipcode`, data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      Alert.alert('Nearest Recycling Centers by Zipcode Calculated 🥳');

      navigation.navigate('MappingZipcode', {
        recycle_centers: response.data.recycle_centers,
      });
    }
  } catch (error) {
    console.log('error: ' + error);
  }
}

const destination_cordinates = [
  {
    title: 'first place',
    coordinates: {
      latitude: 39.921583,
      longitude: 32.83058,
    },
  },
  {
    title: 'second place',
    coordinates: {
      latitude: 39.952912,
      longitude: 32.738841,
    },
  },
];
