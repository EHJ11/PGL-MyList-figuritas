import React, { useState } from "react";
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
  const [expanded, setExpanded] = useState(false);
  const imageSource = getImageForCategory(item.category);

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.row}
        onPress={() => setExpanded(!expanded)}
        activeOpacity={0.85}
      >
        <View style={[styles.infoBox, item.marked && styles.infoBoxMarked]}>
          <Text style={[styles.nameText, item.marked && styles.nameTextMarked]}>
            {item.name}
          </Text>
          <Text style={styles.categoryLabel}>{item.category}</Text>
          <Text style={styles.priceText}>{item.price.toFixed(2)} €</Text>
        </View>

        <View style={styles.imageBox}>
          <Image
            source={imageSource}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={styles.btnMark}
            onPress={() => {
              onToggle(item.id);
              setExpanded(false);
            }}
            activeOpacity={0.8}
          >
            <Text style={styles.btnMarkText}>
              {item.marked ? " Desmarcar" : " Marcar"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnDelete}
            onPress={() => onDelete(item.id)}
            activeOpacity={0.8}
          >
            <Text style={styles.btnDeleteText}> Eliminar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#d4b44a",
    marginBottom: 12,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    gap: 10,
  },
  infoBox: {
    flex: 1,
    backgroundColor: "#fef9c3",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  infoBoxMarked: {
    backgroundColor: "#d1fae5",
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
    width: 72,
    height: 72,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#bfdbfe",
    backgroundColor: "#eff6ff",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 66,
    height: 66,
  },
  actionsRow: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  btnMark: {
    flex: 1,
    backgroundColor: "#eff6ff",
    paddingVertical: 10,
    alignItems: "center",
    borderRightWidth: 1,
    borderRightColor: "#e5e7eb",
  },
  btnMarkText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1d4ed8",
  },
  btnDelete: {
    flex: 1,
    backgroundColor: "#fee2e2",
    paddingVertical: 10,
    alignItems: "center",
  },
  btnDeleteText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#b91c1c",
  },
});
