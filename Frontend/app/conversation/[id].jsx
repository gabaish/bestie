import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Modal, Pressable, TouchableWithoutFeedback, Keyboard, Image } from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useLocalSearchParams } from 'expo-router'; // Import for dynamic route params
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../constants/colors';

// Import the image from the assets folder (this is for React Native)
const avatarImage = require('../../assets/images/boca2.png');

// Sample messages data
const messagesData = [
    { id: '1', sender: 'me', text: 'Hello!', time: '10:21' },
    { id: '2', sender: 'them', text: 'Hi!', time: '10:34' },
    { id: '3', sender: 'them', text: 'How are you?', time: '10:34' },
    { id: '4', sender: 'me', text: 'I’m good, thanks. What about you?', time: '11:00' },
];

const ConversationScreen = () => {
    
    const router = useRouter();
    const { id, name } = useLocalSearchParams(); // Get the dynamic 'id' from the route

    const [messageInput, setMessageInput] = useState('');
    const [inputHeight, setInputHeight] = useState(40);
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

    const handleTextChange = (text) => {
        setMessageInput(text);
        const newLineCount = (text.match(/\n/g) || []).length;
        setInputHeight(Math.min(80, (40 + newLineCount * 20)));
    };

    const handleDateChange = (event, selectedDate) => {
        setSelectedDate(selectedDate || new Date());
    };

    const handleTimeChange = (event, selectedTime) => {
        setSelectedTime(selectedTime || new Date());
    };

    const renderMessageItem = ({ item }) => (
        <View style={[styles.messageContainer, item.sender === 'me' ? styles.myMessage : styles.theirMessage]}>
            <Text style={styles.messageText}>{item.text}</Text>
            <Text style={styles.messageTime}>{item.time}</Text>
        </View>
    );

    return (
        
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                            <FontAwesome5 name="chevron-left" size={20} color={colors.tabsPrimary} />
                        </TouchableOpacity>
                        <Image source={avatarImage} style={styles.avatar} />
                        <View style={styles.userInfo}>
                            <Text style={styles.userName}>{name}</Text>
                            <View style={styles.statusContainer}>
                                <View style={styles.onlineDot} />
                                <Text style={styles.userStatus}>Online</Text>
                            </View>
                        </View>
                    </View>

                    {/* Messages List */}
                    <FlatList
                        data={messagesData}
                        keyExtractor={item => item.id}
                        renderItem={renderMessageItem}
                        contentContainerStyle={styles.messagesList}
                    />

                    {/* Modal */}
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={handleCloseModal}
                    >
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View style={styles.modalContainer}>
                                <View style={styles.modalContent}>
                                    <Text style={styles.modalTitle}>New Meeting</Text>

                                    {/* Date and Time Inputs as Icons + Pickers next to each other */}
                                    <View style={styles.inputRow}>
                                        <View style={styles.inputContainer}>
                                            <Text style={styles.label}>Date</Text>
                                            <View style={styles.iconAndPickerDate}>
                                                <FontAwesome5 name="calendar-alt" size={24} color={colors.tabsMainText} />
                                                <DateTimePicker
                                                    value={selectedDate}
                                                    mode="date"
                                                    display="default"
                                                    onChange={handleDateChange}
                                                    style={styles.dateTimePicker} // Styling the DateTimePicker
                                                />
                                            </View>
                                        </View>
                                        <View style={styles.inputContainer}>
                                            <Text style={styles.label}>Time</Text>
                                            <View style={styles.iconAndPickerTime}>
                                                <MaterialIcons name="access-time" size={24} color={colors.tabsMainText} />
                                                <DateTimePicker
                                                    value={selectedTime}
                                                    mode="time"
                                                    display="default"
                                                    onChange={handleTimeChange}
                                                    style={styles.dateTimePicker} // Styling the DateTimePicker
                                                />
                                            </View>
                                        </View>
                                    </View>

                                    {/* Location Input Block (Replaces Map) */}
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
                        </TouchableWithoutFeedback>
                    </Modal>

                    {/* Message Input Area */}
                    <View style={styles.messageInputContainer}>
                        <View style={styles.innerContainer}>
                            <TouchableOpacity style={styles.attachmentButton} onPress={handleShowModal}>
                                <FontAwesome5 name="calendar-day" size={24} color={colors.tabsMainText} />
                            </TouchableOpacity>
                            <TextInput
                                style={[styles.messageInput, { height: Math.max(35, inputHeight) }]}
                                value={messageInput}
                                onChangeText={handleTextChange}
                                multiline={true}
                                placeholderTextColor="#A9A9A9"
                                textAlignVertical="center"
                            />
                            <TouchableOpacity style={styles.sendButton}>
                                 <FontAwesome5 name="arrow-right" size={24} color={colors.tabsPrimary} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        
    );
};

export default ConversationScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.tabsBackground,
    },
    // Header Styles
    header: {
        paddingTop: '14%',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        backgroundColor: colors.tabsMainText,
    },
    backButton: {
        marginRight: 10,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.tabsPrimary,
    },
    userStatus: {
        fontSize: 14,
        color: colors.tabsValid,
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    onlineDot: {
        width: 7,
        height: 7,
        borderRadius: 4,
        backgroundColor: colors.tabsValid,
        marginRight: 5,
    },
    // Messages List
    messagesList: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    messageContainer: {
        marginBottom: 10,
        maxWidth: '80%',
        padding: 10,
        borderRadius: 10,
    },
    myMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#B3E5FC',
    },
    theirMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#FFFFFF',
    },
    messageText: {
        fontSize: 16,
        color: colors.tabsPrimary,
    },
    messageTime: {
        fontSize: 11,
        color: colors.tabsSecondaryText,
        textAlign: 'left',
        marginTop: 5,
    },
    // Modal
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
        justifyContent: 'flex-start', // Ensures the icon and picker stay on the left
        alignItems: 'center',  
        marginRight: '30%',       // Vertically center the items
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
    dateTimePicker: {
        flex: 1,
        marginLeft: 5, // Bring the picker closer to the icon
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
        backgroundColor:colors.tabsValid,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    // Message Input Area
    messageInputContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#FFFFFF',
        height: 110,
        marginBottom:-10,  
    },
    innerContainer: {
        flexDirection: 'row',
        width: '95%',
        alignItems: 'center',
    },
    attachmentButton: {
        width: 40,
        height: 40,
        backgroundColor: colors.tabsPrimary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        marginRight: 0,
        marginBottom:20,

    },
    messageInput: {
        paddingHorizontal: 15,
        backgroundColor: colors.tabsBackground,
        borderRadius: 20,
        color: colors.tabsPrimary,
        flex: 1,
        marginHorizontal: 13,
        marginBottom:20,
       
    },

    sendButton: {
        marginBottom: 20,
      },

});
