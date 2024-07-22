import React from 'react';
import { Button, Text, View } from 'react-native';
import SlidingUpPanel from 'rn-sliding-up-panel';

const SwipeUp = ( {title, value, placeholder, handleChangeText, otherStyles, ...props}) => {
    return (
      <View style={styles.container}>
        <Button title='Show panel' onPress={() => this._panel.show()} />
        <SlidingUpPanel ref={c => this._panel = c}>
          <View style={styles.container}>
            <Text>Here is the content inside panel</Text>
            <Button title='Hide' onPress={() => this._panel.hide()} />
          </View>
        </SlidingUpPanel>
      </View>
    )
  }

export default SwipeUp