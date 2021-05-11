import { observer } from "mobx-react";
import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Dialog, { DialogTitle, DialogContent } from "react-native-popup-dialog";
import { ThemeColor } from "../../constants";
import useStores from "../../utils/useStore";
import Button from "../Button";
import UserCard from "../UserCard";

const UserDialog = () => {
  const { userStore } = useStores();
  
  return (
    <Dialog
      visible={userStore.openDialog}
      dialogTitle={<DialogTitle title="User information" />}
    >
      <DialogContent>
        <View style={styles.container}>
          <UserCard employeeDetail={userStore.employeeDetail} loading={false} />
          <View style={styles.buttonLayout}>
            <Button
              title="Close"
              onPress={() => userStore.setOpenDialog(false)}
              color={ThemeColor.WHITE_COLOR}
              backgroundColor={ThemeColor.TEAL_DARKEN_4}
            />
          </View>
        </View>
      </DialogContent>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    height: 150,
  },
  buttonLayout: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
});

export default observer(UserDialog);
