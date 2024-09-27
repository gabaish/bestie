import { View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import { Tabs, Redirect,useRouter } from 'expo-router';
import { icons } from '../../constants';
import { MaterialIcons } from '@expo/vector-icons';



const TabIcon = ({icon, color, name, focused}) => 
    {return (
        <View style={[
            styles.iconContainer,
            {
                width: focused ? 65 : 50,
                height: focused ? 65 : 50, 
                backgroundColor: focused ? '#4CAF50' : '#2C3E50'
            }
            
        ]}>
            <Image 
                source={icon}
                resizeMode="contain"
                style={{ tintColor: color, width: 28, height: 28 }}
            />
        </View> )}

const TabsLayout = () => {
    return (
        <>
            <Tabs 
                 screenOptions={{
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: '#FFFFFF',
                    tabBarInactiveTintColor: '#8E8E93',
                    tabBarStyle: styles.tabBarStyle
                 }}
                 style= {styles.bottomBar}   
            >
            <Tabs.Screen name= "friends"
                options= {{
                    title: 'friends',
                    headerShown: false,
                    tabBarIcon: ({color,focused})=>(
                        <TabIcon
                            icon = {icons.friends}
                            color = {color}
                            name = "friends"
                            focused= {focused}
                        />
                    )
                }}
            />
            <Tabs.Screen name= "messages"
                options= {{
                    title: 'messages',
                    headerShown: true,
                    tabBarIcon: ({color,focused})=>(
                        <TabIcon
                            icon = {icons.messages}
                            color = {color}
                            name = "messages"
                            focused= {focused}
                        />
                    )
                }}
            />
            <Tabs.Screen name= "home"
                options= {{
                    title: 'home',
                    headerShown: false,
                    tabBarIcon: ({color,focused})=>(
                        <TabIcon
                            icon = {icons.home}
                            color = {color}
                            name = "home"
                            focused= {focused}
                        />
                    )
                }}
            />
            <Tabs.Screen name= "playdates"
                options= {{
                    title: 'playdates',
                    headerShown: false,
                    tabBarIcon: ({color,focused})=>(
                        <TabIcon
                            icon = {icons.playdates}
                            color = {color}
                            name = "playdates"
                            focused= {focused}
                        />
                    )
                }}
            />
            <Tabs.Screen name= "profile"
                options= {{
                    title: 'profile',
                    headerShown: true,
                    tabBarIcon: ({color,focused})=>(
                        <TabIcon
                            icon = {icons.profile}
                            color = {color}
                            name = "profile"
                            focused= {focused}
                        />
                    )
                }}
            />
            </Tabs>
            
        </>
    )
}

const styles = StyleSheet.create({
    
  iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10, 
        elevation: 4,
        marginBottom: -30
    },
    tabBarStyle: {
        backgroundColor: '#2C3E50', // No background color to simulate separate buttons
        borderTopWidth: 0, // Remove default border line
        height: 50, // Increased height for the larger center button
        position: 'absolute',
        bottom: 65, // Lift the tab bar higher into the screen
        left: '10%',
        right: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:25,
        
    }
});

    
export default TabsLayout;
