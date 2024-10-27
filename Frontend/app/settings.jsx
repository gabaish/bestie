import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../constants/colors';

const SettingsScreen = () => {
    const navigation = useNavigation(); // Initialize navigation hook

    return (
        <SafeAreaView style={styles.container}>
            {/* Settings Header */}
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <FontAwesome5 name="chevron-left" size={20} color={colors.tabsPrimary} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Settings</Text>
            </View>

            {/* Settings Options */}
            <View style={styles.settingsContainer}>
                {['Account', 'Notifications', 'Map', 'Privacy'].map((option, index) => (
                    <TouchableOpacity key={index} style={styles.settingsItem}>
                        <Text style={styles.settingsText}>{option}</Text>
                        <FontAwesome5 name="chevron-right" size={20} color={colors.tabsSecondaryText} />
                    </TouchableOpacity>
                ))}
            </View>
        </SafeAreaView>
    );
};

export default SettingsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.tabsBackground,
        paddingHorizontal: 20,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 20,
    },
    backButton: {
        marginRight: 15,
        marginLeft:'5%'
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.tabsPrimary,
    },
    settingsContainer: {
        width: '90%',
        alignSelf: 'center',
        marginTop: 20,
    },
    settingsItem: {
        backgroundColor: colors.tabsSeondary,
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
    settingsText: {
        fontSize: 18,
        color: colors.tabsSecondaryText,
    },
});
