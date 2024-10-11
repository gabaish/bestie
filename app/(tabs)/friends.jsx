import React from 'react';
import { View, Text, TextInput, ScrollView, FlatList, Image, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { images } from '../../constants';

const friends = [
    { id: '1', name: 'Boca', image: 'https://example.com/dog1.jpg' },
    { id: '2', name: 'Boca', image: 'https://example.com/dog2.jpg' },
    { id: '3', name: 'Boca', image: 'https://example.com/dog3.jpg' },
    { id: '4', name: 'Boca', image: 'https://example.com/dog3.jpg' },
    { id: '5', name: 'Boca', image: 'https://example.com/dog3.jpg' }
];

const favoriteFriends = [
    { id: '1', image: 'https://example.com/dog2.jpg' },
    { id: '2', image: 'https://example.com/dog2.jpg' },
    { id: '3', image: 'https://example.com/dog3.jpg' },
    { id: '4', image: 'https://example.com/dog3.jpg' },
    { id: '5', image: 'https://example.com/dog3.jpg' }
];

const FriendsTab = () => {
    return (
      
        <SafeAreaView style={styles.container}>
            
            <View style={styles.header}>
                <View style={styles.headerTopRow}>
                    <Text style={styles.headerTitle}>Friends</Text>
                </View>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchBar}
                        placeholder="Search"
                        placeholderTextColor="#A9A9A9"
                    />
                    <MaterialIcons name="search" size={24} color="#A9A9A9" style={styles.searchIcon} />
                </View>
            </View>

            {/* Favorite Friends Section */}
            <View style={styles.favoriteSection}>
                <Text style={styles.favoriteText}>Favorites</Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.favoriteScroll}>
                    {favoriteFriends.map(friend => (
                        <View key={friend.id} style={styles.favoriteItem}>
                            <Image source={friend.image } style={styles.favoriteImage} />
                        </View>
                    ))}
                </ScrollView>
            </View>

            {/* Friends List Section */}
            <View style= {styles.friendsView}>
            <FlatList
                data={friends}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity>
                    <View style={styles.friendItem}>
                        <Image source={{ uri: item.image }} style={styles.friendImage} />
                        <Text style={styles.friendName}>{item.name}</Text>
                        <FontAwesome5 name="comment-dots" size={20} color="#2C3E50" />
                        
                    </View>
                  </TouchableOpacity>
                )}
                contentContainerStyle={styles.friendsList}
            />
            </View>
        </SafeAreaView>
    );
};

export default FriendsTab;

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
      paddingLeft:10,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2C3E50',
    },
    searchBar: {
        marginTop: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#F0F0F0',
        borderRadius: 20,
        color: '#2C3E50',
    },
    searchIcon: {
        position: 'absolute',
        right: 10,
        top: 18, // Adjust the top position to vertically center the icon
    },
    // Favorite Friends Section
    favoriteSection: {
        padding: 20,
        paddingTop: 10,
        backgroundColor: '#2C3E50',
        borderRadius: 15,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10
    },
    favoriteText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white',
        paddingBottom: 15
    },
    favoriteScroll: {
        flexDirection: 'row',
    },
    favoriteItem: {
        marginRight: 25,
    },
    favoriteImage: {
        width: 70,
        height: 70,
        borderRadius: 50,
        backgroundColor: '#27AE60',
    },
    // Friends List Section
    friendsView: {
      height: '47%'
    },
    friendsList: {
        paddingHorizontal: 12,

    },
    friendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 0,
        backgroundColor: '#FAFAFA',
        padding: 15,
        borderRadius: 10,
        borderBottomWidth: 4,
        borderBottomColor: '#F4F5F7'
    },
    friendImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
        backgroundColor: '#27AE60',
    },
    friendName: {
        flex: 1,
        fontSize: 16,
        color: '#2C3E50',
    },
});
