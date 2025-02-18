import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Easing, Image } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar } from 'react-native-calendars';

const Tickets = () => {

  // Get current date
  const getCurrentDate = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`; 
  };

  // Function to format the date from "YYYY-MM-DD" to "10 January 2025"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const [date, setDate] = useState(getCurrentDate());
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [time, setTime] = useState('16:00');
  const [timeDropdownVisible, setTimeDropdownVisible] = useState(false);
  const [ticketCounts, setTicketCounts] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const [selectorWidth, setSelectorWidth] = useState(0);
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
  const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);

  const incrementTicket = (label) => {
    setTicketCounts((prev) => ({ ...prev, [label]: (prev[label] || 0) + 1 }));
  };

  const decrementTicket = (label) => {
    setTicketCounts((prev) => ({ ...prev, [label]: Math.max((prev[label] || 0) - 1, 0) }));
  };

  useEffect(() => {
    // Calculate total price whenever ticketCounts changes
    const total = ticketOptions.reduce((sum, { label, price }) => {
      const count = ticketCounts[label] || 0;
      const priceValue = parseFloat(price.replace('$', ''));
      return sum + count * priceValue;
    }, 0);
    setTotalPrice(total);

    // Slide in the pop-up if there are selected tickets
    if (total > 0) {
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    }
  }, [ticketCounts]);

  const popupTranslateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 0],
  });

  const handleCalendarPress = () => {
    setCalendarVisible(!calendarVisible);
    setIsDateDropdownOpen(!isDateDropdownOpen);
    setTimeDropdownVisible(false); // Close time dropdown when calendar is opened
    setIsTimeDropdownOpen(false);
  };

  const handleTimePress = () => {
    setTimeDropdownVisible(!timeDropdownVisible);
    setIsTimeDropdownOpen(!isTimeDropdownOpen);
    setCalendarVisible(false); // Close calendar dropdown when time is opened
    setIsDateDropdownOpen(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Tickets Booking Form</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>When</Text>
          <TouchableOpacity style={styles.selector} onPress={handleCalendarPress} onLayout={(event) => { const { width } = event.nativeEvent.layout; setSelectorWidth(width); }}>
            <View style={styles.selectorContent}>
              <Image source={require('../assets/icons/icon-calendar.png')} style={styles.icon} />
              <Text style={styles.selectorText}>{date}</Text>
              <Image source={require('../assets/icons/down-chevron.png')} style={[styles.icon, { transform: [{ rotate: isDateDropdownOpen ? '180deg' : '0deg' }] }, ]}/>
            </View>
          </TouchableOpacity>
          {calendarVisible && (
            <View style={[styles.calendarDropdown, , { width: selectorWidth }]}>
              <Calendar
                onDayPress={(day) => {
                  const formattedDate = formatDate(day.dateString); 
                  setDate(formattedDate); 
                  setCalendarVisible(false);
                }}
                markedDates={{
                  [date]: {
                    selected: true,
                    marked: true,
                    selectedColor: '#04561A', 
                    customStyles: {
                      container: {
                        backgroundColor: '#04561A', 
                        borderRadius: 10, 
                      },
                      text: {
                        color: 'white', 
                        fontWeight: 'bold', 
                      }
                    }
                  }
                }}
                markingType="custom" // Enable custom styling for selected date
                theme={{
                  arrowColor: 'black',
                  todayTextColor: '#04561A',
                  todayButtonFontWeight: 'bold',
                  textSectionTitleColor: 'black',
                  calendarBackground: '#D9D9D9',
                  textDisabledColor: 'white',
                  monthTextColor: 'black',
                  dayTextColor: 'black',
                }}
              />
            </View>
          )}
          <TouchableOpacity style={styles.selector} onPress={handleTimePress} onLayout={(event) => { const { width } = event.nativeEvent.layout; setSelectorWidth(width); }}>
            <View style={styles.selectorContent}>
              <Image source={require('../assets/icons/icon-clock.png')} style={styles.icon} />
              <Text style={styles.selectorText}>{time}</Text>
              <Image source={require('../assets/icons/down-chevron.png')} style={[styles.icon, { transform: [{ rotate: isTimeDropdownOpen ? '180deg' : '0deg' }] }, ]} />
            </View>
          </TouchableOpacity>
          {timeDropdownVisible && (
            <View style={[styles.timeDropdown, { width: selectorWidth }]}>
              {['16:00', '17:00', '18:00'].map((t) => (
                <TouchableOpacity
                  key={t}
                  style={[styles.dropdownItem, t === time && styles.selectedTime]}
                  onPress={() => {
                    setTime(t);
                    setTimeDropdownVisible(false);
                  }}
                >
                  <Text style={[styles.dropdownText, t === time && styles.selectedTimeText]}>{t}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tickets</Text>
          {ticketOptions.map(({ label, subLabel, price }, index) => (
            <View key={index} style={styles.ticketRow}>
              <View style={styles.labelContainer}>
                <Image 
                  source={label === 'Family' 
                    ? require('../assets/icons/icon-family.png') 
                    : require('../assets/icons/icon-person.png')}
                  style={styles.icon} 
                />
                <Text style={styles.ticketLabel}>
                  {label} {'\n'} <Text style={styles.ticketSubLabel}>{subLabel}</Text>
                </Text>
              </View>
              <Text style={styles.ticketPrice}>{price}</Text>
              <View style={styles.counterContainer}>
                <TouchableOpacity style={styles.counterButton} onPress={() => decrementTicket(label)}>
                  <Text style={styles.counterText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.counterValue}>{ticketCounts[label] || 0}</Text>
                <TouchableOpacity style={styles.counterButton} onPress={() => incrementTicket(label)}>
                  <Text style={styles.counterText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Pop-up for total price and "Book Now" button */}
      <Animated.View
        style={[
          styles.popup,
          {
            transform: [{ translateY: popupTranslateY }],
          },
        ]}
      >
        <View style={styles.popupContent}>
          <Text style={styles.totalPriceText}>Total: ${totalPrice.toFixed(2)}</Text>
          <TouchableOpacity style={styles.bookNowButton}>
            <Text style={styles.bookNowText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const ticketOptions = [
  { label: 'Adult', subLabel: '(13yrs+)', price: '$17.95' },
  { label: 'Child', subLabel: '(4-12yrs)', price: '$13.95' },
  { label: 'Student', subLabel: '', price: '$14.95' },
  { label: 'Family', subLabel: '(2 Adults + 2 Children)', price: '$53.95' },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  section: {
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 16,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  selector: {
    backgroundColor: '#D9D9D9',
    padding: 12,
    marginBottom: 10,
  },
  selectorContent: {
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'space-between',
  },
  selectorText: {
    fontSize: 16,
    color: 'black',
    flex: 1,
    marginHorizontal: 10, 
  },  
  calendarDropdown: {
    position: 'absolute',
    top: '60%',
    zIndex: 1000,
    backgroundColor: '#D9D9D9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    alignSelf: 'center',
  },
  timeDropdown: {
    position: 'absolute',
    top: '103%',
    zIndex: 1000,
    backgroundColor: '#D9D9D9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    alignSelf: 'center',
  },
  dropdownItem: {
    padding: '4%',
  },
  dropdownText: {
    fontSize: 16,
    color: 'black',
  },
  selectedTime: {
    backgroundColor: '#04561A',
  },
  selectedTimeText: {
    color: 'white', 
  },
  icon: {
    width: 18,
    height: 18,
  },
  image: {
    width: '100%', 
    height: 50,
  },
  ticketRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#D9D9D9',
    padding: 12,
    marginBottom: 10,
  },
  labelContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    flex: 1.1, 
  },
  ticketLabel: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 10, 
  },
  ticketSubLabel: {
    fontSize: 10,
    color: '#3D3D3D',
  },  
  ticketPrice: {
    fontSize: 16,

    color: 'black',
    flex: 1,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  counterButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#04561A',
    borderRadius: 4,
    marginHorizontal: 5,
  },
  counterText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  counterValue: {
    fontSize: 16,
    marginHorizontal: 2,
    color: '#333',
    backgroundColor: 'white',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  popup: {
    position: 'absolute',
    bottom: '-1%',
    left: 0,
    right: 0,
    backgroundColor: '#97C970',
    padding: 32,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  popupContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalPriceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  bookNowButton: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  bookNowText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default Tickets;