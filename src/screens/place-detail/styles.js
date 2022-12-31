import { StyleSheet } from "react-native";

import colors from "../../utils/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image:{
    minHeight: 250,
    width: "100%",
    minWidth: 250,
    },
  location:{
    margin: 20,
    width: "100%",
    maxWidth: 370,
    height: "100%",
    maxHeight: 250,
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    elevation: 5,
    bborderRadious: 10,
  },
  addressContainer:{
    padding: 20,
  },
  address:{
    color: colors.primary,
    textAlign: "center",
  },
  map:{
  },
});
