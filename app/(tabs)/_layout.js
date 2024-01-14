import { Tabs } from "expo-router";
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{ 
            tabBarLabel: "Home", 
            tabBarLabelStyle: { color: "#929292" },
            headerShown:false,
            tabBarIcon:({focused}) =>
            focused ? (
                <FontAwesome name="tasks" size={24} color="#929292" />
            ) : (
                <FontAwesome name="tasks" size={24} color="black" />
            )
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{ 
            tabBarLabel: "Calendar", 
            tabBarLabelStyle: { color: "#929292" },
            headerShown:false,
            tabBarIcon:({focused}) =>
            focused ? (
                <AntDesign name="calendar" size={24} color="#929292" />
            ) : (
                <AntDesign name="calendar" size={24} color="black" />
            )
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{ 
            tabBarLabel: "Profile", 
            tabBarLabelStyle: { color: "#929292" },
            headerShown:false,
            tabBarIcon:({focused}) =>
            focused ? (
                <MaterialCommunityIcons name="account-details" size={24} color="#929292" />
            ) : (
                <MaterialCommunityIcons name="account-details" size={24} color="black" />
            )
        }}
      />
    </Tabs>
  );
}
