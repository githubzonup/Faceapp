import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { globalStyles, ScreenRouter, ThemeColor } from "../../constants";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import Button from "../../components/Button";
import { Camera } from "expo-camera";
import { observer } from "mobx-react";
import useStores from "../../utils/useStore";
import { IEmployee } from "../../types";
import { ScanCategory } from "../../types/scanner";

interface IQrScanScreenProps {
  route: any;
  navigation: NavigationProp<ParamListBase>;
}

const QrScanScreen = (props: IQrScanScreenProps) => {
  const { navigation } = props;
  const [hasPermission, setHasPermission] = useState<unknown>(null);
  const { userStore } = useStores();
  const [camera, setCamera] = useState(Camera.Constants.Type.back);

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

  function handleSwitchCamera(): void {
    camera === Camera.Constants.Type.front &&
      setCamera(Camera.Constants.Type.back);
    camera === Camera.Constants.Type.back &&
      setCamera(Camera.Constants.Type.front);
  }

  function handleLogout(): void {
    navigation.navigate(ScreenRouter.LOGIN);
  }

  function handleBarCodeScanned(scanResult: { data: string }): void {
    try {
      const employeeCode: any = JSON.parse(`${scanResult?.data}`);
      if (!employeeCode?.Emp_Id) {
        Alert.alert("Information", "Qr code is not valid");
        return;
      }

      const employee: IEmployee = {
        Emp_Id: employeeCode?.Emp_Id,
        Age: employeeCode?.Age,
        lastname: employeeCode?.Name,
        firstname: employeeCode?.Name,
        Image: employeeCode?.image,
      };

      userStore.setEmployDetail(employee);
      userStore.setSelectedEmployeeId(employeeCode?.Emp_Id);
      userStore.setOpenDialog(true);

      setTimeout(() => {
        navigation.navigate(ScreenRouter.CAMERA, {
          employee,
          scanCategory: ScanCategory.REGISTRATION,
        });
      }, 100);
    } catch (error) {
      console.log(error);
    }
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
          type={camera}
          onBarCodeScanned={(scanResult) => {
            handleBarCodeScanned(scanResult);
          }}
        />
      </View>
      <View style={styles.formLayout}>
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
  verifyStyle: {
    alignSelf: "center",
    paddingTop: "50%",
    color: ThemeColor.WHITE_COLOR,
    fontSize: 30,
  },
});

export default observer(QrScanScreen);
