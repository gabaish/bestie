import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Modal,SafeAreaView } from 'react-native';
import Slider from '@react-native-community/slider'; // Correct import
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'; // Add ImagePicker import
import { useNavigation } from '@react-navigation/native';

const avatarImage = require('../../assets/images/boca2.png'); // Make sure this image path is correct

const ProfileScreen = () => {
  const navigation = useNavigation();
    const [activeTab, setActiveTab] = useState('dogInfo');
    const [dogInfo, setDogInfo] = useState({
        name: 'Boca',
        breed: 'Mixed',
        birthDate: '14/02',
        size: '17kg',
        energyLevel: 50, // Default energy level slider value
    });
    const [modalVisible, setModalVisible] = useState(false);
    const [dogPhoto, setDogPhoto] = useState(null); // Move useState inside component


    // Function to open the image modal
    const handleImagePress = () => {
        setModalVisible(true);
    };

    // Function to close the image modal
    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
          alert("Permission to access camera roll is required!");
          return;
        }
    
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
    
        if (!result.canceled && result.assets && result.assets.length > 0) {
          setDogPhoto(result.assets[0].uri); // Update dogPhoto with selected image URI
        }
      };
    
    const renderDogInfo = () => (
        <View style={styles.dogInfoContainer}>
            {/* Clickable Avatar */}
            <TouchableOpacity onPress={handleImagePress}>
              <Image source={dogPhoto ? { uri: dogPhoto } : avatarImage} style={styles.avatar} />
            </TouchableOpacity>

            <View style={styles.infoContainer}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                    style={styles.input}
                    value={dogInfo.name}
                    onChangeText={(text) => setDogInfo({ ...dogInfo, name: text })}
                />
                
                <Text style={styles.label}>Breed</Text>
                <TextInput
                    style={styles.input}
                    value={dogInfo.breed}
                    onChangeText={(text) => setDogInfo({ ...dogInfo, breed: text })}
                />

                <Text style={styles.label}>Birth date</Text>
                <TextInput
                    style={styles.input}
                    value={dogInfo.birthDate}
                    onChangeText={(text) => setDogInfo({ ...dogInfo, birthDate: text })}
                />

                <Text style={styles.label}>Size</Text>
                <TextInput
                    style={styles.input}
                    value={dogInfo.size}
                    onChangeText={(text) => setDogInfo({ ...dogInfo, size: text })}
                />

                <Text style={styles.label}>Energy level</Text>
                <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={100}
                    value={dogInfo.energyLevel}
                    onValueChange={(value) => setDogInfo({ ...dogInfo, energyLevel: value })}
                    minimumTrackTintColor="#2C3E50"  // Filled part
                    maximumTrackTintColor="#C0C0C0"  // Unfilled part
                    thumbTintColor="#2C3E50"         // Color of the thumb (dot)
                />
            </View>
        </View>
    );

    const renderFamilyView = () => (
        <View style={styles.familyContainer}>
            {/* Mock family accounts */}
            {["Account 1", "Account 1", "Account 1", "Account 1"].map((account, index) => (
                <View key={index} style={styles.familyCard}>
                    <Text style={styles.familyCardText}>{account}</Text>
                </View>
            ))}
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Profile Header */}
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Profile</Text>

                {/* Right side icons */}
                <View style={styles.headerIcons}>
                    <TouchableOpacity>
                        <FontAwesome5 name="qrcode" size={20} color="#2C3E50" />
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.settingsIcon}
                      onPress={() => navigation.navigate('settings')}>
                        <MaterialIcons name="settings" size={24} color="#2C3E50" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Tabs for switching between "Dog Info" and "Family" */}
            <View style={styles.tabsContainer}>
                <TouchableOpacity
                    style={[styles.tabButton, activeTab === 'dogInfo' && styles.activeTab]}
                    onPress={() => setActiveTab('dogInfo')}
                >
                    <Text style={[styles.tabText, activeTab === 'dogInfo' && styles.activeTabText]}>Dog Info</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tabButton, activeTab === 'family' && styles.activeTab]}
                    onPress={() => setActiveTab('family')}
                >
                    <Text style={[styles.tabText, activeTab === 'family' && styles.activeTabText]}>Family</Text>
                </TouchableOpacity>
            </View>

            {/* Render the content based on the active tab */}
            {activeTab === 'dogInfo' ? renderDogInfo() : renderFamilyView()}

            {/* Modal to display larger image and Edit button */}
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={handleCloseModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                         <Image source={dogPhoto ? { uri: dogPhoto } : avatarImage} style={styles.largeAvatar} />
                    <TouchableOpacity style={styles.modalButton} onPress={pickImage}>
                            <Text style={styles.modalButtonText}>Change Image</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalCloseButton} onPress={handleCloseModal}>
                            <Text style={styles.modalButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F5F7',
        paddingHorizontal: 20,
    },
    // Profile Header styles
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop:20,
        paddingBottom: 0,
        paddingHorizontal:20,
        
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2C3E50',
    },
    headerIcons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingsIcon: {
        marginLeft: 15, // Spacing between icons
    },
    // Tabs Container styles
    tabsContainer: {
        width: '90%',
        flexDirection: 'row',
        marginVertical: 10,
        backgroundColor: '#E0E0E0',
        borderRadius: 15,
        alignSelf: 'center'
    },
    tabButton: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        backgroundColor: '#E0E0E0',
        margin: 7,
    },
    activeTab: {
        backgroundColor: '#2C3E50',
    },
    tabText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#7F8C8D',
    },
    activeTabText: {
        color: 'white',
    },
    dogInfoContainer: {
        alignItems: 'center',
        alignSelf: 'center',
        width: '80%'
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 100,
        marginBottom: 0,
        marginTop: 10,
    },
    infoContainer: {
        marginTop: 0,
        width: '100%',
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2C3E50',
        marginVertical: 7,
    },
    input: {
        borderBottomWidth: 2,
        color: '#2C3E50',
        borderBottomColor: '#2C3E50',
        marginBottom: 10,
        fontSize: 16,
        paddingVertical: 5,
        width: '70%',
    },
    slider: {
        width: '100%',
        height: 40,
        marginVertical: 10,
    },
    familyContainer: {
        alignItems: 'center',
        marginTop: 10,
    },
    familyCard: {
        width: '85%',
        backgroundColor: '#F0F0F0',
        padding: 20,
        borderRadius: 15,
        marginVertical: 10,
    },
    familyCardText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#9D9D9D',
    },
    // Modal Styles
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(44, 62, 80, 0.5)', // Translucent background
    },
    modalContent: {
        backgroundColor: '#2C3E50',
        padding: 25,
        borderRadius: 50,
        alignItems: 'center',
        marginBottom: 75,
    },
    largeAvatar: {
        width: 300,
        height: 300,
        borderRadius: 30,
        marginBottom: 20,
    },
    modalButton: {
        backgroundColor: '#27AE60',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    modalCloseButton: {
        backgroundColor: '#2C3E50',
        padding: 10,
        borderRadius: 10,
    },
    modalButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
