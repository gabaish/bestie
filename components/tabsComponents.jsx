import React from 'react';
import { TouchableOpacity, Text, TextInput, StyleSheet, Dimensions, View } from 'react-native';
import { colors } from '../constants/colors';
import { MaterialIcons} from '@expo/vector-icons';

export const TabsSearchBar =  ()=> {
    return (
        <View style={styles.searchContainer}>
            <TextInput
                style={styles.searchBar}
                placeholder="Search"
                placeholderTextColor={colors.tabsSecondaryText}
            />
            <MaterialIcons name="search" size={24} color={colors.tabsSecondaryText} style={styles.searchIcon} />
        </View>
    );
}

export const TabsHeadline = ({title})=> {   
    return (
        <Text style={styles.headline}>{title}</Text>
    );
}

const styles = StyleSheet.create({
    searchContainer: {
        position: 'relative',
        marginTop: 10,
    },
    searchBar: {
        paddingRight: 40, 
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: colors.tabsSeondary,
        borderRadius: 20,
        color: colors.tabsSecondaryText,
    },
    searchIcon: {
        position: 'absolute',
        right: 10, 
        top: 7, 
    },

    headline:{
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.tabsPrimary,
    }
});