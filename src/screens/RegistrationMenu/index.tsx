import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { globalStyles, ScreenRouter, ThemeColor } from "../../constants";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import Button from "../../components/Button";

interface IRegistrationMenuProps {
  navigation: NavigationProp<ParamListBase>;
}

const RegistrationMenu = (props: IRegistrationMenuProps) => {
  const { navigation } = props;

  function handleRegistration(): void {
    navigation.navigate(ScreenRouter.FACE_REGISTRATION)
  }

  function handleAttendance(): void {
    navigation.navigate(ScreenRouter.CAMERA)
  }

  function handleLogout(): void {
    navigation.navigate(ScreenRouter.LOGIN)
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        style={styles.gradient}
        colors={[ThemeColor.MING, ThemeColor.SMOKY, ThemeColor.TURKISH_ROSE]}
      />
      <View style={styles.logoutLayout}>
        <Button
          title="logout"
          onPress={handleLogout}
          color={ThemeColor.WHITE_COLOR}
        />
      </View>
      <View style={styles.logoLayout}>
        <Image
          style={styles.logoStyle}
          source={require("../../../assets/windows.png")}
        />
      </View>
      <View style={styles.formLayout}>
        <View style={[styles.smallSpacing]}>
          <Button
            title="registration"
            backgroundColor={ThemeColor.TEAL_DARKEN_4}
            color={ThemeColor.WHITE_COLOR}
            onPress={handleRegistration}
          />
        </View>
        <View style={[styles.smallSpacing]}>
          <Button
            title="attendance"
            backgroundColor={ThemeColor.PINK_DARKEN_4}
            color={ThemeColor.WHITE_COLOR}
            onPress={handleAttendance}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: globalStyles.container,
  gradient: globalStyles.gradient,
  logoutLayout: {
    width: 80,
    alignSelf: 'flex-end',
    textAlign: "right",
  },
  titleLayout: {
    marginTop: "15%",
  },
  titleStyle: {
    color: ThemeColor.WHITE_COLOR,
    textAlign: "center",
    fontSize: 24,
  },
  logoLayout: {
    paddingTop: "20%",
  },
  logoStyle: {
    width: 200,
    height: 200,
    alignSelf: "center",
  },
  formLayout: {
    width: "80%",
    marginTop: "10%",
    alignSelf: "center",
  },
  smallSpacing: {
    marginTop: "6%",
  },
});

export default RegistrationMenu;
