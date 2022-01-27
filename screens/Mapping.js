import { Dimensions, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import apiKeys from '../config/keys';
import { Avatar } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MapViewDirections from 'react-native-maps-directions';
import MapView from 'react-native-maps';
import { useFocusEffect } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function Mapping({ navigation }) {

    let { width, height } = Dimensions.get('window');
    width = width / 2;
    height = height / 2;
    const ASPECT_RATIO = width / height;
    const LATITUDE = 39.921583;
    const LONGITUDE = 32.830580;
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

    /*  const [coordinates, setCoordinates] = useState([{
         latitude: 39.911580,
         longitude: 32.829580
     }]); */

    // const [coordinates, setCoordinates] = useState({});
    const activeCoordinatesRef = useRef({});
    const markersRef = useRef([{
        title: 'first place',
        coordinates: {
            latitude: 39.921583,
            longitude: 32.830580
        },
    },
    {
        title: 'second place',
        coordinates: {
            latitude: 39.952912,
            longitude: 32.738841
        },
    }])
    // const [markers, setMarkers] = useState([{ title: 'first place', coordinates: { latitude: 37.3318456, longitude: -122.0296002 } }, { title: 'first place', coordinates: { latitude: 37.771707, longitude: -122.4053769 } }]);
    const mapViewRef = useRef(null);


    //SAN FRANCISCO BAY AREA APPLE OFFICE TO AIRBNB OFFICE DON'T MIND
    const origin = { latitude: 37.3318456, longitude: -122.0296002 };
    const destination = { latitude: 37.771707, longitude: -122.4053769 };

    useEffect(() => {
        /* setMarkers([{
            title: 'first place',
            coordinates: {
                latitude: 39.921583,
                longitude: 32.830580
            },
        },
        {
            title: 'second place',
            coordinates: {
                latitude: 39.952912,
                longitude: 32.738841
            },
        }
        ]) */
        console.log('markers been set')

    }, []);


    const forceUpdate = useCallback(() => {
        updateState({});
        console.log('Map refreshed according to the newly added points');
    }, []);

    /* 
        useEffect(() => {
            setCoordinates(
                {
                    latitude: 37.3317876,
                    longitude: -122.0054812,
                },
                {
                    latitude: 37.771707,
                    longitude: -122.4053769,
                });
     
            setMapView(null);
     
            return () => {
                cleanup
            };
        }, []);
     */
    const onMapPress = async (e) => {

        activeCoordinatesRef.current = e.nativeEvent.coordinate;

        /*  await setMarkers((prevMarkers) => {
             return [...prevMarkers, { title: 'Middle Place', coordinates: coordinates[0] }]
         }) */

        markersRef.current.push({ title: 'middle place', coordinates: activeCoordinatesRef.current });

        await animateMap();
        /* // console.log(e.nativeEvent.coordinate);*/
        console.log(activeCoordinatesRef.current);
        console.log(markersRef.current);
    }

    /* const onReady = () => {
        mapViewRef.current.animateToRegion(region,1000);
    } */

    const animateMap = () => {
        mapViewRef.current.animateToRegion(region, 1000);
    }

    const onError = (errorMessage) => {
        console.log(errorMessage); // eslint-disable-line no-console
    }

    const handleLogOutPress = () => {

        navigation.replace('Home');
    };

    return (
        <View style={styles.container}>
            <View style={styles.navbar}>
                <View>
                    <Avatar
                        size={40}
                        rounded
                        title={'Map'}
                        containerStyle={{ backgroundColor: '#444', marginLeft: 10 }}
                    />
                </View>
                <Image
                    style={styles.navlogoImage}
                    source={require('../assets/wasteFind_logo.png')}
                />
                <TouchableOpacity onPress={handleLogOutPress}>
                    <Avatar
                        size={40}
                        rounded
                        source={{
                            uri: 'https://images.emojiterra.com/twitter/v13.1/128px/1fa99.png',
                        }}
                        containerStyle={{ marginRight: 10 }}
                    />
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 20, color: '#fff8dc' }}>
                    Welcome To React Native Maps Page
                </Text>
                <MaterialCommunityIcons name="map-search" size={24} color="#fff8dc" />
            </View>
            <SafeAreaView style={{ flex: 1, flexDirection: 'column', backgroundColor: '#376772' }}>
                <View style={{ backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', flex: 0 }}>
                    <Text>Hello Dogukan</Text>
                </View>
                <View style={styles.mapContainer}>
                    <MapView
                        initialRegion={region}
                        style={StyleSheet.absoluteFill}
                        ref={mapViewRef} // eslint-disable-line react/jsx-no-bind
                        onPress={(e) => {
                            forceUpdate();
                            onMapPress(e);
                        }}
                    >
                        {/* <MapView.Marker coordinate={origin} />
                        <MapView.Marker coordinate={destination} /> */}

                        {markersRef.current.map((marker, index) => (
                            < MapView.Marker
                                key={`coordinate_${index}`}
                                coordinate={marker.coordinates}
                                title={marker.title}
                            />
                        ))}


                        {/*  To be carried to nearestRC Component */}
                        <MapViewDirections
                            origin={markersRef.current[0].coordinates}
                            destination={markersRef.current[1].coordinates}
                            // waypoints={markers[markers.length - 1].coordinates}
                            onReady={animateMap}
                            apikey={GOOGLE_MAPS_APIKEY}
                            strokeWidth={3}
                            optimizeWaypoints={true}
                            strokeColor="hotpink"
                            resetOnChange={false}
                        />
                        {/*  To be carried to nearestRC Component */}
                    </MapView>
                </View>
            </SafeAreaView >
        </View >

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

    }

});
