import { TouchableOpacity, Text, StyleSheet } from "react-native";
import React from "react";

interface IButtonProps {
  onPress: () => void;
  title: string;
  backgroundColor?: string;
  color?: string;
}

const Button = (props: IButtonProps) => {
  const { onPress, title, backgroundColor, color } = props;

  return (
    <TouchableOpacity
      style={[styles.buttonStyle, { backgroundColor }]}
      onPress={onPress}
    >
      <Text style={[styles.buttonTextStyle, { color }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    minHeight: 45,
    borderRadius: 8,
    justifyContent: "center",
  },
  buttonTextStyle: {
    textAlign: "center",
    textTransform: "uppercase",
  },
});

export default Button;
