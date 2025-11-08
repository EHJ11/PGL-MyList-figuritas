import React, { useState } from "react";
import {
  Button,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Product } from "../types/product";
import ProductItem from "/app/(tabs)/ProductItem";

export default function MainScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const generateId = () =>
    Date.now().toString() + Math.random().toString(36).substring(2);

  const addProduct = () => {
    if (!name.trim() || !price.trim() || !category.trim()) return;
    const newProduct: Product = {
      id: generateId(),
      name,
      category,
      price: parseFloat(price),
      marked: false,
    };
    setProducts([...products, newProduct]);
    setModalVisible(false);
    setName("");
    setPrice("");
    setCategory("");
  };

  const toggleMark = (id: string) => {
    setProducts(
      products.map((p) => (p.id === id ? { ...p, marked: !p.marked } : p))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const clearList = () => {
    setProducts([]);
  };

  const totalItems = products.length;
  const totalMarked = products.filter((p) => p.marked).length;
  const totalPrice = products
    .filter((p) => p.marked)
    .reduce((acc, p) => acc + p.price, 0)
    .toFixed(2);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧸 Mi Lista de Figuritas</Text>

      <View style={styles.indicators}>
        <Text>Total: {totalItems}</Text>
        <Text>Marcados: {totalMarked}</Text>
        <Text>Precio Total: {totalPrice} €</Text>
      </View>

      {products.length === 0 ? (
        <Text style={styles.empty}>No hay figuritas todavía.</Text>
      ) : (
        <ScrollView>
          {products.map((item) => (
            <ProductItem
              key={item.id}
              item={item}
              onToggle={toggleMark}
              onDelete={deleteProduct}
            />
          ))}
        </ScrollView>
      )}

      <View style={styles.buttons}>
        <Button
          title="Borrar lista completa"
          color="#ef4444"
          onPress={clearList}
          disabled={products.length === 0}
        />
      </View>

      <View style={styles.buttons}>
        <Button
          title="Añadir producto"
          color="#22c55e"
          onPress={() => setModalVisible(true)}
        />
      </View>

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Añadir nueva figurita</Text>

          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Precio"
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
          />
          <TextInput
            style={styles.input}
            placeholder="Categoría"
            value={category}
            onChangeText={setCategory}
          />

          <View style={styles.modalButtons}>
            <Button title="Guardar" color="#22c55e" onPress={addProduct} />
          </View>
          <View style={styles.modalButtons}>
            <Button
              title="Cancelar"
              color="#9ca3af"
              onPress={() => setModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  indicators: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15,
  },
  empty: {
    textAlign: "center",
    color: "#666",
    fontStyle: "italic",
    marginTop: 20,
  },
  buttons: {
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 25,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  modalButtons: {
    marginTop: 10,
  },
});
