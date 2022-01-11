import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Camera } from 'expo-camera';
import { Video } from 'expo-av';
import axios from 'axios';

const WINDOW_HEIGHT = Dimensions.get('window').height;
const closeButtonSize = Math.floor(WINDOW_HEIGHT * 0.032);
const captureSize = Math.floor(WINDOW_HEIGHT * 0.09);

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [isPreview, setIsPreview] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const cameraRef = useRef();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  const onCameraReady = () => {
    setIsCameraReady(true);
  };
  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true, skipProcessing: true };
      const data = await cameraRef.current.takePictureAsync(options);
      const source = data.uri;

      if (source) {
        await cameraRef.current.pausePreview();
        setIsPreview(true);
        uploadFile(data);
        console.log('picture source', source);
      }
    }
  };

  async function uploadFile(photo) {
    const formData = new FormData();

    formdata.append('file', {
      uri: Platform.OS === 'android' ? photo.uri : 'file://' + photo.uri,
      name: 'test',
      mimetype: 'image/jpeg', // or your mime type what you want
    });

    axios
      .post('http://192.168.1.41:3000/photo-upload', formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log(res.data);
        return res.data;
      });

    /*data.append('file', {
      uri: data.uri,
      originalname: 'waste.jpg',
      type: 'image/jpg',
      fieldname: 'file',
    });*/

    /*let options = {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    };*/
    // let fileType = source.substring(source.lastIndexOf('.') + 1);
    /*
    formData.append('file', {
      uri: 'file://var/mobile/Containers/Data/Application/A62329D8-E86E-4F81-9ADD-99A81428D3E6/Library/Caches/ExponentExperienceData/%2540anonymous%252FwasteFind-Frontend-Mobil-d28d1d49-92f4-429d-b7fd-2580b70f29a1/Camera/5B4B7AF9-8D8F-40DF-8438-576709725DF8.jpg',
      name: 'photo.jpg',
      type: 'jpg',
    });*/

    /*
    const backendResponse = await axios.post(
      'http://192.168.1.41:3000/photo-upload',
      formData,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    */

    // console.log(backendResponse);
  }

  /* 
        const onPictureSaved = photo => {
            console.log(photo);
        } */

  const switchCamera = () => {
    if (isPreview) {
      return;
    }
    setCameraType((prevCameraType) =>
      prevCameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };
  const cancelPreview = async () => {
    await cameraRef.current.resumePreview();
    setIsPreview(false);
  };
  const renderCancelPreviewButton = () => (
    <TouchableOpacity onPress={cancelPreview} style={styles.closeButton}>
      <View style={[styles.closeCross, { transform: [{ rotate: '45deg' }] }]} />
      <View
        style={[styles.closeCross, { transform: [{ rotate: '-45deg' }] }]}
      />
    </TouchableOpacity>
  );

  const renderCaptureControl = () => (
    <View style={styles.control}>
      <TouchableOpacity disabled={!isCameraReady} onPress={switchCamera}>
        <Text style={styles.text}>{'Flip'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        disabled={!isCameraReady}
        onPress={takePicture}
        style={styles.capture}
      />
    </View>
  );

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text style={styles.text}>No access to camera</Text>;
  }
  return (
    <SafeAreaView style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.container}
        type={cameraType}
        flashMode={Camera.Constants.FlashMode.on}
        onCameraReady={onCameraReady}
        onMountError={(error) => {
          console.log('cammera error', error);
        }}
      />
      <View style={styles.container}>
        {isPreview && renderCancelPreviewButton()}
        {!isPreview && renderCaptureControl()}
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  closeButton: {
    position: 'absolute',
    top: 35,
    left: 15,
    height: closeButtonSize,
    width: closeButtonSize,
    borderRadius: Math.floor(closeButtonSize / 2),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c4c5c4',
    opacity: 0.7,
    zIndex: 2,
  },
  media: {
    ...StyleSheet.absoluteFillObject,
  },
  closeCross: {
    width: '68%',
    height: 1,
    backgroundColor: 'black',
  },
  control: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 38,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  capture: {
    backgroundColor: '#f5f6f5',
    borderRadius: 5,
    height: captureSize,
    width: captureSize,
    borderRadius: Math.floor(captureSize / 2),
    marginHorizontal: 31,
  },
  recordIndicatorContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 25,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    opacity: 0.7,
  },
  recordTitle: {
    fontSize: 14,
    color: '#ffffff',
    textAlign: 'center',
  },
  recordDot: {
    borderRadius: 3,
    height: 6,
    width: 6,
    backgroundColor: '#ff0000',
    marginHorizontal: 5,
  },
  text: {
    color: '#fff',
  },
});
