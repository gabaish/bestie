import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Modal, Pressable, TextInput } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

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

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTopRow}>
          <Text style={styles.headerTitle}>Playdates</Text>
          <MaterialIcons name="notifications-none" size={24} color="white" />
        </View>
        <View style={styles.headerDateRow}>
          <MaterialIcons name="calendar-today" size={20} color="white" />
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
                <FontAwesome5 name="map-marker-alt" size={12} color="gray" />
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
                  <FontAwesome5 name="calendar-alt" size={24} color="#A9A9A9" />
                  <DateTimePicker value={selectedDate} mode="date" display="default" onChange={handleDateChange} style={styles.dateTimePicker} />
                </View>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Time</Text>
                <View style={styles.iconAndPickerTime}>
                  <MaterialIcons name="access-time" size={24} color="#A9A9A9" />
                  <DateTimePicker value={selectedTime} mode="time" display="default" onChange={handleTimeChange} style={styles.dateTimePicker} />
                </View>
              </View>
            </View>

            {/* Location Input */}
            <View style={styles.inputContainerFullWidth}>
              <Text style={styles.label}>Location</Text>
              <View style={styles.inputWrapperFullWidth}>
                <MaterialIcons name="location-on" size={16} color="#A9A9A9" />
                <TextInput
                  style={styles.inputFullWidth}
                  placeholder="Enter location"
                  placeholderTextColor="#A9A9A9"
                  value={locationInput}
                  onChangeText={setLocationInput}
                />
              </View>
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
    backgroundColor: '#f4f5f7',
  },
  // Header styles
  header: {
    backgroundColor: '#2C3E50',
    padding: 20,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    paddingBottom: 10,
  },
  headerDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  headerDateText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 16,
  },
  // Date Picker styles
  datePickerContainer: {
    backgroundColor: '#2C3E50',
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
    color: 'white',
    fontSize: 16,
  },
  boldText: {
    fontWeight: 'bold',
    color: 'white',
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
    color: 'gray',
    fontSize: 16,
    width: 60,
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
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
    color: 'gray',
    marginLeft: 5,
  },
  eventTime: {
    color: 'gray',
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
    bottom: 125, // Adjust to be above the bottom bar
    right: 20,  // Position to the right side of the screen
    backgroundColor: '#2C3E50', // Blueish background color
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
    backgroundColor: '#2C3E50',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 27,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
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
    color: 'white',
    marginBottom: 5,
  },
  inputWrapperFullWidth: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    padding: 10,
    borderRadius: 10,
    width: '100%',
  },
  inputFullWidth: {
    flex: 1,
    color: '#2C3E50',
    marginLeft: 10,
  },
  dateTimePicker: {
    flex: 1,
    marginLeft: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#2C3E50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 10,
  },
  createButton: {
    flex: 1,
    backgroundColor: '#27AE60',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
