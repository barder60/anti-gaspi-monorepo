import { StyleSheet, Text, View } from "react-native"
import { StatusBar } from "expo-status-bar"
import { Hello, FormInputs } from "user-interface"
import { add } from "calculate"
import { CreateAd } from "./CreateAd"

export default function App() {

  return (
    <View style={styles.container}>
      <Text style={styles.header}>AntiGaspi</Text>
      <CreateAd/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontWeight: "bold",
    marginBottom: 20,
    fontSize: 36,
  },
});
