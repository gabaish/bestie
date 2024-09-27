import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

const getCurrentMonthAndYear = () => {
  const date = new Date(); // Get the current date
  const options = { month: 'long', year: 'numeric' }; // Format options
  return date.toLocaleDateString('en-US', options); // Returns "May, 2024"
};

const getUpcomingDates = (daysCount) => {
  const dates = [];
  const today = new Date();

  for (let i = 0; i < daysCount; i++) {
      const currentDay = new Date();
      currentDay.setDate(today.getDate() + i); // Increment the date by 'i' days
      const dayName = new Intl.DateTimeFormat('en', { weekday: 'short' }).format(currentDay); // E.g. "Tue"
      const dayNumber = currentDay.getDate(); // E.g. 25

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
    return (
        <View style={styles.container}>
            
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

                {/* Empty Time Slot 2 */}
                <View style={styles.timeSlot}>
                    <Text style={styles.time}>14:00</Text>
                    <View style={styles.emptyEventCard} />
                </View>
            </ScrollView>

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
        paddingBottom: 10
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
      alignItems: 'center'
    },  
    dateItem: {
        alignItems: 'center',
        marginHorizontal: 15,
    },
    selectedDate: {
        backgroundColor: 'white',
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    dateText: {
        color: 'white',
        fontSize: 16,
    },
    boldText: {
        fontWeight: 'bold', 
        color: 'white',
        fontSize: 22
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
    }
    
});
