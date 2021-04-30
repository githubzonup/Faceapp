import { StyleSheet } from "react-native";

export enum ThemeColor {
  WHITE_COLOR = "#FFF",
  INDIGO_DARKEN_4 = "#1a237e",
  INDIGO_LIGHTEN_2 = "#7986cb",
  INDIGO_LIGHTEN_4 = "#c5cae9",
  MING = "#355C7D",
  SMOKY = "#6C5B7B",
  TURKISH_ROSE = "#C06C84",
  TEAL_DARKEN_4 = "#004d40",
  PINK_DARKEN_4 = "#880e4f",
  DEEP_ORANGE_DARKEN_4 = "#bf360c",
  CYAN_ACCENT_4 = "#00b8d4",
}

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  row: {
    flexDirection: "row",
  },
  bgWhite: {
    backgroundColor: ThemeColor.WHITE_COLOR,
  },
  radius: {
    borderRadius: 8,
  },
});
