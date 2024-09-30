import React from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, StyleSheet, SafeAreaView } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';

// Sample message data
const messages = [
    { id: '1', name: 'Thomas', lastMessage: 'text text text text', time: '1m', unread: 2 },
    { id: '2', name: 'Jon Doe', lastMessage: 'text text text text', time: '22m', unread: 0 },
    { id: '3', name: 'Jon Doe', lastMessage: 'text text text text', time: '2h', unread: 0 },
    { id: '4', name: 'Jon Doe', lastMessage: 'text text text text', time: 'Mon', unread: 1 },
];

const MessagesTab = () => {
  const router = useRouter();

    const renderMessageItem = ({ item }) => (
        <TouchableOpacity 
          style={styles.messageItem} 
          onPress={() => router.push(
            {pathname:`/conversation/${item.id}`,
            params: { name: item.name}})}>
            <View style={styles.avatarContainer}>
                <Image source={require('../../assets/images/boca2.png')} style={styles.avatar} />
            </View>
            <View style={styles.messageDetails}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.lastMessage}>{item.lastMessage}</Text>
            </View>
            <View style={styles.timeContainer}>
                <Text style={styles.time}>{item.time}</Text>
                {item.unread > 0 && (
                    <View style={styles.unreadBadge}>
                        <Text style={styles.unreadText}>{item.unread}</Text>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Header Section */}
            <View style={styles.header}>
                <View style={styles.headerTopRow}>
                    <Text style={styles.headerTitle}>Messages</Text>
                    <MaterialIcons name="notifications-none" size={24} color="#2C3E50" />
                </View>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchBar}
                        placeholder="Search"
                        placeholderTextColor="#A9A9A9"
                    />
                    <MaterialIcons name="search" size={24} color="#A9A9A9" style={styles.searchIcon} />
                </View>
            </View>

            {/* Messages List */}
            <View style= {styles.messagesView}>
            <FlatList
                data={messages}
                keyExtractor={item => item.id}
                renderItem={renderMessageItem}
                contentContainerStyle={styles.messageList}
            />
            </View>
        </SafeAreaView>
    );
};

export default MessagesTab;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F5F7',
    },
    // Header styles
    header: {
        padding: 20,
        backgroundColor: '#F4F5F7',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    headerTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2C3E50',
    },
    // Search Bar with Icon
    searchContainer: {
        position: 'relative',
        marginTop: 10,
    },
    searchBar: {
        paddingRight: 40, // Add padding to the right so the text doesn't overlap the icon
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#F0F0F0',
        borderRadius: 20,
        color: '#2C3E50',
    },
    searchIcon: {
        position: 'absolute',
        right: 10, // Position the icon at the right end of the TextInput
        top: 10, // Adjust the top position to vertically center the icon
    },
    // Messages List
    messageList: {
        paddingHorizontal: 20,
        paddingBottom: 20, // Padding to prevent overlapping with bottom tab
    },
    messageItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        
    },
    avatarContainer: {
        marginRight: 15,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    messageDetails: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2C3E50',
    },
    lastMessage: {
        fontSize: 14,
        color: '#A9A9A9',
    },
    timeContainer: {
        alignItems: 'flex-end',
    },
    time: {
        fontSize: 12,
        color: '#A9A9A9',
    },
    unreadBadge: {
        backgroundColor: '#27AE60',
        borderRadius: 10,
        paddingHorizontal: 8,
        paddingVertical: 2,
        marginTop: 5,
    },
    unreadText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12,
    },
    messagesView: {
      height: '65%'
    },
});
