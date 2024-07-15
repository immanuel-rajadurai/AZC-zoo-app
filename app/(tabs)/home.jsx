import { View, Text, FlatList, Image, RefreshControl, Alert, StyleSheet  } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import SearchInput from '../../components/searchInput'
import Trending from '../../components/Trending'
import VideoCard from '../../components/VideoCard'
import EmptyState from '../../components/EmptyState'
import { getAllPosts, getLatestPosts } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import MapView, { Marker } from 'react-native-maps'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

const Home = () => {


  const { data: posts, refetch } = useAppwrite(getAllPosts);

  const { data: latestPosts } = useAppwrite(getLatestPosts);

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }
  return (

    <SafeAreaView className="bg-white-100 h-full">

      <Text className="font-pmedium text-sm text-green-600">
                  Welcome to
      </Text>
      <Text className="text-2xl font-psemibold text-green-600">
        Zoo
      </Text>
      <View className="justify-between items-start" style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.7749, // Initial latitude
            longitude: -122.4194, // Initial longitude
            latitudeDelta: 0.0922, // Zoom level (latitude span)
            longitudeDelta: 0.0421, // Zoom level (longitude span)
          }}
        >
          {/* Add a marker */}
          <Marker
            coordinate={{ latitude: 37.7749, longitude: -122.4194 }}
            title="San Francisco"
            description="A beautiful city!"
          />
        </MapView>
      </View>
      <FlatList
        // data={[{ id: 1 }, { id: 2 }, { id: 3 }]}
        data={posts}
        keyExtractor={(item) => item.$id}
        // renderItem={({ item }) => (
        //   <VideoCard video={item}/>
        // )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
               <View>
                {/* <Text className="font-pmedium text-sm text-gray-100">
                  Welcome to
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  Zoo
                </Text> */}

                
               </View>

               {/* <View className="mt-1.5">
                 <Image
                   source={images.logoSmall} 
                   className="w-9 h-10"
                   resizeMode='contain'
                 />
               </View> */}

            </View>
            {/* <SearchInput></SearchInput> */}

            <View className="w-full flex-1 pt=5 pb-8">

              <Text className="text-green-600 text-lg font-pregular">
                Events
              </Text>

              <Trending
                posts={posts ?? []}
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState 
            title="No Videos Found"
            subtitle="Be the first to upload a video"
          />
        )}
        refreshControl={<RefreshControl
         refreshing={refreshing}
         onRefresh = {onRefresh}
        />}
      />

     
    </SafeAreaView>
  )
}

export default Home
