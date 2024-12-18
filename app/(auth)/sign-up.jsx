import { View, Text, ScrollView, Image, Alert, Linking } from 'react-native';
import Checkbox from 'expo-checkbox';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images, icons } from '../../constants';
import FormField from '../../components/FormField';
import CustomButtonBlack from '../../components/CustomButtonBlack';
import { router } from 'expo-router';
import CustomButton from '../../components/CustomButton'

import { ListUsers, CreateUser } from "../../../src/graphql/queries";
const SignUp = () => {
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [stayUpdated, setStayUpdated] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersResult = await client.graphql(
                    { query: ListUsers }
                );

                console.log(usersResult);
                console.log(usersResult.data.ListUsers.items);

                setUsers(usersResult.data.ListUsers.items);
            } catch (error) {
                console.log('error on fetching users', error);
            }
        };

        fetchUsers();
    }, []);


    const addTestUser = async () => {
        try {
            const testUser = {
                input: {
                    firstName: "Test",
                    lastName: "User",
                    username: "testuser",
                    email: "testuser@example.com"
                }
            };

            const result = await client.graphql(
                { query: CreateUser, variables: testUser }
            );

            console.log('User created:', result.data.createUser);
        } catch (error) {
            console.log('Error creating user:', error);
        }
    };

    useEffect(() => {
        addTestUser();
    }, []);

    


    //   const [form, setForm] = useState({
//     firstName: '',
//     lastName: '',
//     username: '',
//     email: '',
//     // password: '',
//   })

//   const [isSubmitting, setIsSubmitting] = useState(false)

//   const submit = async () => {
//     if (!form.username || !form.email || !form.password) {
//       Alert.alert("Error", "Please fill in all the fields")
//     }

    // setIsSubmitting(true)

//     try {
//       const result = await createUser(form.email, form.password, form.username)

//       //set it to global state...

//       router.replace('/home')
//     } catch (error) {
//       Alert.alert('Error', error.message)
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

    return (
        <SafeAreaView className="h-full" backgroundColor='#234e35'>
            <ScrollView contentContainerStyle={{ height: '100%'}}>
                <View className="w-full justify-center items-center min-h-[85vh] px-4" backgroundColor='#234e35'>
                    <Text className="text-2xl text-white text-semibold mt-10 font-psemibold text-center">
                        Be the first to hear about special offers and events!
                    </Text>

                    <View className="w-full flex-row mt-4">
                        <FormField title="First Name" otherStyles="flex-1 mr-4" />
                        <FormField title="Last Name" otherStyles="flex-1" />
                    </View>

                    <FormField
                        title="Username"
                        otherStyles="mt-4"
                    />
                    <FormField
                        title="Email"
                        keyboardType="email-address"
                        otherStyles="mt-4"
                    />

                    <View className="flex-col mt-4">
                        <View className="flex-row items-center mb-2">
                            <Checkbox value={agreeTerms} onValueChange={setAgreeTerms} color={'#16a34a'} />
                            <Text className="ml-2 text-white"> I agree with the{' '}
                        <Text
                            style={{ color: 'lightgray', textDecorationLine: 'underline'  }}
                            onPress={() => Linking.openURL('https://google.com')}
                        >
                            Terms and Conditions
                        </Text></Text>
                        </View>

                        <View className="flex-row items-center">
                            <Checkbox value={stayUpdated} onValueChange={setStayUpdated} color={ '#16a34a'} />
                            <Text className="ml-2 text-white">
                                Stay up to date with the latest news, deals and upcoming events
                            </Text>
                        </View>
                    </View>

                    <CustomButtonBlack
                        title="Continue"
                        handlePress={() => router.push('/home')}
                        containerStyles="w-full mt-9"
                    />

                    <CustomButton
                        title="Skip"
                        handlePress={() => router.push('/home')}
                        containerStyles="w-full mt-4 bg-transparent"
                        textStyles="text-white"
                    />

                    <View className="justify-center pt-5 flex-row gap-2">
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignUp;
