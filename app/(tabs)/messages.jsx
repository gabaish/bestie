import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors } from '../../constants/colors';
import { TabsSearchBar, TabsHeadline } from '../../components/tabsComponents';

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
                    <TabsHeadline title="Messages"/>
                    <MaterialIcons name="notifications-none" size={24} color={colors.tabsPrimary} />
                </View>

                {/* Search Bar */}
                <TabsSearchBar/>
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
        backgroundColor: colors.tabsBackground,
    },
    // Header styles
    header: {
        padding: 20,
        backgroundColor: colors.tabsBackground,
    },
    headerTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
        backgroundColor: colors.tabsMainText,
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
        color: colors.tabsPrimary,
    },
    lastMessage: {
        fontSize: 14,
        color: colors.tabsSecondaryText,
    },
    timeContainer: {
        alignItems: 'flex-end',
    },
    time: {
        fontSize: 12,
        color: colors.tabsSecondaryText,
    },
    unreadBadge: {
        backgroundColor: colors.tabsValid,
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
