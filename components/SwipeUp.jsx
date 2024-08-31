import React, { useRef } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import SlidingUpPanel from 'rn-sliding-up-panel';
import Events from './Events'; // Ensure Events is correctly imported

const SwipeUp = ({ events , title, value, placeholder, handleChangeText, otherStyles, ...props }) => {
  const panelRef = useRef(null);

  return (
    <View style={[styles.container, otherStyles]}>
      <Button title='Show panel' onPress={() => panelRef.current.show()} />
      <SlidingUpPanel ref={panelRef} {...props}>
        <View>
            <Events posts={events} />
        </View>
      </SlidingUpPanel>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  panelContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
});

export default SwipeUp;