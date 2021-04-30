import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { globalStyles } from "../../constants";
import PairLabel from "../PairLabel";

const MOCK_AVATAR =
  "https://nghesiviet.vn/storage/artist/thong-tin-tieu-su-bill-gates/thong-tin-tieu-su-bill-gates-0.jpg";

const UserCard = () => {
  return (
    <View
      style={[globalStyles.container, globalStyles.row, globalStyles.bgWhite, globalStyles.radius]}
    >
      <View style={styles.avatarLayout}>
        <Image source={{ uri: MOCK_AVATAR }} style={styles.avatarStyle} />
      </View>
      <View style={styles.informationLayout}>
        <PairLabel label="First Name" value="Bill" />
        <PairLabel label="Last Name" value="Gates" />
        <PairLabel label="Age" value="60" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  avatarLayout: {
    flex: 1,
    margin: 10,
  },
  avatarStyle: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  informationLayout: {
    flex: 2,
    margin: 10,
    marginLeft: 0,
  },
});

export default UserCard;
