import { View, Text, Image} from 'react-native';
import { Tabs, Redirect} from 'expo-router';
import { icons } from '../../constants'

const TabIcon = ({icon, color, name, focused}) => 
    {return (
        <View className="items-center justify-center gap-1">
            <Image 
                source= {icon} 
                resizeMode="contain"
                tintColor={color}
                className= "w-6 h-6"
                

            />
            <Text style={{color:color}}>
                {name}
            </Text>


        </View> )}

const TabsLayout = () => {
    return (
        <>
            <Tabs 
                 screenOptions={{
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: '#FFA001',
                    tabBarInactiveTintColor: '#CDCDE0',
                    tabBarStyle:{
                        backgroundColor: '#161622',
                        borderTopWidth: 1,
                        borderTopColor: '#232533',
                        height: 84
                    }
                 }}   
            >
            <Tabs.Screen name= "friends"
                options= {{
                    title: 'friends',
                    headerShown: true,
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
            <Tabs.Screen name= "playdates"
                options= {{
                    title: 'playdates',
                    headerShown: true,
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

export default TabsLayout;