import React from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Product } from "../types/product";

export const CATEGORIES: { label: string; image: ImageSourcePropType }[] = [
  {
    label: "Edad antigua",
    image: require("../../assets/images/SoldadoRomano.png"),
  },
  {
    label: "Edad media",
    image: require("../../assets/images/SoldadoMedieval.png"),
  },
  {
    label: "Edad moderna",
    image: require("../../assets/images/SoldadoNapoleonico.png"),
  },
  {
    label: "Edad Contemporanea",
    image: require("../../assets/images/SoldadoContemporaneo.png"),
  },
  {
    label: "Fantasia",
    image: require("../../assets/images/SoldadoFantasia.png"),
  },
  {
    label: "ciencia ficcion Futurista",
    image: require("../../assets/images/SoldadoCienciaFiccion.png"),
  },
];

const FALLBACK: ImageSourcePropType = require("../../assets/images/icon.png");

export function getImageForCategory(category: string): ImageSourcePropType {
  return CATEGORIES.find((c) => c.label === category)?.image ?? FALLBACK;
}

interface Props {
  item: Product;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function ProductItem({ item, onToggle, onDelete }: Props) {
  const imageSource = getImageForCategory(item.category);

  return (
    <View style={styles.row}>
      <TouchableOpacity
        style={[styles.categoryBox, item.marked && styles.categoryBoxMarked]}
        onPress={() => onToggle(item.id)}
        activeOpacity={0.7}
      >
        <Text style={[styles.nameText, item.marked && styles.nameTextMarked]}>
          {item.name}
        </Text>
        <Text style={styles.categoryLabel}>{item.category}</Text>
        <Text style={styles.priceText}>{item.price.toFixed(2)} €</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onLongPress={() => onDelete(item.id)}
        activeOpacity={0.85}
        accessibilityLabel={`Mantén pulsado para eliminar ${item.name}`}
      >
        <View style={styles.imageBox}>
          <Image
            source={imageSource}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 10,
  },
  categoryBox: {
    flex: 1,
    backgroundColor: "#fef9c3",
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#d4b44a",
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  categoryBoxMarked: {
    backgroundColor: "#d1fae5",
    borderColor: "#34d399",
  },
  nameText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#3d2b00",
  },
  nameTextMarked: {
    textDecorationLine: "line-through",
    color: "#6b7280",
  },
  categoryLabel: {
    fontSize: 12,
    color: "#92400e",
    marginTop: 2,
  },
  priceText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#78350f",
    marginTop: 4,
  },
  imageBox: {
    width: 76,
    height: 76,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#bfdbfe",
    backgroundColor: "#eff6ff",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 70,
    height: 70,
  },
});
