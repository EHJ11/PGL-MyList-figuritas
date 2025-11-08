import { product } from "app/(tabs)/types";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
interface Props {
  item: product;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function ProductItem({ item, onToggle, onDelete }: Props) {
  return (
    <View style={styles.item}>
      <Text
        style={[styles.name, item.marked && styles.marked]}
        onPress={() => onToggle(item.id)}
      >
        {item.name} ({item.category}) - {item.price.toFixed(2)} €
      </Text>
      <Button
        title="Eliminar"
        color="#ef4444"
        onPress={() => onDelete(item.id)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 5,
  },
  marked: {
    textDecorationLine: "line-through",
    color: "gray",
  },
});
