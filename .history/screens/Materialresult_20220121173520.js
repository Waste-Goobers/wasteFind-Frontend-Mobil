import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as firebase from 'firebase/app';
import { loggingOut } from '../API/firebaseMethods';
import { doc, setDoc, getDoc, getFirestore } from 'firebase/firestore';
import { LogBox } from 'react-native';
import _ from 'lodash';
import { Avatar } from 'react-native-elements';
import material_descs from '../utils/material_descs.json';
import {
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';

export default function Materialresult({ navigation, route }) {
  LogBox.ignoreLogs(['Warning:...']); // ignore specific logs
  LogBox.ignoreAllLogs(); // ignore all logs
  const _console = _.clone(console);
  console.warn = (message) => {
    if (message.indexOf('Setting a timer') <= -1) {
      _console.warn(message);
    }
  };

  const [accessToken, setAccessToken] = useState('dondurma');

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        user.getIdToken().then((token) => {
          setAccessToken(token);
        });
      }
    });
  }, []);

  const { material_type } = route.params;

  const handleBack = () => {
    navigation.navigate('Dashboard');
  };

  const decideMaterial = (materialType) => {
    if (materialType === 'cardboard') {
      return 'Karton';
    } else if (materialType === 'paper') {
      return 'Kağıt';
    } else if (materialType === 'metal') {
      return 'Metal';
    } else if (materialType === 'plastic') {
      return 'Plastik';
    } else if (materialType === 'glass') {
      return 'Cam';
    } else {
      return 'materyal bulunamadı';
    }
  };

  const decideMaterialIcon = (materialType) => {
    if (materialType === 'cardboard') {
      return <FontAwesome5 name="box-open" size={60} color="#444" />;
    } else if (materialType === 'paper') {
      return <FontAwesome name="newspaper-o" size={60} color="#444" />;
    } else if (materialType === 'metal') {
      return <Ionicons name="ios-hammer" size={60} color="#444" />;
    } else if (materialType === 'plastic') {
      return (
        <MaterialCommunityIcons
          name="bottle-soda-classic-outline"
          size={60}
          color="#444"
        />
      );
    } else if (materialType === 'glass') {
      return <FontAwesome5 name="glass-martini-alt" size={60} color="#444" />;
    } else {
      return 'materyal bulunamadı';
    }
  };

  const decideMaterialCard = (materialType) => {
    for (var material_desc in material_descs) {
      const titleOfMaterial = material_descs[material_desc].key;
      if (titleOfMaterial === materialType) {
        return material_descs[material_desc];
      }
    }
    return 'material not found';
  };

  const handleShowRC = async () => {
    try {
      const data = {
        location: { lat: 39.9314346, lng: 32.8442926 },
        type: material_type,
      };

      const response = await axios.post(
        'http://192.168.1.37:3000/mapping/location',
        data,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            authorization: `Bearer ${accessToken}`,
          },
        }
      );

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
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity onPress={handleBack} style={styles.button}>
          <Text style={styles.text}>Back</Text>
        </TouchableOpacity>
        <Image
          style={styles.navlogoImage}
          source={require('../assets/wasteFind_logo.png')}
        />
        <TouchableOpacity style={styles.button}></TouchableOpacity>
      </View>

      <View style={styles.materialCardContainer}>
        <View style={styles.materialCard}>
          <View>
            <Text>{decideMaterialIcon(material_type)}</Text>
          </View>
          <Text style={styles.text}>{decideMaterial(material_type)}</Text>
        </View>

        <View style={styles.materialCardDetail}>
          <Text style={styles.materialCardDetailTitle}>
            {decideMaterialCard(material_type).title}
          </Text>
          <Text style={styles.materialCardDetailText}>
            {decideMaterialCard(material_type).desc}
          </Text>
          <FontAwesome5 name="map-marked-alt" size={30} color="#01A263" />
          <TouchableOpacity onPress={handleShowRC} style={styles.showButton}>
            <Text style={styles.showRC}>Show Nearest Recycle Center</Text>
          </TouchableOpacity>
        </View>
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
    width: 80,
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
    fontSize: 18,
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
  materialCard: {
    height: 200,
    width: 250,
    margin: 20,
    borderRadius: 50,
    backgroundColor: '#e6e0cd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  materialCardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  materialCardDetail: {
    height: 300,
    width: '90%',
    margin: 20,
    borderRadius: 50,
    backgroundColor: '#e6e0cd',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  materialCardDetailTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#444',
    padding: 10,
  },
  materialCardDetailText: {
    padding: 25,
    textAlign: 'justify',
    fontSize: 17,
    color: '#444',
  },
  showRC: {
    textAlign: 'center',
    fontSize: 21,
    color: '#01A263',
  },
});
/** 
    fetch('http://192.168.1.41:3000/mapping/location', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: `Bearer ${accessToken}`,
      },
      body: data,
    })
      .then((response) => {
        if (!response.ok) throw new Error(response.status);
        else return response.json();
      })
      .then((data) => {
        Alert.alert(
          'Nearest Recycling Center: ' +
            data.recycle_centers.name +
            '(' +
            data.recycle_centers.district +
            ')'
        );
      })
      .catch((error) => {
        console.log('error: ' + error);
      });*/
