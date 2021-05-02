import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import get from "lodash/get";
import { globalStyles, ScreenRouter, ThemeColor } from "../../constants";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import Button from "../../components/Button";
import { Camera } from "expo-camera";
import { Storage } from "aws-amplify";
import { ScanCategory } from "../../types/scanner";
import { registerFaceId, verifyFaceId } from "../../API/faceId";

interface ICameraScreenProps {
  route: any;
  navigation: NavigationProp<ParamListBase>;
}

const CameraScreen = (props: ICameraScreenProps) => {
  const { navigation, route } = props;
  const [loading, setLoading] = useState(false);
  const [hasPermission, setHasPermission] = useState<unknown>(null);
  const [camera, setCamera] = useState(Camera.Constants.Type.front);
  let cameraRef: Camera | null;
  const scanCategory = get(route, "params.scanCategory", "");

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

  async function handleAttendance(
    uri: string,
    imageName: string
  ): Promise<void> {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      await Storage.put(`attendance/${imageName}`, blob, {
        contentType: "image/jpeg",
      });
      const faceId = await verifyFaceId(imageName);
      await Storage.remove(`attendance/${imageName}`);
      Alert.alert("Found face ID", get(faceId, "FaceMatches.[0].Face.FaceId"));
    } catch (err) {
      console.log("Error uploading file:", err);
    }
  }

  async function handleRegister(uri: string, imageName: string): Promise<void> {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      await Storage.put(`register/${imageName}`, blob, {
        contentType: "image/jpeg",
      });
      const faceId = await registerFaceId(imageName);
      Alert.alert("Saved face ID", get(faceId, "FaceRecords.[0].Face.FaceId"));
    } catch (err) {
      console.log("Error uploading file:", err);
    }
  }

  async function handleConfirm(): Promise<void> {
    setLoading(true);
    let photo = await cameraRef?.takePictureAsync({ quality: 0.75 });
    const uri: string = photo?.uri || "";
    const imageNameChunks: string[] = uri?.split("/");
    const imageName: string = imageNameChunks[imageNameChunks?.length - 1];

    if (scanCategory === ScanCategory.ATTENDANCE) {
      await handleAttendance(uri, imageName);
    }

    if (scanCategory === ScanCategory.REGISTRATION) {
      await handleRegister(uri, imageName);
    }
    setLoading(false);
  }

  function handleSwitchCamera(): void {
    camera === Camera.Constants.Type.front &&
      setCamera(Camera.Constants.Type.back);
    camera === Camera.Constants.Type.back &&
      setCamera(Camera.Constants.Type.front);
  }

  function handleLogout(): void {
    navigation.navigate(ScreenRouter.LOGIN);
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
          ref={(ref: Camera | null) => (cameraRef = ref)}
          ratio="4:3"
          style={styles.cameraStyle}
          type={camera}
        />
      </View>
      <View style={styles.formLayout}>
        <View style={[styles.smallSpacing]}>
          <Button
            title={loading ? "loading" : "confirm"}
            backgroundColor={ThemeColor.PINK_DARKEN_4}
            color={ThemeColor.WHITE_COLOR}
            onPress={handleConfirm}
          />
        </View>
        <View style={[styles.smallSpacing]}>
          <Button
            title={
              camera === Camera.Constants.Type.front
                ? "switch back camera"
                : "switch front camera"
            }
            backgroundColor={ThemeColor.TEAL_DARKEN_4}
            color={ThemeColor.WHITE_COLOR}
            onPress={handleSwitchCamera}
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
  cameraLayout: {
    marginTop: "15%",
  },
  cameraStyle: {
    minHeight: "60%",
  },
  formLayout: {
    width: "80%",
    alignSelf: "center",
    paddingTop: 36,
  },
  smallSpacing: {
    marginTop: "6%",
  },
  mediumSpacing: {
    marginTop: "12%",
  },
});

export default CameraScreen;
