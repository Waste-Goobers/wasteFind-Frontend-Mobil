import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import apiKeys from '../config/keys';
import { Avatar } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MapViewDirections from 'react-native-maps-directions';
import MapView from 'react-native-maps';
import { useFocusEffect } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function MappingZipcode({ navigation, route }) {
  let { width, height } = Dimensions.get('window');
  width = width / 2;
  height = height / 2;
  const ASPECT_RATIO = width / height;
  const LATITUDE = 39.921583;
  const LONGITUDE = 32.83058;
  const LATITUDE_DELTA = 0.3822;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const GOOGLE_MAPS_APIKEY = apiKeys.googleMapsConfig.apiKey;

  const [, updateState] = useState();

  const [region, setRegion] = useState({
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  const activeCoordinatesRef = useRef({});

  const { recycle_centers } = route.params;
  const markersRef = useRef(recycle_centers);

  // const [markers, setMarkers] = useState([{ title: 'first place', coordinates: { latitude: 37.3318456, longitude: -122.0296002 } }, { title: 'first place', coordinates: { latitude: 37.771707, longitude: -122.4053769 } }]);
  const mapViewRef = useRef(null);

  const forceUpdate = useCallback(() => {
    updateState({});
    console.log('Map refreshed according to the newly added points');
  }, []);

  const animateMap = () => {
    mapViewRef.current.animateToRegion(region, 1000);
  };

  const onError = (errorMessage) => {
    console.log(errorMessage); // eslint-disable-line no-console
  };

  const handleBack = () => {
    markersRef.current = [];
    forceUpdate();
    navigation.navigate('ZipcodeForm');
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

      <SafeAreaView
        style={{ flex: 1, flexDirection: 'column', backgroundColor: '#376772' }}
      >
        <View style={styles.mapContainer}>
          <MapView
            initialRegion={region}
            style={StyleSheet.absoluteFill}
            ref={mapViewRef} // eslint-disable-line react/jsx-no-bind
          >
            {/* <MapView.Marker coordinate={origin} />
                        <MapView.Marker coordinate={destination} /> */}

            {markersRef.current.map((marker, index) => (
              <MapView.Marker
                key={`coordinate_${marker.id}`}
                coordinate={{
                  latitude: marker.location.lat,
                  longitude: marker.location.lng,
                }}
                title={marker.name + ' - ' + marker.district}
              />
            ))}
          </MapView>
        </View>
      </SafeAreaView>
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
  navlogoImage: {
    height: 32,
    width: 120,
  },
  mapContainer: {
    flex: 1,
    width: '100%',
    height: '50%',
    backgroundColor: '#EE5407',
    justifyContent: 'center',
    alignItems: 'center',
    // position: 'absolute',//uncomment this line to carry maps to bottom manually
    bottom: 0,
  },
});
