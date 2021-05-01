import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { globalStyles, ScreenRouter, ThemeColor } from "../../constants";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import Button from "../../components/Button";

interface ILoginProps {
  navigation: NavigationProp<ParamListBase>;
}

const Login = (props: ILoginProps) => {
  const { navigation } = props;

  function handleLogin(): void {
    navigation.navigate(ScreenRouter.REGISTRATION_MENU);
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        style={styles.gradient}
        colors={[ThemeColor.MING, ThemeColor.SMOKY, ThemeColor.TURKISH_ROSE]}
      />
      <KeyboardAvoidingView behavior="position">
        <View style={styles.titleLayout}>
          <Text style={styles.titleStyle}>Login</Text>
        </View>
        <View style={styles.logoLayout}>
          <Image
            style={styles.logoStyle}
            source={require("../../../assets/windows.png")}
          />
        </View>
        <View style={styles.formLayout}>
          <View style={styles.inputLayout}>
            <TextInput style={styles.inputStyle} placeholder="Enter username" />
          </View>
          <View style={[styles.inputLayout, styles.smallSpacing]}>
            <TextInput
              style={styles.inputStyle}
              placeholder="Enter password"
              secureTextEntry
            />
          </View>
          <View style={[styles.smallSpacing]}>
            <Button
              title="Submit"
              onPress={handleLogin}
              backgroundColor={ThemeColor.INDIGO_DARKEN_4}
              color={ThemeColor.WHITE_COLOR}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: globalStyles.container,
  gradient: globalStyles.gradient,
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
});

export default Login;
