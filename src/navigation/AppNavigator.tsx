import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "@/screens/HomeScreen";
import EmploymentInfoScreen from "@/screens/EmploymentInfoScreen";
import EditEmploymentInfo from "@/screens/EditEmploymentInfo";

export type RootStackParamList = {
  Home: undefined;
  EmploymentInfo: undefined;
  EditEmploymentInfo: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EmploymentInfo"
        component={EmploymentInfoScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="EditEmploymentInfo"
        component={EditEmploymentInfo}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
