import * as Location from "expo-location"
import React, { useEffect, useRef, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import MapView, { Marker, Overlay } from 'react-native-maps'
import CustomButton from '../../components/CustomButton'
import Events from "../../components/Events"
import { mapstyle1 } from "../../styling/mapstyles"

const Home = () => {
  // const { data: posts, refetch } = useAppwrite(getAllPosts);

  var posts = [{"$collectionId": "668e5083002b3f534cf3", "$createdAt": "2024-07-12T10:17:03.558+00:00", "$databaseId": "668e503d0036733ee658", "$id": "669102a0003c95af39aa", "$permissions": [], "$tenant": "165998", "$updatedAt": "2024-07-12T10:17:03.558+00:00", "prompt": "Picture the future of coding with AI. Show AR VR", "thumbnail": "https://wildlife.foothillsclusters.com/wp-content/uploads/2023/05/230518-03.jpg", "title": "How AI Shapes Coding Future", "users": {"$collectionId": "668e5057003aed7c3b16", "$createdAt": "2024-07-10T14:46:56.037+00:00", "$databaseId": "668e503d0036733ee658", "$id": "668e9ee100305aae9daf", "$permissions": [Array], "$tenant": "165998", "$updatedAt": "2024-07-10T14:46:56.037+00:00", "accountId": "668e9edf001c2f7b6117", "avatar": "https://cloud.appwrite.io/v1/avatars/initials?name=immraj&project=668e4f04003bfae2a718", "email": "immanuelraj154@gmail.com", "username": "immraj"}, "video": "https://player.vimeo.com/video/949581999?h=4672125b31"}, {"$collectionId": "668e5083002b3f534cf3", "$createdAt": "2024-07-12T10:17:47.089+00:00", "$databaseId": "668e503d0036733ee658", "$id": "669102cc0021f55940c3", "$permissions": [], "$tenant": "165998", "$updatedAt": "2024-07-12T10:17:47.089+00:00", "prompt": "Create a motivating AI driven video aimed at inspiring coding enthusiasts with simple language", "thumbnail": "https://cms.whipsnadezoo.org/sites/default/files/styles/responsive/public/1024/1024/0/2022-12/Meet-the-Animals-24-Photo-by-Justin-Doherty.jpg.webp", "title": "Get inspired to code", "users": {"$collectionId": "668e5057003aed7c3b16", "$createdAt": "2024-07-10T14:46:56.037+00:00", "$databaseId": "668e503d0036733ee658", "$id": "668e9ee100305aae9daf", "$permissions": [Array], "$tenant": "165998", "$updatedAt": "2024-07-10T14:46:56.037+00:00", "accountId": "668e9edf001c2f7b6117", "avatar": "https://cloud.appwrite.io/v1/avatars/initials?name=immraj&project=668e4f04003bfae2a718", "email": "immanuelraj154@gmail.com", "username": "immraj"}, "video": "https://player.vimeo.com/video/949579770?h=897cd5e781"}, {"$collectionId": "668e5083002b3f534cf3", "$createdAt": "2024-07-12T10:18:22.338+00:00", "$databaseId": "668e503d0036733ee658", "$id": "669102ef003c49d4c7bd", "$permissions": [], "$tenant": "165998", "$updatedAt": "2024-07-12T10:18:22.338+00:00", "prompt": "Create a heartwarming video following the travels of dalmatian dog exploring beautiful Italy", "thumbnail": "https://cdn.britannica.com/83/195983-138-66807699/numbers-tiger-populations.jpg?w=800&h=450&c=crop", "title": "Dalmatian's journey through Italy", "users": {"$collectionId": "668e5057003aed7c3b16", "$createdAt": "2024-07-10T14:46:56.037+00:00", "$databaseId": "668e503d0036733ee658", "$id": "668e9ee100305aae9daf", "$permissions": [Array], "$tenant": "165998", "$updatedAt": "2024-07-10T14:46:56.037+00:00", "accountId": "668e9edf001c2f7b6117", "avatar": "https://cloud.appwrite.io/v1/avatars/initials?name=immraj&project=668e4f04003bfae2a718", "email": "immanuelraj154@gmail.com", "username": "immraj"}, "video": "https://player.vimeo.com/video/949582778?h=d60220d68d"}]

  const [refreshing, setRefreshing] = useState(false)
  const mapRef = useRef(null); 
  const [currentLocation, setCurrentLocation] = useState(null);


  const onRefresh = async () => {
    setRefreshing(true);
    // await refetch();
    setRefreshing(false);
  }

  const [region, setRegion] = useState({
    latitude: 48.7460,
    longitude: 2.66315,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  // const zooRegion = {
  //   latitude: 48.7460,
  //   longitude: 2.66315,
  //   latitudeDelta: 0.003,
  //   longitudeDelta: 0.003,
  // };

  const zooRegion = {
    latitude: 51.535121,
    longitude: -0.154131,
    latitudeDelta: 0.003,
    longitudeDelta: 0.003,
  };

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to  access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);

      setInitialRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    };

    getLocation();
  }, []);

  const goToZoo = () => {
    //Animate the user to new region. Complete this animation in 3 seconds
    mapRef.current.animateToRegion(zooRegion, 500);
  };

  const mapView = React.createRef();

  const animateMap = () => {
    mapView.current.animateToRegion(zooRegion, 1000); 
  }

  const imageBounds = [
    [51.533119, -0.159473], // Southwest coordinates
    [51.536625, -0.151500], // Northeast coordinates
  ];

  return (
    <View style={styles.container}>
    <MapView
      style={styles.map}
      ref={mapRef}
      initialRegion={zooRegion}
      showsUserLocation={true}
      customMapStyle={mapstyle1}
      onRegionChangeComplete={(region) => setRegion(region)}
      provider={MapView.PROVIDER_GOOGLE}
    >

      <Overlay  
        image={require("../../assets/mapoverlays/londonzoo.png")}
        bounds = {imageBounds}
        bearing = {0.6}
        style = {styles.overlay}
        opacity = {0.0}
      />

        <Marker
          coordinate={{
            latitude: 51.535121,
            longitude: -0.154131,
          }}
        > 
           <View>
            <Image
              source={require("../../assets/amimalicons/hippo.png")}
              style={{width: 60, height: 60}}
              resizeMode="contain"
            />
          </View>
        </Marker>

        <Marker
          coordinate={{
            latitude: 51.535121,
            longitude: -0.1547,
          }}
        > 
           <View>
            <Image
              source={require("../../assets/amimalicons/tiger.png")}
              style={{width: 60, height: 60}}
              resizeMode="contain"
            />
          </View>
        </Marker>


        <Marker
          coordinate={{
            latitude: 51.5355,
            longitude: -0.155,
          }}
        > 
           <View>
            <Image
              source={require("../../assets/amimalicons/giraffe.png")}
              style={{width: 60, height: 60}}
              resizeMode="contain"
            />
          </View>
        </Marker>

    </MapView>

    <CustomButton handlePress={() => goToZoo()} title="Go to Zoo" />
    {/* <TouchableOpacity onPress={animateMap}><Text>Start</Text></TouchableOpacity> */}
    {/*Display user's current region:*/}
    <Text style={styles.text}>Current latitude : {region.latitude}</Text>
    <Text style={styles.text}>Current longitude: {region.longitude}</Text>
    <Events posts={posts} />
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1, //the container will fill the whole screen.
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    transform: [{ rotate: '90deg' }],
  },
});
 
const overlayStyles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    transform: [{ rotate: '90deg' }],
  },
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     width: '100%',
//     height: '100%',
//   },
// });

export default Home
