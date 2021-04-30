import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, Text, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { globalStyles, ScreenRouter, ThemeColor } from "../../constants";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import Button from "../../components/Button";
import { Camera } from "expo-camera";

interface ICameraScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

const CameraScreen = (props: ICameraScreenProps) => {
  const { navigation } = props;

  const [hasPermission, setHasPermission] = useState<unknown>(null);

  async function requestCameraPermission(): Promise<void> {
    const { status } = await Camera.requestPermissionsAsync();
    setHasPermission(status);
  }

  useEffect(() => {
    requestCameraPermission();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  function handleConfirm(): void {
    navigation.navigate(ScreenRouter.REGISTRATION_MENU)
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
      <View style={[styles.cameraLayout]}>
        <Camera
          ratio="4:3"
          style={styles.cameraStyle}
          type={Camera.Constants.Type.front}
        />
      </View>
      <View style={styles.formLayout}>
        <View style={[styles.mediumSpacing]}>
          <Button
            title="confirm"
            backgroundColor={ThemeColor.PINK_DARKEN_4}
            color={ThemeColor.WHITE_COLOR}
            onPress={handleConfirm}
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
    alignSelf: "flex-end",
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
  cameraLayout: {
    marginTop: "15%",
    minHeight: (Dimensions.get("window").width * 4) / 3,
  },
  cameraStyle: {
    minHeight: "60%",
  },
  formLayout: {
    width: "80%",
    alignSelf: "center",
  },
  mediumSpacing: {
    marginTop: "12%",
  },
});

export default CameraScreen;
