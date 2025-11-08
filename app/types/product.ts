export type Product = {
  id: string;
  name: string;
  price: number;
  category: CategoryKey;
  marked: boolean;
};

export type CategoryKey =
  | "antigua"
  | "moderno"
  | "fantasia"
  | "historico"
  | "misc";
