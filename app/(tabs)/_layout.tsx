import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  title: string;
  children: React.ReactNode;
};

export default function Layout({ title, children }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{title}</Text>
      </View>
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f6f8fb" },
  header: {
    paddingTop: 18,
    paddingBottom: 14,
    alignItems: "center",
    backgroundColor: "#eaf2ff",
    borderBottomWidth: 1,
    borderBottomColor: "#dde9ff",
  },
  headerText: { fontSize: 20, fontWeight: "700", color: "#0d3b66" },
  content: { flex: 1, padding: 14 },
});
