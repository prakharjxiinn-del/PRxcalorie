export type Gender = "male" | "female";
export type ActivityLevel = "sedentary" | "light" | "moderate" | "very" | "extreme";
export type Goal = "lose" | "maintain" | "gain";

export interface CalculatorInput {
  age: number;
  gender: Gender;
  height: number;
  weight: number;
  activity: ActivityLevel;
  goal: Goal;
}

export interface CalculatorResult {
  bmr: number;
  tdee: number;
  target: number;
  bmi: number;
  bmiCategory: string;
  protein: number;
  carbs: number;
  fat: number;
}

export const activityMultipliers: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  very: 1.725,
  extreme: 1.9,
};

const goalAdjustments: Record<Goal, number> = {
  lose: -500,
  maintain: 0,
  gain: 300,
};

function getBmiCategory(bmi: number) {
  if (bmi < 18.5) return "Below healthy range";
  if (bmi < 25) return "Healthy range";
  if (bmi < 30) return "Above healthy range";
  return "High range";
}

export function calculateCalories(input: CalculatorInput): CalculatorResult {
  const genderAdjustment = input.gender === "male" ? 5 : -161;
  const bmr = 10 * input.weight + 6.25 * input.height - 5 * input.age + genderAdjustment;
  const tdee = bmr * activityMultipliers[input.activity];
  const target = Math.max(1200, tdee + goalAdjustments[input.goal]);
  const bmi = input.weight / (input.height / 100) ** 2;

  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    target: Math.round(target),
    bmi: Math.round(bmi * 10) / 10,
    bmiCategory: getBmiCategory(bmi),
    protein: Math.round((target * 0.3) / 4),
    carbs: Math.round((target * 0.4) / 4),
    fat: Math.round((target * 0.3) / 9),
  };
}