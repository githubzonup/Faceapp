import React, { useCallback } from "react";
import { View, StyleSheet, Image, TextInput, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import debounce from "lodash/debounce";
import { globalStyles, ScreenRouter, ThemeColor } from "../../constants";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import Button from "../../components/Button";
import { ScanCategory } from "../../types/scanner";
import useStores from "../../utils/useStore";
import UserStore from "../../stores/userStore";
import { IEmployee } from "../../types";
import { observer } from "mobx-react";

interface ILoginProps {
  navigation: NavigationProp<ParamListBase>;
}

const FaceRegistration = (props: ILoginProps) => {
  const { userStore } = useStores();
  const { navigation } = props;
  const { employeeDetail } = userStore;

  function handleLogout(): void {
    navigation.navigate(ScreenRouter.LOGIN);
  }

  function handleTakeFace(): void {
    if (
      !employeeDetail?.firstname &&
      !employeeDetail?.lastname &&
      !employeeDetail?.Age &&
      !employeeDetail?.Image
    ) {
      Alert.alert("Information", "User is invalid");
      return;
    }
    if (!userStore?.selectedEmployeeId) {
      Alert.alert("Information", "User is invalid");
      return;
    }
    navigation.navigate(ScreenRouter.CAMERA, {
      scanCategory: ScanCategory.REGISTRATION,
    });
  }

  function handleScanQr(): void {
    navigation.navigate(ScreenRouter.QR_SCAN, {
      ScanCategory: ScanCategory.SCAN_QR_CODE,
    });
  }

  async function handleEmployNumber(): Promise<void> {
    const foundEmployee: IEmployee = await userStore.fetchEmployDetail(
      userStore?.selectedEmployeeId
    );
    if (
      !foundEmployee?.firstname &&
      !foundEmployee?.lastname &&
      !foundEmployee?.Age &&
      !foundEmployee?.Image
    ) {
      Alert.alert("Information", "User is invalid");
      return;
    }
    if (!userStore?.selectedEmployeeId) {
      Alert.alert("Information", "User is invalid");
      return;
    }
    userStore.setOpenDialog(true);
    setTimeout(() => {
      navigation.navigate(ScreenRouter.CAMERA, {
        scanCategory: ScanCategory.REGISTRATION,
      });
    }, 100);
  }

  const onInputChange = useCallback(
    debounce((store: UserStore, employeeId: string) => {
      store.setSelectedEmployeeId(employeeId);
    }, 100),
    []
  );

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
        <View style={[styles.inputLayout, globalStyles.row]}>
          <View style={[styles.employLayout, styles.smallRightSpacing]}>
            <TextInput
              style={styles.inputStyle}
              placeholder="ENTER EMPLOY NUMBER"
              onChangeText={(employeeId: string) => {
                onInputChange(userStore, employeeId);
              }}
            />
          </View>
          <View style={styles.employSubmitLayout}>
            <Button
              title="go"
              onPress={handleEmployNumber}
              backgroundColor={ThemeColor.DEEP_ORANGE_DARKEN_4}
              color={ThemeColor.WHITE_COLOR}
            />
          </View>
        </View>
        <View style={[styles.smallSpacing]}>
          <Button
            title="take face registration"
            onPress={handleTakeFace}
            backgroundColor={ThemeColor.TEAL_DARKEN_4}
            color={ThemeColor.WHITE_COLOR}
          />
        </View>
        <View style={[styles.smallSpacing]}>
          <Button
            title="scan qr for face registration"
            onPress={handleScanQr}
            backgroundColor={ThemeColor.PINK_DARKEN_4}
            color={ThemeColor.WHITE_COLOR}
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
  logoLayout: {
    paddingTop: "5%",
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
  inputLayout: {
    minHeight: 45,
  },
  inputStyle: {
    minHeight: 45,
    backgroundColor: ThemeColor.WHITE_COLOR,
    borderRadius: 8,
    paddingLeft: 20,
    paddingRight: 20,
  },
  smallSpacing: {
    marginTop: "6%",
  },
  smallRightSpacing: {
    marginRight: 16,
  },
  employLayout: {
    flex: 1,
  },
  employSubmitLayout: {
    width: 70,
  },
});

export default observer(FaceRegistration);
