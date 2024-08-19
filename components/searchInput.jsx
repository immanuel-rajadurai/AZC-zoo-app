import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState,  forwardRef  } from 'react'

import { icons } from '../constants'

const SearchInput = forwardRef( ({title, value, placeholder, handleChangeText, otherStyles, ...props}, ref) => {

  const [showPassword, setshowPassword] = useState(false)

  return (

      <View style={{
        height: 64,
        paddingHorizontal: 16,
        backgroundColor: '#fff', 
      }}
      
      className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary
      items-center flex-row space-x-4">
        <TextInput
            ref={ref}
            style={{
              fontSize: 16,
              color: '#000', 
              flex: 1,
            }}
            className="text-base mt-0.5 text-white flex-1 font-pregular"
            value={value}
            placeholder="Search for something"
            placeholderTextColor="#7b7b8b"
            onChangeText={handleChangeText}
            secureTextEntry={title === 'Passsword' && !showPassword}
        />
      </View>
  )
})

export default SearchInput