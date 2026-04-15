import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import { colors } from "./components/theme";
import { HomeScreen } from "./screens/HomeScreen";
import { ContestsScreen } from "./screens/ContestsScreen";
import { PracticeScreen } from "./screens/PracticeScreen";
import { NotesScreen } from "./screens/NotesScreen";
import { ProfileScreen } from "./screens/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer
        theme={{
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            background: colors.background,
            card: colors.card,
            text: colors.textPrimary,
            border: "#222B36",
            primary: colors.primary,
          },
        }}
      >
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: colors.textSecondary,
            tabBarStyle: {
              backgroundColor: colors.card,
              borderTopColor: "#222B36",
              height: 62,
              paddingTop: 8,
              paddingBottom: 8,
            },
            tabBarIcon: ({ color, size }) => {
              if (route.name === "Home") return <Feather name="home" color={color} size={size} />;
              if (route.name === "Contests") return <Feather name="calendar" color={color} size={size} />;
              if (route.name === "Practice") return <Feather name="code" color={color} size={size} />;
              if (route.name === "Notes") return <Feather name="book-open" color={color} size={size} />;
              return <Feather name="users" color={color} size={size} />;
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Contests" component={ContestsScreen} />
          <Tab.Screen name="Practice" component={PracticeScreen} />
          <Tab.Screen name="Notes" component={NotesScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
