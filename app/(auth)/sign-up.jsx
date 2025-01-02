import { View, Text, ScrollView, Image, Alert, Linking } from 'react-native';
import Checkbox from 'expo-checkbox';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images, icons } from '../../constants';
import FormField from '../../components/FormField';
import CustomButtonBlack from '../../components/CustomButtonBlack';
import { router } from 'expo-router';
import CustomButton from '../../components/CustomButton'

import { listUsers, CreateUser } from "../../src/graphql/queries";

import { generateClient } from 'aws-amplify/api';
import { API, graphqlOperation } from 'aws-amplify';


const client = generateClient();


// const listUsers2 = /* GraphQL */ `
//   query List {
//     listUsers {
//         items {
//         firstName
//         lastName
//         email
//         }
//     }
//     }
// `;

const createUserTemplate = `
  mutation CreateUser($email: String!, $firstName: String!, $lastName: String!, $optedIn: Boolean!) {
    createUser(input: {email: $email, firstName: $firstName, lastName: $lastName, optedIn: $optedIn}) {
      email
      firstName
      lastName
    }
  }
`;

const SignUp = () => {
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [stayUpdated, setStayUpdated] = useState(false);
    const [users, setUsers] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersResult = await client.graphql(
                    { query: listUsers }
                );
                // console.log(usersResult.data.listUsers.items);

                setUsers(usersResult.data.listUsers.items);
            } catch (error) {
                console.log('error on fetching users', error);
            }
        };

        fetchUsers();
    }, []);

    const handleContinue = async () => {
        if (!agreeTerms) {
            Alert.alert('Error', 'You must agree to the Terms and Conditions to continue.');
            return;
        }

        if (!firstName || !lastName || !username || !email) {
            Alert.alert('Error', 'All fields must be filled out to continue.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert('Error', 'Please enter a valid email address.');
            return;
        }


        try {
            const inputVariables = {
                firstName,
                lastName,
                email,
                optedIn: stayUpdated,
            };

            const usersResult = await client.graphql({
                query: createUserTemplate,
                variables: inputVariables,
            });

            console.log('User created:', usersResult.data.createUser);
            router.push('/home');
        } catch (error) {
            if (error.errors && error.errors[0].errorType === 'DynamoDB:ConditionalCheckFailedException') {
                Alert.alert('Error', 'This email is already in use.');
            } else {
                console.log('Error creating user:', error);
                Alert.alert('Error', 'An error occurred while creating the user.');
            }
        }
        
    };

    return (
        <SafeAreaView className="h-full" backgroundColor='#234e35'>
            <ScrollView contentContainerStyle={{ height: '100%' }}>
                <View className="w-full justify-center items-center min-h-[85vh] px-4" backgroundColor='#234e35'>
                    <Text className="text-2xl text-white text-semibold mt-10 font-psemibold text-center">
                        Be the first to hear about special offers and events!
                    </Text>

                    <View className="w-full flex-row mt-4">
                        <FormField title="First Name" value={firstName} handleChangeText={setFirstName} otherStyles="flex-1 mr-4" />
                        <FormField title="Last Name" value={lastName} handleChangeText={setLastName} otherStyles="flex-1" />
                    </View>

                    <FormField
                        title="Username"
                        value={username}
                        handleChangeText={setUsername}
                        otherStyles="mt-4"
                    />
                    <FormField
                        title="Email"
                        value={email}
                        handleChangeText={setEmail}
                        keyboardType="email-address"
                        otherStyles="mt-4"
                    />

                    <View className="flex-col mt-4">
                        <View className="flex-row items-center mb-2">
                            <Checkbox value={agreeTerms} onValueChange={setAgreeTerms} color={'#16a34a'} />
                            <Text className="ml-2 text-white"> I agree with the{' '}
                                <Text
                                    style={{ color: 'lightgray', textDecorationLine: 'underline' }}
                                    onPress={() => Linking.openURL('https://google.com')}
                                >
                                    Terms and Conditions
                                </Text>
                            </Text>
                        </View>

                        <View className="flex-row items-center">
                            <Checkbox value={stayUpdated} onValueChange={setStayUpdated} color={'#16a34a'} />
                            <Text className="ml-2 text-white">
                                Stay up to date with the latest news, deals and upcoming events
                            </Text>
                        </View>
                    </View>

                    <CustomButtonBlack
                        title="Continue"
                        handlePress={handleContinue}
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
