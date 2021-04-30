import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ScreenRouter } from "../constants";
import FaceRegistration from "../screens/FaceRegistration";
import Login from "../screens/Login";
import Menu from "../screens/Camera";
import RegistrationMenu from "../screens/RegistrationMenu";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={ScreenRouter.LOGIN}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={ScreenRouter.LOGIN} component={Login} />
      <Stack.Screen
        name={ScreenRouter.FACE_REGISTRATION}
        component={FaceRegistration}
      />
      <Stack.Screen name={ScreenRouter.CAMERA} component={Menu} />
      <Stack.Screen
        name={ScreenRouter.REGISTRATION_MENU}
        component={RegistrationMenu}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
