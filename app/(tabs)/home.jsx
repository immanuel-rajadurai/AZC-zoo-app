import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import SearchInput from '../../components/searchInput'
import Events from '../../components/Events'
import VideoCard from '../../components/VideoCard'
import EmptyState from '../../components/EmptyState'
import { getAllPosts, getLatestPosts } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'

const Home = () => {

  // const { data: posts, refetch } = useAppwrite(getAllPosts);
  //pretend ive made the zoo map

  var posts = [{"$collectionId": "668e5083002b3f534cf3", "$createdAt": "2024-07-12T10:17:03.558+00:00", "$databaseId": "668e503d0036733ee658", "$id": "669102a0003c95af39aa", "$permissions": [], "$tenant": "165998", "$updatedAt": "2024-07-12T10:17:03.558+00:00", "prompt": "Picture the future of coding with AI. Show AR VR", "thumbnail": "https://wildlife.foothillsclusters.com/wp-content/uploads/2023/05/230518-03.jpg", "title": "How AI Shapes Coding Future", "users": {"$collectionId": "668e5057003aed7c3b16", "$createdAt": "2024-07-10T14:46:56.037+00:00", "$databaseId": "668e503d0036733ee658", "$id": "668e9ee100305aae9daf", "$permissions": [Array], "$tenant": "165998", "$updatedAt": "2024-07-10T14:46:56.037+00:00", "accountId": "668e9edf001c2f7b6117", "avatar": "https://cloud.appwrite.io/v1/avatars/initials?name=immraj&project=668e4f04003bfae2a718", "email": "immanuelraj154@gmail.com", "username": "immraj"}, "video": "https://player.vimeo.com/video/949581999?h=4672125b31"}, {"$collectionId": "668e5083002b3f534cf3", "$createdAt": "2024-07-12T10:17:47.089+00:00", "$databaseId": "668e503d0036733ee658", "$id": "669102cc0021f55940c3", "$permissions": [], "$tenant": "165998", "$updatedAt": "2024-07-12T10:17:47.089+00:00", "prompt": "Create a motivating AI driven video aimed at inspiring coding enthusiasts with simple language", "thumbnail": "https://cms.whipsnadezoo.org/sites/default/files/styles/responsive/public/1024/1024/0/2022-12/Meet-the-Animals-24-Photo-by-Justin-Doherty.jpg.webp", "title": "Get inspired to code", "users": {"$collectionId": "668e5057003aed7c3b16", "$createdAt": "2024-07-10T14:46:56.037+00:00", "$databaseId": "668e503d0036733ee658", "$id": "668e9ee100305aae9daf", "$permissions": [Array], "$tenant": "165998", "$updatedAt": "2024-07-10T14:46:56.037+00:00", "accountId": "668e9edf001c2f7b6117", "avatar": "https://cloud.appwrite.io/v1/avatars/initials?name=immraj&project=668e4f04003bfae2a718", "email": "immanuelraj154@gmail.com", "username": "immraj"}, "video": "https://player.vimeo.com/video/949579770?h=897cd5e781"}, {"$collectionId": "668e5083002b3f534cf3", "$createdAt": "2024-07-12T10:18:22.338+00:00", "$databaseId": "668e503d0036733ee658", "$id": "669102ef003c49d4c7bd", "$permissions": [], "$tenant": "165998", "$updatedAt": "2024-07-12T10:18:22.338+00:00", "prompt": "Create a heartwarming video following the travels of dalmatian dog exploring beautiful Italy", "thumbnail": "https://cdn.britannica.com/83/195983-138-66807699/numbers-tiger-populations.jpg?w=800&h=450&c=crop", "title": "Dalmatian's journey through Italy", "users": {"$collectionId": "668e5057003aed7c3b16", "$createdAt": "2024-07-10T14:46:56.037+00:00", "$databaseId": "668e503d0036733ee658", "$id": "668e9ee100305aae9daf", "$permissions": [Array], "$tenant": "165998", "$updatedAt": "2024-07-10T14:46:56.037+00:00", "accountId": "668e9edf001c2f7b6117", "avatar": "https://cloud.appwrite.io/v1/avatars/initials?name=immraj&project=668e4f04003bfae2a718", "email": "immanuelraj154@gmail.com", "username": "immraj"}, "video": "https://player.vimeo.com/video/949582778?h=d60220d68d"}]

  const { data: latestPosts } = useAppwrite(getLatestPosts);

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async () => {
    setRefreshing(true);
    // await refetch();
    setRefreshing(false);
  }
  return (
    // <SafeAreaView className="bg-white h-full">
    <View>
      <FlatList
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6 border w-full flex-1 pt=5 pb-8">
             <Text>Map goes here</Text>
            </View>
            
            <View className="w-full flex-1 pt=5 pb-8">
              
              <Text className="text-black-500 text-2xl font-psemibold">
                Events
              </Text>

              <Events
                posts={posts ?? []}
              />
            </View>
          </View>
        )}
   
   
      />
      </View>
    // </SafeAreaView>
  )
}

export default Home
