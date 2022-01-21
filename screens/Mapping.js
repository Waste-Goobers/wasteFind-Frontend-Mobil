import { Dimensions, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import apiKeys from '../config/keys';
import { Avatar } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MapViewDirections from 'react-native-maps-directions';
import MapView from 'react-native-maps';
import { useFocusEffect } from '@react-navigation/native';

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

    const [coordinates, setCoordinates] = useState([{
        latitude: 39.911580,
        longitude: 32.829580
    }]);
    const [markers, setMarkers] = useState([{ title: 'first place', coordinates: { latitude: 37.3318456, longitude: -122.0296002 } }, { title: 'first place', coordinates: { latitude: 37.771707, longitude: -122.4053769 } }]);
    const [mapView, setMapView] = useState(null);


    //SAN FRANCISCO BAY AREA APPLE OFFICE TO AIRBNB OFFICE DON'T MIND
    const origin = { latitude: 37.3318456, longitude: -122.0296002 };
    const destination = { latitude: 37.771707, longitude: -122.4053769 };

    useEffect(() => {
        setMarkers([{
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
        ])
        console.log('markers been set')

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
        await setCoordinates((prevCoordinates) => {
            return [...prevCoordinates, e.nativeEvent.coordinate];
        })
        /*  await setMarkers((prevMarkers) => {
             return [...prevMarkers, { title: 'Middle Place', coordinates: coordinates[coordinates.length - 1] }]
         }) */
        /* // console.log(e.nativeEvent.coordinate);
        console.log(coordinates);
        console.log(markers); */
    }

    const onReady = (result) => {
        mapView.fitToCoordinates(result.coordinates, {
            edgePadding: {
                right: (width / 10),
                bottom: (height / 10),
                left: (width / 10),
                top: (height / 10),
            },
        });
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

            <Text>Welcome To React Native Maps Page</Text>
            <SafeAreaView style={{ flex: 1, flexDirection: 'column', backgroundColor: '#376772' }}>
                <View style={{ backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', flex: 0 }}>
                    <Text>Hello</Text>
                </View>
                <View style={styles.mapContainer}>
                    <MapView initialRegion={{
                        latitude: LATITUDE,
                        longitude: LONGITUDE,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }}
                        style={StyleSheet.absoluteFill}
                        ref={c => setMapView(c)} // eslint-disable-line react/jsx-no-bind
                        onPress={onMapPress}
                    >
                        {/* <MapView.Marker coordinate={origin} />
                        <MapView.Marker coordinate={destination} /> */}
                        {markers.map((marker, index) => (
                            <MapView.Marker
                                key={`coordinate_${index}`}
                                coordinate={marker.coordinates}
                                title={marker.title}
                            />
                        ))}
                        {/*  To be carried to nearestRC Component */}
                        <MapViewDirections
                            origin={markers[0].coordinates}
                            destination={markers[1].coordinates}
                            // waypoints={markers[markers.length - 1].coordinates}
                            onReady={onReady}
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
