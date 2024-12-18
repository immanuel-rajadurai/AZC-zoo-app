
// <View>
//       <FlatList
//         ListHeaderComponent={() => (
//           <View className="my-6 px-4 space-y-6">
//             <View className="justify-between items-start flex-row mb-6 border w-full flex-1 pt=5 pb-8">
//              <Text>Map goes here</Text>
//             </View>
            
//             {/* <View className="w-full flex-1 pt=5 pb-8">
              
//               <Text className="text-black-500 text-2xl font-psemibold">
//                 Events
//               </Text>

//               <Events
//                 posts={posts ?? []}
//               />
//             </View> */}
//           </View>
//         )}


   
   
//       />
//       </View>


// import { View, Text, FlatList, Image, RefreshControl, Alert, StyleSheet, Button, TouchableOpacity  } from 'react-native'
// import React, { useEffect, useState, useRef  } from 'react'
// import { SafeAreaView } from 'react-native-safe-area-context'
// import { images } from '../../constants'
// import SearchInput from '../../components/searchInput'
// import Events from '../../components/Events'
// import EmptyState from '../../components/EmptyState'
// import { getAllPosts, getLatestPosts } from '../../lib/appwrite'
// import useAppwrite from '../../lib/useAppwrite'
// import MapView, { Overlay } from 'react-native-maps';
// import { Marker } from "react-native-maps";
// import { mapstyle1 } from "../../styling/mapstyles";
// import CustomButton from '../../components/CustomButton'
// import * as Location from "expo-location";

// const Home = () => {

//   // const { data: posts, refetch } = useAppwrite(getAllPosts);

//   var posts = [{"$collectionId": "668e5083002b3f534cf3", "$createdAt": "2024-07-12T10:17:03.558+00:00", "$databaseId": "668e503d0036733ee658", "$id": "669102a0003c95af39aa", "$permissions": [], "$tenant": "165998", "$updatedAt": "2024-07-12T10:17:03.558+00:00", "prompt": "Picture the future of coding with AI. Show AR VR", "thumbnail": "https://wildlife.foothillsclusters.com/wp-content/uploads/2023/05/230518-03.jpg", "title": "How AI Shapes Coding Future", "users": {"$collectionId": "668e5057003aed7c3b16", "$createdAt": "2024-07-10T14:46:56.037+00:00", "$databaseId": "668e503d0036733ee658", "$id": "668e9ee100305aae9daf", "$permissions": [Array], "$tenant": "165998", "$updatedAt": "2024-07-10T14:46:56.037+00:00", "accountId": "668e9edf001c2f7b6117", "avatar": "https://cloud.appwrite.io/v1/avatars/initials?name=immraj&project=668e4f04003bfae2a718", "email": "immanuelraj154@gmail.com", "username": "immraj"}, "video": "https://player.vimeo.com/video/949581999?h=4672125b31"}, {"$collectionId": "668e5083002b3f534cf3", "$createdAt": "2024-07-12T10:17:47.089+00:00", "$databaseId": "668e503d0036733ee658", "$id": "669102cc0021f55940c3", "$permissions": [], "$tenant": "165998", "$updatedAt": "2024-07-12T10:17:47.089+00:00", "prompt": "Create a motivating AI driven video aimed at inspiring coding enthusiasts with simple language", "thumbnail": "https://cms.whipsnadezoo.org/sites/default/files/styles/responsive/public/1024/1024/0/2022-12/Meet-the-Animals-24-Photo-by-Justin-Doherty.jpg.webp", "title": "Get inspired to code", "users": {"$collectionId": "668e5057003aed7c3b16", "$createdAt": "2024-07-10T14:46:56.037+00:00", "$databaseId": "668e503d0036733ee658", "$id": "668e9ee100305aae9daf", "$permissions": [Array], "$tenant": "165998", "$updatedAt": "2024-07-10T14:46:56.037+00:00", "accountId": "668e9edf001c2f7b6117", "avatar": "https://cloud.appwrite.io/v1/avatars/initials?name=immraj&project=668e4f04003bfae2a718", "email": "immanuelraj154@gmail.com", "username": "immraj"}, "video": "https://player.vimeo.com/video/949579770?h=897cd5e781"}, {"$collectionId": "668e5083002b3f534cf3", "$createdAt": "2024-07-12T10:18:22.338+00:00", "$databaseId": "668e503d0036733ee658", "$id": "669102ef003c49d4c7bd", "$permissions": [], "$tenant": "165998", "$updatedAt": "2024-07-12T10:18:22.338+00:00", "prompt": "Create a heartwarming video following the travels of dalmatian dog exploring beautiful Italy", "thumbnail": "https://cdn.britannica.com/83/195983-138-66807699/numbers-tiger-populations.jpg?w=800&h=450&c=crop", "title": "Dalmatian's journey through Italy", "users": {"$collectionId": "668e5057003aed7c3b16", "$createdAt": "2024-07-10T14:46:56.037+00:00", "$databaseId": "668e503d0036733ee658", "$id": "668e9ee100305aae9daf", "$permissions": [Array], "$tenant": "165998", "$updatedAt": "2024-07-10T14:46:56.037+00:00", "accountId": "668e9edf001c2f7b6117", "avatar": "https://cloud.appwrite.io/v1/avatars/initials?name=immraj&project=668e4f04003bfae2a718", "email": "immanuelraj154@gmail.com", "username": "immraj"}, "video": "https://player.vimeo.com/video/949582778?h=d60220d68d"}]

//   const [refreshing, setRefreshing] = useState(false)
//   const mapRef = useRef(null); 
//   const [currentLocation, setCurrentLocation] = useState(null);


//   const onRefresh = async () => {
//     setRefreshing(true);
//     // await refetch();
//     setRefreshing(false);
//   }

//   const [region, setRegion] = useState({
//     latitude: 48.7460,
//     longitude: 2.66315,
//     latitudeDelta: 0.01,
//     longitudeDelta: 0.01,
//   });

//   // const zooRegion = {
//   //   latitude: 48.7460,
//   //   longitude: 2.66315,
//   //   latitudeDelta: 0.003,
//   //   longitudeDelta: 0.003,
//   // };

//   const zooRegion = {
//     latitude: 37.421952,
//     longitude: -122.084868,
//     latitudeDelta: 0.003,
//     longitudeDelta: 0.003,
//   };

//   useEffect(() => {
//     const getLocation = async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== "granted") {
//         console.log("Permission to  access location was denied");
//         return;
//       }

//       let location = await Location.getCurrentPositionAsync({});
//       setCurrentLocation(location.coords);

//       setInitialRegion({
//         latitude: location.coords.latitude,
//         longitude: location.coords.longitude,
//         latitudeDelta: 0.005,
//         longitudeDelta: 0.005,
//       });
//     };

//     getLocation();
//   }, []);

//   const goToZoo = () => {
//     //Animate the user to new region. Complete this animation in 3 seconds
//     mapRef.current.animateToRegion(zooRegion, 500);
//   };

//   const mapView = React.createRef();

//   const animateMap = () => {
//     mapView.current.animateToRegion(zooRegion, 1000);
//   }

//   const imageBounds = [
//     [37.421952, -122.084868], // Southwest coordinates
//     [37.422054, -122.084970], // Northeast coordinates
//   ];

//   return (
//     <View style={styles.container}>
//     <MapView
//       style={styles.map}
//       ref={mapRef}
//       initialRegion={zooRegion}
//       showsUserLocation={true}
//       customMapStyle={mapstyle1}
//       //onRegionChangeComplete runs when the user stops dragging MapView
//       onRegionChangeComplete={(region) => setRegion(region)}
//     >
//         {/* <Marker
//           coordinate={zooRegion}
//           pinColor="green"
//         /> */}
//         <Marker
//           coordinate={{
//             latitude: 48.7466652,
//             longitude: 2.662887,
//           }}
//         > 
//            <View>
//             <Image
//               source={require("../../assets/amimalicons/tiger.png")}
//               style={{width: 60, height: 60}}
//               resizeMode="contain"
//             />
//           </View>
//         </Marker>

//         <Marker
//           coordinate={{
//             latitude: 48.746337, 
//             longitude: 2.663211,
//           }}
//         > 
//            <View>
//             <Image
//               source={require("../../assets/amimalicons/giraffe.png")}
//               style={{width: 60, height: 60}}
//               resizeMode="contain"
//             />
//           </View>
//         </Marker>

//         <Marker
//           coordinate={{
//             latitude: 48.746457, 
//             longitude: 2.661987,
//           }}
//         > 
//            <View>
//             <Image
//               source={require("../../assets/amimalicons/camel.png")}
//               style={{width: 70, height: 70}}
//               resizeMode="contain"
//             />
//           </View>
//         </Marker>

//         <Marker
//           coordinate={{
//             latitude: 48.746117, 
//             longitude: 2.662850,
//           }}
//         > 
//            <View>
//             <Image
//               source={require("../../assets/amimalicons/hippo.png")}
//               style={{width: 60, height: 60}}
//               resizeMode="contain"
//             />
//           </View>
//         </Marker>

//         {/* <Marker
//           coordinate={{
//             latitude: 48.7462,
//             longitude: 2.66317,
//           }}
//           image={require("../../assets/amimalicons/tiger.png")}
//         /> */}

//         <Overlay  
//           image={require("../../assets/amimalicons/hippo.png")}
//           bounds = {imageBounds}
//         />

//     </MapView>
//     <CustomButton handlePress={() => goToZoo()} title="Go  to Zoo" />
//     {/* <TouchableOpacity onPress={animateMap}><Text>Start</Text></TouchableOpacity> */}
//     {/*Display user's current region:*/}
//     <Text style={styles.text}>Current latitude : {region.latitude}</Text>
//     <Text style={styles.text}>Current longitude: {region.longitude}</Text>
//   </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     ...StyleSheet.absoluteFillObject,
//     flex: 1, //the container will fill the whole screen.
//     justifyContent: "flex-end",
//     alignItems: "center",
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
// });







//   const imageBounds = [
//     [51.535121, -0.153], // Southwest coordinates
//     [51.537, -0.156], // Northeast coordinates
//   ];



//  const imageBounds = [
    
//     [51.536458, -0.152359], // Northeast coordinates
//     [51.534876, -0.158791], // Southwest coordinates
//   ];



/*

async function classifyImageTest() {
    
    // const predictedAnimal = "tiger";

    // setPredictedAnimal(predictedAnimal);

    // if (Object.values(targetAnimals).includes(predictedAnimal)) {

    //   showModal(predictedAnimal); 

    //   try {

    //     if (!scannedAnimals.includes(predictedAnimal)) {
    //       scannedAnimals.push(predictedAnimal);
    //       setScannedAnimals(scannedAnimals);

    //       let updatedTargetAnimals = targetAnimals.filter(animal => animal !== predictedAnimal);
    //       setTargetAnimals(updatedTargetAnimals);
    //       await AsyncStorage.setItem('targetAnimals', JSON.stringify(updatedTargetAnimals));
    //     }

    //     await AsyncStorage.setItem('scannedAnimals', JSON.stringify(scannedAnimals));

    //   } catch (error) {
    //     console.error('Failed to load scanned animals', error);
    //   }

    // } else {
    //   console.log(predictedAnimal + " is not in targetAnimals: " + targetAnimals)
    // }
    
    if (model) {

      console.log("loading image")
      const asset = Asset.fromModule(animalPhoto);
      await asset.downloadAsync();
      const imageUri = asset.localUri || asset.uri;

      const base64String = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const imageBuffer = Uint8Array.from(atob(base64String), c => c.charCodeAt(0));

      const imageTensor = tf.tidy(() => {
        const decodedImage = decodeImage(imageBuffer);
        return decodedImage.resizeNearestNeighbor([224, 224]).toFloat().expandDims();
      });

      console.log("image loaded. classifying image")

      const prediction = await model.predict(imageTensor).data();
      const highestPredictionIndex = prediction.indexOf(Math.max(...prediction));
      const predictedClassEntry = labels[highestPredictionIndex];
      const predictedAnimal = predictedClassEntry ? predictedClassEntry[1] : 'Unknown'; // class name

      console.log("Predicted Animal: " + predictedAnimal)

      //add scanned animal to scanned animals list

      // try {
      //   let storedScannedAnimals = await AsyncStorage.getItem('scannedAnimals');
      //   storedScannedAnimals = storedScannedAnimals ? JSON.parse(storedScannedAnimals) : [];
      //   storedScannedAnimals.push(predictedAnimal);
      //   await AsyncStorage.setItem('scannedAnimals', JSON.stringify(storedScannedAnimals));
      
      // } catch (error) {
      //   console.error("failed to save scanned animals", error);
      // }

      // setPredictedAnimal(predictedAnimal);

      // console.log("showing popup")

      if (Object.values(targetAnimals).includes(predictedAnimal)) {

        showModal({predictedAnimal:predictedAnimal}); 
  
        try {
  
          if (!scannedAnimals.includes(predictedAnimal)) {
            scannedAnimals.push(predictedAnimal);
            setScannedAnimals(scannedAnimals);
  
            let updatedTargetAnimals = targetAnimals.filter(animal => animal !== predictedAnimal);
            setTargetAnimals(updatedTargetAnimals);
            await AsyncStorage.setItem('targetAnimals', JSON.stringify(updatedTargetAnimals));
          }
  
          await AsyncStorage.setItem('scannedAnimals', JSON.stringify(scannedAnimals));
  
        } catch (error) {
          console.error('Failed to load scanned animals', error);
        }
  
      } else {
        console.log(predictedAnimal + " is not in targetAnimals: " + targetAnimals)
      }

    }

  }


**/