import { StyleSheet, Text, View } from "react-native"
import { StatusBar } from "expo-status-bar"
import { Hello } from "user-interface"
import { add } from "calculate"

export default function Native() {
  add(2, 2)

  return (
    <View style={styles.container}>
      <Text style={styles.header}>AntiGaspi</Text>
      <Hello name="Lucas"></Hello>
      <StatusBar style="auto" />
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
