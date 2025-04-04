// import { View, Text, ScrollView, Image, Alert } from 'react-native'
// import React, { useState } from 'react'
// import { SafeAreaView } from 'react-native-safe-area-context'

// import { images } from '../../constants'

// import FormField from '../../components/FormField'

// import CustomButton from '../../components/CustomButton'
// import { Link, router } from 'expo-router'
// import { signIn } from '../../lib/appwrite'

// const SignIn = () => {

//   const [form, setForm] = useState({
//     email: '',
//     password: '',
//   })

//   const [isSubmitting, setIsSubmitting] = useState(false)

  
//   const submit = async () => {
//     if (!form.email || !form.password) {
//       Alert.alert("Error", "Please fill in all the fields")
//     }

//     setIsSubmitting(true)

//     try {
//       await signIn(form.email, form.password, form.username)

//       //set it to global state...

//       router.replace('/home')
//     } catch (error) {
//       Alert.alert('Error', error.message)
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   return (
//     <SafeAreaView className="bg-white h-full">
//       <ScrollView>
//         <View className="w-full justify-center min-h-[83vh] px-4 my-6">
//           <Image source={images.zooIcon} resizeMode='contain' className="w-[150px] h-[150px]"/>

//           <Text className="text-2xl text-green-600 text-semibold mt-10 font-psemibold">
//             Log in to the Zoo App
//           </Text>

//           <FormField 
//             title="Email"
//             value={form.email}
//             handleChangeText={(e) => setForm({
//               ...form,
//               email: e
//             })}
//             otherStyles="mt-7"
//             keyboardType="email-address"
//           />

//           <FormField 
//             title="Password"
//             value={form.password}
//             handleChangeText={(e) => setForm({
//               ...form,
//               password: e
//             })}
//             otherStyles="mt-7"
//           />

//           <CustomButton
//             title="Sign in"
//             handlePress={submit}
//             containerStyles="mt-7"
//             isLoading={isSubmitting}
//           />
          
//           <View className="justify-center pt-5 flex-row gap-2">
//             <Text className="text-lg text-gray-500 font-pregular">
//               Done have an account?
//             </Text>
            
//             <Link href="/sign-up" className="text-lg font-psemibold text-green-600">Sign up</Link>
//           </View>

//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   )
// }

// export default SignIn