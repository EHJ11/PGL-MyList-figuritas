import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Product } from "../types/product";
import ProductItem, { CATEGORIES, getImageForCategory } from "./ProductItem";

type Screen = "add" | "list";

export default function Index() {
  const [products, setProducts] = useState<Product[]>([]);
  const [screen, setScreen] = useState<Screen>("add");

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const generateId = () =>
    Date.now().toString() + Math.random().toString(36).substring(2);

  const handleAddProduct = () => {
    if (!name.trim() || !price.trim() || !category) return;
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

  if (screen === "add") {
    const selectedImage = category ? getImageForCategory(category) : null;

    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.headerBox}>
            <Text style={styles.headerText}>Figuras de plomo.es</Text>
          </View>

          <View style={styles.formArea}>
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

            <TouchableOpacity
              style={[styles.input, styles.dropdown]}
              onPress={() => setDropdownOpen(!dropdownOpen)}
              activeOpacity={0.8}
            >
              <Text
                style={
                  category
                    ? styles.dropdownSelected
                    : styles.dropdownPlaceholder
                }
              >
                {category || "Añade su categoria"}
              </Text>
              <Text style={styles.dropdownArrow}>
                {dropdownOpen ? "▲" : "▼"}
              </Text>
            </TouchableOpacity>

            {dropdownOpen && (
              <View style={styles.dropdownList}>
                {CATEGORIES.map((cat) => (
                  <TouchableOpacity
                    key={cat.label}
                    style={[
                      styles.dropdownItem,
                      category === cat.label && styles.dropdownItemSelected,
                    ]}
                    onPress={() => {
                      setCategory(cat.label);
                      setDropdownOpen(false);
                    }}
                    activeOpacity={0.7}
                  >
                    <Image
                      source={cat.image}
                      style={styles.dropdownItemImage}
                      resizeMode="contain"
                    />
                    <Text style={styles.dropdownItemText}>{cat.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {selectedImage && !dropdownOpen && (
              <View style={styles.previewBox}>
                <Image
                  source={selectedImage}
                  style={styles.previewImage}
                  resizeMode="contain"
                />
              </View>
            )}
          </View>

          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.btnYellow}
              onPress={handleAddProduct}
              activeOpacity={0.8}
            >
              <Text style={styles.btnYellowText}>Guardar el progreso</Text>
            </TouchableOpacity>

            {products.length > 0 && (
              <TouchableOpacity
                style={[styles.btnBlue, { marginTop: 10 }]}
                onPress={() => setScreen("list")}
                activeOpacity={0.8}
              >
                <Text style={styles.btnBlueText}>Ver lista ({totalItems})</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
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
            onPress={() => setScreen("add")}
            activeOpacity={0.8}
          >
            <Text style={styles.btnYellowSmallText}>Añadir{"\n"}producto</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.listScroll}
          contentContainerStyle={{ paddingBottom: 16 }}
        >
          {products.length === 0 ? (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>No hay productos creados</Text>
            </View>
          ) : (
            products.map((item) => (
              <ProductItem
                key={item.id}
                item={item}
                onToggle={toggleMark}
                onDelete={deleteProduct}
              />
            ))
          )}
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
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
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

  formArea: {
    paddingHorizontal: 14,
    paddingTop: 4,
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

  dropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownPlaceholder: {
    fontSize: 16,
    color: "#5b8dd9",
  },
  dropdownSelected: {
    fontSize: 16,
    color: "#1a3a5c",
    fontWeight: "600",
  },
  dropdownArrow: {
    fontSize: 14,
    color: "#5b9fd4",
  },
  dropdownList: {
    backgroundColor: "#fff",
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#90c4f0",
    marginBottom: 14,
    overflow: "hidden",
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 14,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e8f3fc",
  },
  dropdownItemSelected: {
    backgroundColor: "#dce8f5",
  },
  dropdownItemImage: {
    width: 40,
    height: 40,
  },
  dropdownItemText: {
    fontSize: 15,
    color: "#1a3a5c",
    fontWeight: "500",
  },

  previewBox: {
    alignItems: "center",
    marginBottom: 14,
    backgroundColor: "#e8f3fc",
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#90c4f0",
    paddingVertical: 16,
  },
  previewImage: {
    width: 120,
    height: 120,
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
  emptyBox: {
    borderWidth: 1.5,
    borderColor: "#90c4f0",
    borderRadius: 14,
    backgroundColor: "#e8f3fc",
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  emptyText: {
    fontSize: 16,
    color: "#2563a8",
    fontWeight: "500",
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
