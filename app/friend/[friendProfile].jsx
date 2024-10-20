import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Modal,SafeAreaView } from 'react-native';
import Slider from '@react-native-community/slider'; // Correct import
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'; // Add ImagePicker import
import { useNavigation } from '@react-navigation/native';
import { useLocalSearchParams } from 'expo-router';

const avatarImage = require('../../assets/images/boca2.png'); // Make sure this image path is correct

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { name } = useLocalSearchParams();
    const [activeTab, setActiveTab] = useState('dogInfo');
    const [dogInfo, setDogInfo] = useState({
        name: 'Boca',
        gender: 'Female',
        breed: 'Mixed',
        age: '1 year',
        size: 'Medium',
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
    
    const renderDogInfo = () => (
        <View style={styles.dogInfoContainer}>
            {/* Clickable Avatar */}
            <View style={styles.nameAndImg}>
                <TouchableOpacity onPress={handleImagePress}>
                <Image source={dogPhoto ? { uri: dogPhoto } : avatarImage} style={styles.avatar} />
                </TouchableOpacity>
                <Text style={[styles.label, {fontSize:24}]}> {name} </Text>
                <FontAwesome5
                    name={dogInfo.gender === "Male" ? "mars" : "venus"}
                    size={24} // Adjust size as needed
                    color={dogInfo.gender === "Male" ? 'blue' : 'pink'}
                />
            </View>

            <Text style={styles.headline}>Info</Text>
            <View style={styles.infoData}>
                <View style={styles.infoRow}>
                    <View style={styles.infoItem}>
                        <Text style={styles.label}>Breed</Text>
                        <Text style={styles.labelInfo}>{dogInfo.breed} </Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.label}>Age</Text>
                        <Text style={styles.labelInfo}>{dogInfo.age} </Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.label}>Size</Text>
                        <Text style={styles.labelInfo}>{dogInfo.size} </Text>
                    </View>
                </View>
                <View style={[styles.infoRow, {marginTop:15}]}>
                    <View style={styles.infoItem}>
                    <Text style={styles.label}>Energy level</Text>
                    </View>
                </View>
                <View style={styles.sliderView}>
                <Slider
                            style={styles.slider}
                            minimumValue={0}
                            maximumValue={100}
                            value={dogInfo.energyLevel}
                            onValueChange={(value) => setDogInfo({ ...dogInfo, energyLevel: value })}
                            minimumTrackTintColor="#2C3E50"  
                            maximumTrackTintColor="#C0C0C0"  
                            thumbTintColor="#2C3E50"
                                     
                />
                </View>  

            </View>
        </View>
    );

    const renderMutualFriendsView = () => (
        <View style={styles.mutualFriendsContainer}>
            {/* Mock mutual friends accounts */}
            {["Account 1", "Account 1", "Account 1", "Account 1"].map((account, index) => (
                <View key={index} style={styles.mutualFriendCard}>
                    <Text style={styles.mutualFriendCardText}>{account}</Text>
                </View>
            ))}
        </View>
    );

    return (
        
        <SafeAreaView style={styles.container}>
            {/* Profile Header */}
            <View style={styles.headerContainer}>
                <TouchableOpacity  onPress={() => navigation.goBack()}>
                    <FontAwesome5 name="chevron-left" size={20} color="#2C3E50" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Profile</Text>
            </View>

            {/* Tabs for switching between "Dog Info" and "mutualFriend" */}
            <View style={styles.tabsContainer}>
                <TouchableOpacity
                    style={[styles.tabButton, activeTab === 'dogInfo' && styles.activeTab]}
                    onPress={() => setActiveTab('dogInfo')}
                >
                    <Text style={[styles.tabText, activeTab === 'dogInfo' && styles.activeTabText]}>Dog Info</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tabButton, activeTab === 'mutualFriends' && styles.activeTab]}
                    onPress={() => setActiveTab('mutualFriends')}
                >
                    <Text style={[styles.tabText, activeTab === 'mutualFriends' && styles.activeTabText]}>Mutual friends</Text>
                </TouchableOpacity>
            </View>

            {/* Render the content based on the active tab */}
            {activeTab === 'dogInfo' ? renderDogInfo() : renderMutualFriendsView()}

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
        justifyContent: 'flex-start',
        gap: 20,
        alignItems: 'center',
        paddingTop:20,
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
        borderRadius: 10,
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
        width: '87%'
    },
    nameAndImg:{
        flexDirection :'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        marginBottom: '10%',
        gap:'15%'
    },
    avatar: {
        width: 85,
        height: 85,
        borderRadius: 100,
        marginBottom: 0,
        marginTop: 10,
    },
    infoContainer: {
        marginTop: 0,
        width: '100%',
    },
    headline: {
        color:'#8D8D8D',
        flexDirection :'row',
        justifyContent: 'flex-start',
        width: '100%',
        marginBottom: '3%',
        fontSize: 16
    },
    infoData:{
        backgroundColor: 'white',
        borderRadius: 25,
        padding: 18,
        paddingVertical: 20,
        width:'100%'
    },
    infoRow:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'space-between',
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2C3E50',
        marginVertical: 7,
    },
    labelInfo:{
        backgroundColor:'#F7F7F7',
        borderRadius: 17,
        paddingVertical: 10,
        paddingHorizontal: 15,
        overflow: 'hidden'
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
    sliderView: {
        backgroundColor:'#F7F7F7',
        borderRadius: 25,
        paddingHorizontal: 15,
        overflow: 'hidden'
    },
    slider: {
        alignSelf:'center',
        width: '100%',
        height: 40,
        marginVertical: 10,
    },
    mutualFriendsContainer: {
        alignItems: 'center',
        marginTop: 10,
    },
    mutualFriendCard: {
        width: '85%',
        backgroundColor: '#F0F0F0',
        padding: 20,
        borderRadius: 15,
        marginVertical: 10,
    },
    mutualFriendCardText: {
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
