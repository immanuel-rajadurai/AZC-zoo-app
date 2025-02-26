import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';
import { router } from 'expo-router'; 

const SignIn = () => {
  const [email, setEmail] = useState('');

  const handleLogin = () => {

    console.log('Logging in with:', email);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Image
            source={require('../../assets/icons/left-chevron.png')} 
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Log in to Your Account</Text>
      </View>

      {/* Form */}
      <View style={styles.form}>
        {/* Email Input Label */}
        <Text style={styles.inputLabel}>Email Address</Text>

        {/* Email Input */}
        <TextInput
          style={styles.input}
          placeholder="example@email.com" 
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Log in</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        {/* Sign Up Link */}
        <Text style={styles.footerText}>
          Do not have an account?{' '}
          <Text style={styles.signUpText} onPress={() => router.push('/(auth)/sign-up')}>
            Sign up
          </Text>
        </Text>

        {/* Or Divider */}
        <Text style={styles.orText}>Or</Text>

        {/* Guest Checkout Label */}
        <Text style={styles.inputLabel}>Guest Checkout</Text>

        {/* Guest Checkout Button */}
        <TouchableOpacity
          style={styles.guestButton}
          onPress={() => router.push('/guest-checkout')}
        >
          <Text style={styles.guestButtonText}>Continue as a Guest</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 32,
    marginTop: 40,
  },
  backIcon: {
    width: 24,
    height: 24,
    marginRight: 28,
    marginLeft: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  form: {
    marginBottom: 32,
    marginHorizontal: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
    marginRight: '60%',
  },
  input: {
    height: 50,
    color: '#797979',
    backgroundColor: '#D9D9D9',
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#000',
    padding: 16,
    alignItems: 'center',
    borderRadius: 5,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: '#000',
  },
  signUpText: {
    color: '#04561A',
    fontWeight: 'bold',
    fontSize: 17,
  },
  orText: {
    fontSize: 16,
    color: '#000',
    marginVertical: 16,
    padding: 8,
    fontWeight: 'bold',
  },
  guestButton: {
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 5,
    width: '92%',
    alignItems: 'center',
  },
  guestButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SignIn;