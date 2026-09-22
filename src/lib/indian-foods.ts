export type FoodCategory = "Breakfast" | "Everyday" | "Protein" | "Snack";

export interface IndianFood {
  name: string;
  serving: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  category: FoodCategory;
  emoji: string;
}

export const indianFoods: IndianFood[] = [
  { name: "Idli with sambar", serving: "2 idlis + 1 cup", calories: 290, protein: 10, carbs: 54, fat: 4, category: "Breakfast", emoji: "🥣" },
  { name: "Masala dosa", serving: "1 medium", calories: 390, protein: 9, carbs: 62, fat: 12, category: "Breakfast", emoji: "🫓" },
  { name: "Vegetable poha", serving: "1 bowl (250 g)", calories: 270, protein: 6, carbs: 45, fat: 8, category: "Breakfast", emoji: "🍋" },
  { name: "Vegetable upma", serving: "1 bowl (250 g)", calories: 285, protein: 8, carbs: 44, fat: 9, category: "Breakfast", emoji: "🥕" },
  { name: "Aloo paratha with curd", serving: "1 paratha + ½ cup", calories: 360, protein: 10, carbs: 52, fat: 13, category: "Breakfast", emoji: "🫓" },
  { name: "Dal tadka", serving: "1 cup", calories: 230, protein: 12, carbs: 34, fat: 6, category: "Everyday", emoji: "🥘" },
  { name: "Rajma chawal", serving: "1½ cups", calories: 430, protein: 15, carbs: 75, fat: 8, category: "Everyday", emoji: "🍛" },
  { name: "Chole with 2 rotis", serving: "1 cup + 2 rotis", calories: 470, protein: 18, carbs: 76, fat: 11, category: "Everyday", emoji: "🍲" },
  { name: "Vegetable khichdi", serving: "1½ cups", calories: 330, protein: 11, carbs: 58, fat: 7, category: "Everyday", emoji: "🍚" },
  { name: "Palak paneer", serving: "1 cup", calories: 320, protein: 18, carbs: 14, fat: 22, category: "Protein", emoji: "🥬" },
  { name: "Tandoori chicken", serving: "2 pieces (200 g)", calories: 340, protein: 48, carbs: 6, fat: 14, category: "Protein", emoji: "🍗" },
  { name: "Egg bhurji", serving: "2 eggs", calories: 240, protein: 15, carbs: 7, fat: 17, category: "Protein", emoji: "🍳" },
  { name: "Paneer tikka", serving: "150 g", calories: 330, protein: 23, carbs: 10, fat: 22, category: "Protein", emoji: "🧀" },
  { name: "Roasted chana", serving: "½ cup (50 g)", calories: 180, protein: 10, carbs: 29, fat: 3, category: "Snack", emoji: "🫘" },
  { name: "Dhokla", serving: "4 pieces", calories: 220, protein: 9, carbs: 36, fat: 5, category: "Snack", emoji: "🟨" },
  { name: "Samosa", serving: "1 medium", calories: 260, protein: 5, carbs: 32, fat: 13, category: "Snack", emoji: "🥟" },
];

export const foodCategories = ["All", "Breakfast", "Everyday", "Protein", "Snack"] as const;