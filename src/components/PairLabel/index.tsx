import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { globalStyles, ThemeColor } from "../../constants";

interface IPairLabelProps {
  label: string;
  value: string;
}

const PairLabel = (props: IPairLabelProps) => {
  const { label, value } = props;
  return (
    <View style={globalStyles.row}>
      <View style={styles.labelLayout}>
        <Text>{label}</Text>
      </View>
      <View style={styles.separateLayout}>
        <Text>:</Text>
      </View>
      <View style={styles.valueLayout}>
        <Text style={styles.valueStyle}>{value}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  labelLayout: {
    flex: 4,
  },
  separateLayout: {
    flex: 1,
  },
  valueLayout: {
    flex: 4,
  },
  valueStyle: {
    color: ThemeColor.CYAN_ACCENT_4,
  },
});

export default PairLabel;
