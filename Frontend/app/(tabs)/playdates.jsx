import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Modal, Pressable, TextInput, FlatList } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colors } from '../../constants/colors';

const getCurrentMonthAndYear = () => {
  const date = new Date();
  const options = { month: 'long', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

const getUpcomingDates = (daysCount) => {
  const dates = [];
  const today = new Date();

  for (let i = 0; i < daysCount; i++) {
    const currentDay = new Date();
    currentDay.setDate(today.getDate() + i);
    const dayName = new Intl.DateTimeFormat('en', { weekday: 'short' }).format(currentDay);
    const dayNumber = currentDay.getDate();

    dates.push({
      dayName,
      dayNumber,
      date: currentDay,
    });
  }
  return dates;
};

const upcomingDates = getUpcomingDates(5);

const PlaydatesTab = () => {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [locationInput, setLocationInput] = useState('');
  const [friendsDropdownVisible, setFriendsDropdownVisible] = useState(false); // Toggle for dropdown visibility
  const [selectedFriends, setSelectedFriends] = useState([]); // Store multiple selected friends

  const friendsList = [
    { id: 1, name: 'John Doe', imageUri: '../../assets/images/boca2.png' },
    { id: 2, name: 'Jane Smith', imageUri: '../../assets/images/boca2.png' },
    { id: 3, name: 'Emily Brown', imageUri: '../../assets/images/boca2.png' },
    { id: 4, name: 'Shay Gabai', imageUri: '../../assets/images/boca2.png' },
    { id: 5, name: 'Nico Shliko', imageUri: '../../assets/images/boca2.png' },
    { id: 6, name: 'Gertzel', imageUri: '../../assets/images/boca2.png' },
  ];

  const handleShowModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleDateChange = (event, selectedDate) => {
    setSelectedDate(selectedDate || new Date());
  };

  const handleTimeChange = (event, selectedTime) => {
    setSelectedTime(selectedTime || new Date());
  };

  const toggleFriendsDropdown = () => {
    setFriendsDropdownVisible(!friendsDropdownVisible);
  };

  const toggleFriendSelection = (friend) => {
    setSelectedFriends((prevSelected) => {
      if (prevSelected.some((f) => f.id === friend.id)) {
        return prevSelected.filter((f) => f.id !== friend.id); // Remove friend if already selected
      } else {
        return [...prevSelected, friend]; // Add friend if not already selected
      }
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTopRow}>
          <Text style={styles.headerTitle}>Playdates</Text>
          <MaterialIcons name="notifications-none" size={24} color={colors.tabsMainText} />
        </View>
        <View style={styles.headerDateRow}>
          <MaterialIcons name="calendar-today" size={20} color={colors.tabsMainText} />
          <Text style={styles.headerDateText}>{getCurrentMonthAndYear()}</Text>
        </View>
      </View>

      {/* Date Picker */}
      <View style={styles.datePickerContainer}>
        <ScrollView horizontal={true} contentContainerStyle={styles.datePickerContent} showsHorizontalScrollIndicator={false}>
          {upcomingDates.map((date, index) => (
            <TouchableOpacity key={index} style={styles.dateItem} onPress={() => setSelectedDayIndex(index)}>
              <Text style={[styles.dateText, index === selectedDayIndex && styles.boldText]}>{date.dayNumber}</Text>
              <Text style={[styles.dateText, index === selectedDayIndex && styles.boldText]}>{date.dayName}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Schedule */}
      <ScrollView style={styles.schedule}>
        <View style={styles.timeSlot}>
          <Text style={styles.time}>10:00</Text>
          <View style={styles.eventCard}>
            <View style={styles.eventDetails}>
              <Text style={styles.eventName}>Name</Text>
              <View style={styles.eventLocationRow}>
                <FontAwesome5 name="map-marker-alt" size={12} color={colors.tabsPrimary} />
                <Text style={styles.eventLocation}>Some Park</Text>
              </View>
              <Text style={styles.eventTime}>10:00 - 12:00</Text>
            </View>
            <Image source={{ uri: 'https://example.com/dog.jpg' }} style={styles.eventImage} />
          </View>
        </View>

        <View style={styles.timeSlot}>
          <Text style={styles.time}>14:00</Text>
          <View style={styles.emptyEventCard} />
        </View>
      </ScrollView>

      {/* New Meeting Button with Icon */}
      <TouchableOpacity style={styles.newMeetingButton} onPress={handleShowModal}>
        <FontAwesome5 name="calendar-plus" size={24} color="white" />
      </TouchableOpacity>

      {/* Modal for Creating New Meeting */}
      <Modal visible={modalVisible} transparent={true} onRequestClose={handleCloseModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>New Meeting</Text>

            {/* Date and Time Pickers */}
            <View style={styles.inputRow}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Date</Text>
                <View style={styles.iconAndPickerDate}>
                  <FontAwesome5 name="calendar-alt" size={24} color={colors.tabsSecondaryText} />
                  <DateTimePicker value={selectedDate} mode="date" display="default" onChange={handleDateChange} style={styles.dateTimePicker} />
                </View>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Time</Text>
                <View style={styles.iconAndPickerTime}>
                  <MaterialIcons name="access-time" size={24} color={colors.tabsSecondaryText} />
                  <DateTimePicker value={selectedTime} mode="time" display="default" onChange={handleTimeChange} style={styles.dateTimePicker} />
                </View>
              </View>
            </View>

            {/* Location Input */}
            <View style={styles.inputContainerFullWidth}>
              <Text style={styles.label}>Location</Text>
              <View style={styles.inputWrapperFullWidth}>
                <MaterialIcons name="location-on" size={16} color={colors.tabsSecondaryText} />
                <TextInput
                  style={styles.inputFullWidth}
                  placeholder="Enter location"
                  placeholderTextColor={colors.tabsSecondaryText}
                  value={locationInput}
                  onChangeText={setLocationInput}
                />
              </View>
            </View>

             {/* Friends Dropdown */}
             <View style={styles.inputContainerFullWidth}>
              <Text style={styles.label}>Invite Friends</Text>
              <TouchableOpacity style={styles.inputWrapperFullWidth} onPress={toggleFriendsDropdown}>
               <MaterialIcons name="person" size={16} color={colors.tabsSecondaryText} />
                 <Text style={[styles.inputFullWidth, { color: selectedFriends.length > 0 ? colors.tabsPrimary : colors.tabsSecondaryText }]}>
                   {selectedFriends.length > 0 ? selectedFriends.map(f => f.name).join(', ') : 'Select friends'}
                 </Text>
               <MaterialIcons name={friendsDropdownVisible ? "expand-less" : "expand-more"} size={16} color={colors.tabsSecondaryText} />
              </TouchableOpacity>
              {friendsDropdownVisible && (
                <View style={styles.scrollableListContainer}>
                  <FlatList
                    data={friendsList}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => {
                      const isSelected = selectedFriends.some((f) => f.id === item.id);
                      return (
                        <TouchableOpacity
                          style={styles.friendItem}
                          onPress={() => toggleFriendSelection(item)}
                        >
                          <Image source={require('../../assets/images/boca2.png')} style={styles.friendImage} />
                          <Text style={styles.friendName}>{item.name}</Text>
                          {isSelected && <View style={styles.greenDot} />}
                        </TouchableOpacity>
                      );
                    }}
                  />
                </View>
              )}
            </View>

            {/* Action Buttons */}
            <View style={styles.buttonRow}>
              <Pressable style={styles.cancelButton} onPress={handleCloseModal}>
                <Text style={styles.buttonText}>Cancel</Text>
              </Pressable>
              <Pressable style={styles.createButton} onPress={handleCloseModal}>
                <Text style={styles.buttonText}>Create</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PlaydatesTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.tabsBackground,
  },
  // Header styles
  header: {
    backgroundColor: colors.tabsPrimary,
    padding: 20,
  },
  headerTopRow: {
    marginTop: '15%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.tabsMainText,
    paddingBottom: 10,
  },
  headerDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  headerDateText: {
    color: colors.tabsMainText,
    marginLeft: 10,
    fontSize: 16,
  },
  // Date Picker styles
  datePickerContainer: {
    backgroundColor: colors.tabsPrimary,
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  datePickerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateItem: {
    alignItems: 'center',
    marginHorizontal: 15,
  },
  dateText: {
    color: colors.tabsSeondary,
    fontSize: 16,
  },
  boldText: {
    fontWeight: 'bold',
    color:colors.tabsMainText,
    fontSize: 22,
  },
  // Schedule styles
  schedule: {
    padding: 20,
  },
  timeSlot: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  time: {
    color: colors.tabsSecondaryText,
    fontSize: 16,
    width: 60,
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: colors.tabsMainText,
    borderRadius: 15,
    padding: 15,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eventDetails: {
    flex: 1,
  },
  eventName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  eventLocation: {
    color: colors.tabsPrimary,
    marginLeft: 5,
  },
  eventTime: {
    color: colors.tabsSecondaryText,
    marginTop: 5,
  },
  eventImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  emptyEventCard: {
    flex: 1,
    height: 80,
    backgroundColor: '#EAEAEA',
    borderRadius: 15,
  },
  // New Meeting Button Styles
  newMeetingButton: {
    position: 'absolute',
    bottom: 125,
    right: 20,
    backgroundColor: colors.tabsPrimary,
    width: 60,
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: colors.tabsPrimary,
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 27,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.tabsMainText,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  inputContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  iconAndPickerDate: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  iconAndPickerTime: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginRight: '30%',
  },
  inputContainerFullWidth: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.tabsMainText,
    marginBottom: 5,
  },
  inputWrapperFullWidth: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.tabsSeondary,
    padding: 10,
    borderRadius: 10,
    width: '100%',
  },
  inputFullWidth: {
    flex: 1,
    color: colors.tabsPrimary,
    marginLeft: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: colors.tabsPrimary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 10,
  },
  createButton: {
    flex: 1,
    backgroundColor: colors.tabsValid,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  // Scrollable list styles
  scrollableListContainer: {
    maxHeight: 150, // Limit the height of the list
    overflow: 'hidden',
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.tabsMainText,
  },
  friendImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  friendName: {
    fontSize: 16,
    color: colors.tabsMainText,
    flex: 1,
  },
  greenDot: {
    width: 8,
    height: 8,
    borderRadius: 6,
    backgroundColor: colors.tabsValid,
    marginLeft: 'auto',
  },
});