import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'

import { icons } from '../constants'

const FormField = ( {title, value, placeholder, handleChangeText, keyboardType, otherStyles, ...props}) => {

  // const [showPassword, setshowPassword] = useState(false)

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-green-600 font-pmedium">{title}</Text>

      <View className="border-2 border-green-600 w-full h-16 px-4 bg-white-100 rounded-2xl focus:border-white
      items-center flex-row">
        <TextInput
            className="flex-1 text-white font-psemibold text-base"
            value={value}
            keyboardType={keyboardType}
            placeholder={placeholder}
            placeholderTextColor="white"
            onChangeText={handleChangeText}
            secureTextEntry={title === 'Passsword' && !showPassword}
        />

        {/* {title === 'Password' && (
            <TouchableOpacity onPress={() => 
            setshowPassword(!showPassword)}>
                <Image 
                source={!showPassword ? icons.eye : icons.eyeHide}
                className="w-6 h-6"
                resizeMode='contain'
                />
            </TouchableOpacity>
        )} */}
      </View>
    </View>
  )
}

export default FormField