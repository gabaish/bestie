import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Modal,SafeAreaView } from 'react-native';
import Slider from '@react-native-community/slider'; // Correct import
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'; // Add ImagePicker import

import { useRouter } from 'expo-router';
import { colors } from '../../constants/colors';
import { TabsHeadline } from '../../components/tabsComponents';

const avatarImage = require('../../assets/images/boca2.png'); // Make sure this image path is correct

const ProfileScreen = () => {
    const router = useRouter();

  
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

    const toggleModal = () => {
        setModalVisible(!modalVisible);
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
            <View style={styles.nameAndImg}>
                <TouchableOpacity onPress={toggleModal}>
                <Image source={dogPhoto ? { uri: dogPhoto } : avatarImage} style={styles.avatar} />
                </TouchableOpacity>
                <Text style={[styles.label, {fontSize:24}]}> {dogInfo.name} </Text>
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
                            minimumTrackTintColor={colors.tabsPrimary}  
                            maximumTrackTintColor={colors.tabsProfileTabs}  
                            thumbTintColor={colors.tabsPrimary}
                                     
                />
                </View>  

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
                <TabsHeadline title="Profile"/>

                {/* Right side icons */}
                <View style={styles.headerIcons}>
                    <TouchableOpacity>
                        <FontAwesome5 name="qrcode" size={20} color={colors.tabsPrimary} />
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.settingsIcon}
                      onPress={() => router.push('/settings')}>
                        <MaterialIcons name="settings" size={24} color={colors.tabsPrimary} />
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
                onRequestClose={toggleModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                         <Image source={dogPhoto ? { uri: dogPhoto } : avatarImage} style={styles.largeAvatar} />
                    <TouchableOpacity style={styles.modalButton} onPress={pickImage}>
                            <Text style={styles.modalButtonText}>Change Image</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalCloseButton} onPress={toggleModal}>
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
        backgroundColor: colors.tabsBackground,
        paddingHorizontal: 20,
    },
    // Profile Header styles
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop:20,
        paddingHorizontal:20,
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
        backgroundColor: colors.tabsProfileTabs,
        borderRadius: 15,
        alignSelf: 'center'
    },
    tabButton: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: colors.tabsProfileTabs,
        margin: 7,
    },
    activeTab: {
        backgroundColor: colors.tabsPrimary,
    },
    tabText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#7F8C8D',
    },
    activeTabText: {
        color: colors.tabsMainText,
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
        color: colors.tabsSecondaryText,
        flexDirection :'row',
        justifyContent: 'flex-start',
        width: '100%',
        marginBottom: '3%',
        fontSize: 16
    },
    infoData:{
        backgroundColor: colors.tabsMainText,
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
        color: colors.tabsPrimary,
        marginVertical: 7,
    },
    labelInfo:{
        backgroundColor:colors.tabsSeondary,
        borderRadius: 17,
        paddingVertical: 10,
        paddingHorizontal: 15,
        overflow: 'hidden'
    },
    input: {
        borderBottomWidth: 2,
        color: '#2C3E50',
        borderBottomColor: colors.tabsPrimary,
        marginBottom: 10,
        fontSize: 16,
        paddingVertical: 5,
        width: '70%',
    },
    
    sliderView: {
        backgroundColor:colors.tabsSeondary,
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
    familyContainer: {
        alignItems: 'center',
        marginTop: 10,
    },
    familyCard: {
        width: '85%',
        backgroundColor: colors.tabsSeondary,
        padding: 20,
        borderRadius: 15,
        marginVertical: 10,
    },
    familyCardText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.tabsSecondaryText,
    },
    // Modal Styles
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(44, 62, 80, 0.5)', // Translucent background
    },
    modalContent: {
        backgroundColor: colors.tabsPrimary,
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
        backgroundColor: colors.tabsValid,
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    modalCloseButton: {
        backgroundColor: colors.tabsPrimary,
        padding: 10,
        borderRadius: 10,
    },
    modalButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
