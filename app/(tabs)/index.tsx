import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
};

type Screen = "home" | "add" | "list";

export default function Index() {
  const [products, setProducts] = useState<Product[]>([]);
  const [screen, setScreen] = useState<Screen>("home");

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const handleAddProduct = () => {
    if (!name || !price || !category) return;

    const newProduct: Product = {
      id: Date.now(),
      name,
      price: parseFloat(price),
      category,
    };

    setProducts([...products, newProduct]);

    setName("");
    setPrice("");
    setCategory("");
    setScreen("list");
  };

  const totalProductos = products.length;
  const totalPrecio = products.reduce((acc, p) => acc + p.price, 0);

  return (
    <SafeAreaView style={styles.container}>
      {screen === "home" && (
        <View style={styles.inner}>
          <Text style={styles.title}>Figuras de plomo.es</Text>

          {products.length === 0 ? (
            <Text style={styles.emptyText}>No hay productos creados</Text>
          ) : (
            <FlatList
              data={products}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.productItem}>
                  <Text style={styles.productName}>{item.name}</Text>
                  <Text>{item.category}</Text>
                  <Text style={styles.productPrice}>
                    €{item.price.toFixed(2)}
                  </Text>
                </View>
              )}
            />
          )}

          <TouchableOpacity
            style={styles.buttonPrimary}
            onPress={() => setScreen("add")}
          >
            <Text style={styles.buttonText}>Añadir producto</Text>
          </TouchableOpacity>
        </View>
      )}

      {screen === "add" && (
        <View style={styles.inner}>
          <Text style={styles.title}>Añadir Figura</Text>

          <TextInput
            style={styles.input}
            placeholder="Nombre del producto"
            value={name}
            onChangeText={setName}
          />

          <TextInput
            style={styles.input}
            placeholder="Precio (€)"
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

          <TouchableOpacity
            style={styles.buttonSave}
            onPress={handleAddProduct}
          >
            <Text style={styles.buttonText}>Guardar el progreso</Text>
          </TouchableOpacity>
        </View>
      )}

      {screen === "list" && (
        <View style={styles.inner}>
          <Text style={styles.title}>Productos seleccionados</Text>

          <FlatList
            data={products}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.productItem}>
                <View>
                  <Text style={styles.productName}>{item.name}</Text>
                  <Text>{item.category}</Text>
                </View>
                <Text style={styles.productPrice}>
                  €{item.price.toFixed(2)}
                </Text>
              </View>
            )}
          />

          <View style={styles.footer}>
            <Text style={styles.totalText}>
              Total de productos: {totalProductos}
            </Text>
            <Text style={styles.totalText}>
              Precio total: €{totalPrecio.toFixed(2)}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.buttonPrimary}
            onPress={() => setScreen("home")}
          >
            <Text style={styles.buttonText}>Volver al inicio</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  inner: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#007AFF",
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  buttonPrimary: {
    backgroundColor: "#007AFF",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonSave: {
    backgroundColor: "#FFCC00",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  productItem: {
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#eee",
  },
  productName: {
    fontSize: 16,
    fontWeight: "500",
  },
  productPrice: {
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "bold",
  },
  footer: {
    marginTop: 20,
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },
  totalText: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
});
// import { registerRootComponent } from "expo";
// import MainScreen from "PGL-MYLIST-FIGURITAS/screens/MainScreen";
// import React from "react";

// export default function Index() {
//   return <MainScreen />;
// }

// registerRootComponent(Index);
