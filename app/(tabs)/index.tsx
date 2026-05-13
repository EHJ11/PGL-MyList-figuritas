import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Product } from "../types/product";
import ProductItem from "./ProductItem";

type Screen = "home" | "add" | "list";

export default function Index() {
  const [products, setProducts] = useState<Product[]>([]);
  const [screen, setScreen] = useState<Screen>("home");

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const generateId = () =>
    Date.now().toString() + Math.random().toString(36).substring(2);

  const handleAddProduct = () => {
    if (!name.trim() || !price.trim() || !category.trim()) return;
    const newProduct: Product = {
      id: generateId(),
      name,
      category,
      price: parseFloat(price),
      marked: false,
    };
    setProducts([...products, newProduct]);
    setName("");
    setPrice("");
    setCategory("");
    setScreen("list");
  };

  const toggleMark = (id: string) =>
    setProducts(
      products.map((p) => (p.id === id ? { ...p, marked: !p.marked } : p)),
    );

  const deleteProduct = (id: string) =>
    setProducts(products.filter((p) => p.id !== id));

  const totalItems = products.length;
  const totalPrice = products.reduce((acc, p) => acc + p.price, 0).toFixed(2);

  if (screen === "home") {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.screen}>
          <View style={styles.headerBox}>
            <Text style={styles.headerText}>Figuras de plomo.es</Text>
          </View>

          <View style={styles.body}>
            {products.length === 0 ? (
              <View style={styles.emptyBox}>
                <Text style={styles.emptyText}>No hay productos creados</Text>
              </View>
            ) : (
              <FlatList
                data={products}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <ProductItem
                    item={item}
                    onToggle={toggleMark}
                    onDelete={deleteProduct}
                  />
                )}
                contentContainerStyle={{ paddingBottom: 16 }}
              />
            )}
          </View>

          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.btnBlue}
              onPress={() => setScreen("add")}
              activeOpacity={0.8}
            >
              <Text style={styles.btnBlueText}>Añadir producto</Text>
            </TouchableOpacity>

            {products.length > 0 && (
              <TouchableOpacity
                style={[
                  styles.btnBlue,
                  { marginTop: 10, backgroundColor: "#93c5fd" },
                ]}
                onPress={() => setScreen("list")}
                activeOpacity={0.8}
              >
                <Text style={styles.btnBlueText}>Ver lista completa</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </SafeAreaView>
    );
  }

  if (screen === "add") {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.screen}>
          <View style={styles.headerBox}>
            <Text style={styles.headerText}>Figuras de plomo.es</Text>
          </View>

          <View style={styles.body}>
            <TextInput
              style={styles.input}
              placeholder="Añade su nombre"
              placeholderTextColor="#5b8dd9"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Añade su precio"
              placeholderTextColor="#5b8dd9"
              keyboardType="numeric"
              value={price}
              onChangeText={setPrice}
            />
            <TextInput
              style={styles.input}
              placeholder="Añade su categoria"
              placeholderTextColor="#5b8dd9"
              value={category}
              onChangeText={setCategory}
            />
          </View>

          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.btnYellow}
              onPress={handleAddProduct}
              activeOpacity={0.8}
            >
              <Text style={styles.btnYellowText}>Guardar el progreso</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.btnBlue, { marginTop: 10 }]}
              onPress={() => setScreen("home")}
              activeOpacity={0.8}
            >
              <Text style={styles.btnBlueText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <View style={styles.headerBox}>
          <Text style={styles.headerText}>Figuras de plomo.es</Text>
        </View>

        <View style={styles.listSubHeader}>
          <Text style={styles.listSubTitle}>Productos seleccionados:</Text>
          <TouchableOpacity
            style={styles.btnYellowSmall}
            onPress={() => setScreen("home")}
            activeOpacity={0.8}
          >
            <Text style={styles.btnYellowSmallText}>
              Guardar el{"\n"}progreso
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.listScroll}
          contentContainerStyle={{ paddingBottom: 16 }}
        >
          {products.map((item) => (
            <ProductItem
              key={item.id}
              item={item}
              onToggle={toggleMark}
              onDelete={deleteProduct}
            />
          ))}
        </ScrollView>

        <View style={styles.listFooter}>
          <View style={styles.totalBox}>
            <Text style={styles.totalText}>total de productos:</Text>
            <Text style={styles.totalValue}>{totalItems}</Text>
          </View>
          <View style={styles.totalBox}>
            <Text style={styles.totalText}>Precio total:</Text>
            <Text style={styles.totalValue}>{totalPrice} €</Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.btnBlue, { margin: 12 }]}
          onPress={() => setScreen("add")}
          activeOpacity={0.8}
        >
          <Text style={styles.btnBlueText}>Añadir otro producto</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#dce8f5",
  },
  screen: {
    flex: 1,
    backgroundColor: "#dce8f5",
  },

  headerBox: {
    backgroundColor: "#90c4f0",
    borderRadius: 20,
    margin: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#5b9fd4",
  },
  headerText: {
    fontSize: 26,
    fontWeight: "800",
    color: "#0d2f55",
    letterSpacing: 0.5,
    fontStyle: "italic",
  },

  body: {
    flex: 1,
    paddingHorizontal: 14,
    paddingTop: 8,
  },

  emptyBox: {
    borderWidth: 1.5,
    borderColor: "#90c4f0",
    borderRadius: 14,
    backgroundColor: "#e8f3fc",
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignSelf: "flex-start",
    marginTop: 10,
  },
  emptyText: {
    fontSize: 16,
    color: "#2563a8",
    fontWeight: "500",
  },

  input: {
    backgroundColor: "#e8f3fc",
    borderWidth: 1.5,
    borderColor: "#90c4f0",
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 14,
    fontSize: 16,
    color: "#1a3a5c",
  },

  footer: {
    padding: 14,
  },

  btnYellow: {
    backgroundColor: "#fde68a",
    borderWidth: 1.5,
    borderColor: "#d4a017",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
  },
  btnYellowText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#7c4a00",
  },

  btnBlue: {
    backgroundColor: "#90c4f0",
    borderWidth: 1.5,
    borderColor: "#5b9fd4",
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
  },
  btnBlueText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0d2f55",
  },

  listSubHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 14,
    marginBottom: 8,
  },
  listSubTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1a3a5c",
    flex: 1,
  },
  btnYellowSmall: {
    backgroundColor: "#fde68a",
    borderWidth: 1.5,
    borderColor: "#d4a017",
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: "center",
  },
  btnYellowSmallText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#7c4a00",
    textAlign: "center",
  },
  listScroll: {
    flex: 1,
    paddingHorizontal: 14,
  },
  listFooter: {
    flexDirection: "row",
    borderTopWidth: 1.5,
    borderTopColor: "#90c4f0",
    backgroundColor: "#c7e0f5",
  },
  totalBox: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
  },
  totalText: {
    fontSize: 13,
    color: "#1a3a5c",
    fontWeight: "600",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0d2f55",
  },
});
