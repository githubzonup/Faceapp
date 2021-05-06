import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import AppNavigator from "./src/navigators";
import { NavigationContainer } from "@react-navigation/native";
import Constants from "expo-constants";
import Amplify from "aws-amplify";
import { observer } from "mobx-react";
import useStores from "./src/utils/useStore";
import { Provider } from "mobx-react";
import RootStore from "./src/stores/rootStore";
import UserDialog from "./src/components/UserDialog";

Amplify.configure({
  Auth: {
    mandatorySignId: false,
    region: "ap-southeast-1",
    identityPoolId: "ap-southeast-1:8b3a884e-cc16-4de3-8174-933d95546149",
  },
  Storage: {
    AWSS3: {
      bucket: "storage-face-id",
      region: "ap-southeast-1",
    },
  },
});

const App = () => {
  const { userStore } = useStores();
  const [loading, setIsLoading] = useState<boolean>(true);

  async function initUser(): Promise<void> {
    setIsLoading(true);
    await userStore.initUser();
    setIsLoading(false);
  }

  useEffect(() => {
    initUser();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <UserDialog />
      {!loading && (
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});

const StoreWrapper = () => {
  const rootStore = new RootStore();

  return (
    <Provider {...rootStore}>
      <App />
    </Provider>
  );
};

export default observer(StoreWrapper);
