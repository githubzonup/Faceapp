import React, { Fragment } from "react";
import { View, StyleSheet, Image, ActivityIndicator } from "react-native";
import { BASE_API_URL, globalStyles, ThemeColor } from "../../constants";
import { IEmployee } from "../../types";
import PairLabel from "../PairLabel";

interface IUserCardProps {
  loading: boolean;
  employeeDetail: IEmployee;
}

const UserCard = (props: IUserCardProps) => {
  const { loading, employeeDetail } = props;

  return (
    <View
      style={[
        globalStyles.container,
        globalStyles.row,
        globalStyles.bgWhite,
        globalStyles.radius,
      ]}
    >
      <View style={styles.avatarLayout}>
        {loading && (
          <ActivityIndicator size={28} color={ThemeColor.TEAL_DARKEN_4} />
        )}
        {!loading && (
          <Image
            source={{ uri: `${BASE_API_URL}/face/${employeeDetail?.Image}` }}
            style={styles.avatarStyle}
          />
        )}
      </View>
      <View style={styles.informationLayout}>
        {!loading && (
          <Fragment>
            {employeeDetail?.Emp_Id && (
              <PairLabel label="ID" value={employeeDetail?.Emp_Id} />
            )}
            <PairLabel
              label="First Name"
              value={employeeDetail?.firstname || "Not found"}
            />
            <PairLabel
              label="Last Name"
              value={employeeDetail?.lastname || "Not found"}
            />
            <PairLabel label="Age" value={employeeDetail?.Age || "Not found"} />
          </Fragment>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  avatarLayout: {
    flex: 1,
    margin: 10,
    alignSelf: "center",
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
