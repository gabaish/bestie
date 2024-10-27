import React from 'react';
import { View, Text, TextInput, ScrollView, FlatList, Image, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { images } from '../../constants';
import { colors } from '../../constants/colors';
import { useRouter } from 'expo-router';
import { TabsSearchBar, TabsHeadline } from '../../components/tabsComponents';

const friends = [
    { id: '1', name: 'Boca', image: 'https://example.com/dog1.jpg' },
    { id: '2', name: 'Scrapy', image: 'https://example.com/dog2.jpg' },
    { id: '3', name: 'Zoey', image: 'https://example.com/dog3.jpg' },
    { id: '4', name: 'Fey', image: 'https://example.com/dog3.jpg' },
    { id: '5', name: 'Val', image: 'https://example.com/dog3.jpg' }
];

const favoriteFriends = [
    { id: '1', image: 'https://example.com/dog2.jpg' },
    { id: '2', image: 'https://example.com/dog2.jpg' },
    { id: '3', image: 'https://example.com/dog3.jpg' },
    { id: '4', image: 'https://example.com/dog3.jpg' },
    { id: '5', image: 'https://example.com/dog3.jpg' }
];

const FriendsTab = () => {
    const router = useRouter();
    return (
      
        <SafeAreaView style={styles.container}>
            
            <View style={styles.header}>
                <View style={styles.headerTopRow}>
                    <TabsHeadline title="Friends"/>
                </View>
                <TabsSearchBar/>
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
                  <TouchableOpacity onPress={()=> router.push(
                    {pathname:`/friend/${item.id}`,
                    params: { name: item.name}})}>
                    <View style={styles.friendItem}>
                        <Image source={{ uri: item.image }} style={styles.friendImage} />
                        <Text style={styles.friendName}>{item.name}</Text>
                        <FontAwesome5 name="comment-dots" size={20} color={colors.tabsPrimary} />
                        
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
        backgroundColor: colors.tabsBackground,
    },
    // Header styles
    header: {
        padding: 20,
    },
    headerTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    
    // Favorite Friends Section
    favoriteSection: {
        padding: 20,
        paddingTop: 10,
        backgroundColor: colors.tabsPrimary,
        borderRadius: 15,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10
    },
    favoriteText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: colors.tabsMainText,
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
        backgroundColor: colors.tabsMainText,
        padding: 15,
        borderRadius: 10,
        borderBottomWidth: 4,
        borderBottomColor: colors.tabsBackground
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
        color: colors.tabsPrimary,
    },
});
