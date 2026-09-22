import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, Calculator, ChevronRight, HeartPulse, Leaf, Search, Sparkles } from "lucide-react";
import { useMemo, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { calculateCalories, type ActivityLevel, type CalculatorResult, type Gender, type Goal } from "@/lib/calorie-calculations";
import { foodCategories, indianFoods, type FoodCategory } from "@/lib/indian-foods";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CalorieAI — Daily Calorie & Macro Calculator" },
      { name: "description", content: "Calculate your daily calorie and macro targets, then explore estimated nutrition for familiar Indian foods." },
      { property: "og:title", content: "CalorieAI — Daily Calorie & Macro Calculator" },
      { property: "og:description", content: "A simple calorie calculator and Indian food nutrition guide." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type FormValues = { age: string; height: string; weight: string; gender: Gender; activity: ActivityLevel; goal: Goal };
type NumberField = "age" | "height" | "weight";

const initialValues: FormValues = { age: "28", height: "170", weight: "68", gender: "male", activity: "moderate", goal: "maintain" };
const activityOptions: { value: ActivityLevel; label: string; detail: string }[] = [
  { value: "sedentary", label: "Sedentary", detail: "Little exercise" },
  { value: "light", label: "Lightly active", detail: "1–3 days/week" },
  { value: "moderate", label: "Moderately active", detail: "3–5 days/week" },
  { value: "very", label: "Very active", detail: "6–7 days/week" },
  { value: "extreme", label: "Extremely active", detail: "Hard daily training" },
];
const goals: { value: Goal; label: string; detail: string }[] = [
  { value: "lose", label: "Lose", detail: "−500 kcal" },
  { value: "maintain", label: "Maintain", detail: "Balanced" },
  { value: "gain", label: "Gain", detail: "+300 kcal" },
];

function Index() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Partial<Record<NumberField, string>>>({});
  const [result, setResult] = useState<CalculatorResult | null>(null);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof foodCategories)[number]>("All");
  const resultRef = useRef<HTMLDivElement>(null);

  const filteredFoods = useMemo(() => indianFoods.filter((food) => {
    const matchesCategory = category === "All" || food.category === category;
    const matchesQuery = food.name.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  }), [category, query]);

  const updateNumber = (field: NumberField, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const age = Number(values.age);
    const height = Number(values.height);
    const weight = Number(values.weight);
    const nextErrors: Partial<Record<NumberField, string>> = {};
    if (!Number.isFinite(age) || age < 15 || age > 100) nextErrors.age = "Enter an age from 15 to 100";
    if (!Number.isFinite(height) || height < 120 || height > 230) nextErrors.height = "Enter a height from 120 to 230 cm";
    if (!Number.isFinite(weight) || weight < 30 || weight > 300) nextErrors.weight = "Enter a weight from 30 to 300 kg";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setResult(calculateCalories({ age, height, weight, gender: values.gender, activity: values.activity, goal: values.goal }));
    window.setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6 sm:px-8 lg:px-12">
        <a href="#top" className="flex items-center gap-3" aria-label="CalorieAI home">
          <span className="clay-icon flex size-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground"><Leaf className="size-5" /></span>
          <span className="font-display text-xl font-bold">Calorie<span className="text-accent">AI</span></span>
        </a>
        <nav className="hidden items-center gap-7 text-sm font-semibold text-muted-foreground sm:flex" aria-label="Page sections">
          <a className="transition-colors hover:text-foreground" href="#calculator">Calculator</a>
          <a className="transition-colors hover:text-foreground" href="#foods">Indian foods</a>
        </nav>
        <Button asChild size="lg" className="clay-button rounded-2xl px-5"><a href="#calculator">Start now <ChevronRight /></a></Button>
      </header>

      <section id="top" className="mx-auto grid max-w-7xl gap-10 px-5 pb-14 pt-8 sm:px-8 lg:grid-cols-[1.05fr_.95fr] lg:px-12 lg:pb-20 lg:pt-14">
        <div className="flex flex-col justify-center">
          <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full bg-secondary px-4 py-2 text-xs font-bold uppercase text-secondary-foreground shadow-sm"><Sparkles className="size-4 text-accent" /> Made for Indian plates</div>
          <h1 className="font-display max-w-3xl text-5xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl">Your daily nutrition, made <span className="text-primary">simple.</span></h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">Find a practical calorie target in under a minute, understand your macros, and compare foods you actually eat.</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button asChild size="lg" className="clay-button h-13 rounded-2xl px-7 text-base"><a href="#calculator"><Calculator /> Calculate my calories</a></Button>
            <a href="#foods" className="inline-flex items-center gap-2 text-sm font-bold text-foreground">Browse Indian foods <ArrowDown className="size-4" /></a>
          </div>
          <div className="mt-10 grid max-w-xl grid-cols-3 gap-3 border-t border-border pt-6">
            {[['2 min', 'to calculate'], ['16 foods', 'quick reference'], ['100%', 'free to use']].map(([number, label]) => <div key={label}><p className="font-display text-xl font-bold">{number}</p><p className="mt-1 text-xs text-muted-foreground">{label}</p></div>)}
          </div>
        </div>
        <div className="relative flex items-center justify-center py-4">
          <div className="clay-hero relative aspect-square w-full max-w-[530px] rounded-[3rem] bg-secondary p-6 sm:p-10">
            <div className="absolute left-[8%] top-[10%] flex size-24 rotate-[-8deg] items-center justify-center rounded-[2rem] bg-accent-soft text-5xl shadow-clay">🥭</div>
            <div className="absolute right-[7%] top-[18%] flex size-28 rotate-[7deg] items-center justify-center rounded-[2.2rem] bg-leaf-soft text-6xl shadow-clay">🥗</div>
            <div className="absolute bottom-[9%] left-[14%] flex size-28 rotate-[5deg] items-center justify-center rounded-[2.2rem] bg-sun-soft text-6xl shadow-clay">🍛</div>
            <div className="clay-card absolute bottom-[14%] right-[8%] w-52 rounded-3xl bg-card p-5 shadow-clay">
              <p className="text-xs font-bold uppercase text-muted-foreground">Daily target</p><p className="font-display mt-1 text-4xl font-bold">2,180</p><p className="text-sm text-muted-foreground">kcal per day</p>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted"><div className="h-full w-3/4 rounded-full bg-primary" /></div>
            </div>
            <div className="absolute left-[39%] top-[39%] flex size-24 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-clay"><HeartPulse className="size-10" /></div>
          </div>
        </div>
      </section>

      <section id="calculator" className="bg-section py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="mb-10 max-w-2xl"><p className="section-label">Personal estimate</p><h2 className="font-display mt-3 text-4xl font-bold sm:text-5xl">Calculate your daily target</h2><p className="mt-4 text-muted-foreground">Six quick details. One clear starting point.</p></div>
          <div className="grid items-start gap-8 lg:grid-cols-[1.05fr_.95fr]">
            <form onSubmit={handleSubmit} className="clay-card rounded-[2rem] bg-card p-5 shadow-clay sm:p-8" noValidate>
              <div className="grid gap-5 sm:grid-cols-3">
                <NumberInput id="age" label="Age" suffix="years" value={values.age} error={errors.age} onChange={(value) => updateNumber("age", value)} />
                <NumberInput id="height" label="Height" suffix="cm" value={values.height} error={errors.height} onChange={(value) => updateNumber("height", value)} />
                <NumberInput id="weight" label="Weight" suffix="kg" value={values.weight} error={errors.weight} onChange={(value) => updateNumber("weight", value)} />
              </div>
              <fieldset className="mt-7"><legend className="mb-3 text-sm font-bold">Gender</legend><div className="grid grid-cols-2 gap-3">{([['male','Male'],['female','Female']] as const).map(([value,label]) => <Choice key={value} active={values.gender === value} onClick={() => setValues((current) => ({...current, gender: value}))} label={label} />)}</div></fieldset>
              <div className="mt-7"><Label htmlFor="activity" className="font-bold">Activity level</Label><select id="activity" value={values.activity} onChange={(event) => setValues((current) => ({...current, activity: event.target.value as ActivityLevel}))} className="clay-input mt-3 h-14 w-full rounded-2xl border border-input bg-background px-4 text-sm font-semibold outline-none focus:ring-2 focus:ring-ring">{activityOptions.map((item) => <option key={item.value} value={item.value}>{item.label} — {item.detail}</option>)}</select></div>
              <fieldset className="mt-7"><legend className="mb-3 text-sm font-bold">Your goal</legend><div className="grid grid-cols-3 gap-3">{goals.map((goal) => <Choice key={goal.value} active={values.goal === goal.value} onClick={() => setValues((current) => ({...current, goal: goal.value}))} label={goal.label} detail={goal.detail} />)}</div></fieldset>
              <Button type="submit" size="lg" className="clay-button mt-8 h-14 w-full rounded-2xl text-base"><Sparkles /> Show my target</Button>
            </form>

            <div ref={resultRef} aria-live="polite">
              {result ? <ResultPanel result={result} /> : <div className="clay-card flex min-h-[530px] flex-col items-center justify-center rounded-[2rem] bg-card p-8 text-center shadow-clay"><span className="clay-icon flex size-20 items-center justify-center rounded-[2rem] bg-leaf-soft text-primary"><Calculator className="size-9" /></span><h3 className="font-display mt-6 text-3xl font-bold">Your result will appear here</h3><p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">Fill in your details to see daily calories, BMI, energy needs, and macro targets.</p></div>}
            </div>
          </div>
        </div>
      </section>

      <section id="foods" className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><p className="section-label">Everyday choices</p><h2 className="font-display mt-3 text-4xl font-bold sm:text-5xl">Indian food guide</h2><p className="mt-4 text-muted-foreground">Useful estimates for familiar servings.</p></div><div className="relative w-full sm:max-w-xs"><Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input aria-label="Search Indian foods" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search dosa, dal, paneer…" className="clay-input h-12 rounded-2xl pl-11" /></div></div>
          <div className="mt-8 flex gap-2 overflow-x-auto pb-2">{foodCategories.map((item) => <Button key={item} type="button" variant={category === item ? "default" : "secondary"} onClick={() => setCategory(item)} className="rounded-full shadow-none">{item}</Button>)}</div>
          {filteredFoods.length ? <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{filteredFoods.map((food) => <FoodCard key={food.name} food={food} />)}</div> : <div className="mt-8 rounded-2xl bg-muted p-10 text-center"><p className="font-bold">No matching foods</p><p className="mt-1 text-sm text-muted-foreground">Try another name or category.</p></div>}
          <p className="mt-6 text-xs leading-5 text-muted-foreground">Food values are general estimates. Ingredients, cooking oil, recipe, and serving size can change nutrition significantly.</p>
        </div>
      </section>

      <footer className="border-t border-border py-8"><div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12"><div className="flex items-center gap-2 font-bold text-foreground"><Leaf className="size-4 text-primary" /> CalorieAI</div><p>Nutrition estimates for general information only—not medical advice.</p></div></footer>
    </main>
  );
}

function NumberInput({ id, label, suffix, value, error, onChange }: { id: NumberField; label: string; suffix: string; value: string; error?: string; onChange: (value: string) => void }) {
  return <div><Label htmlFor={id} className="font-bold">{label}</Label><div className="relative mt-3"><Input id={id} type="number" inputMode="decimal" value={value} onChange={(event) => onChange(event.target.value)} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} className="clay-input h-14 rounded-2xl pr-14 text-base font-bold" /><span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-muted-foreground">{suffix}</span></div>{error && <p id={`${id}-error`} className="mt-2 text-xs font-semibold text-destructive">{error}</p>}</div>;
}

function Choice({ active, onClick, label, detail }: { active: boolean; onClick: () => void; label: string; detail?: string }) {
  return <Button type="button" variant="secondary" onClick={onClick} aria-pressed={active} className={cn("h-16 min-w-0 flex-col rounded-2xl border px-2 shadow-none", active ? "border-primary bg-primary text-primary-foreground hover:bg-primary/90" : "border-transparent bg-muted hover:bg-secondary")}><span className="font-bold">{label}</span>{detail && <span className={cn("text-[11px]", active ? "text-primary-foreground/75" : "text-muted-foreground")}>{detail}</span>}</Button>;
}

function ResultPanel({ result }: { result: CalculatorResult }) {
  return <div className="clay-card overflow-hidden rounded-[2rem] bg-card shadow-clay"><div className="bg-primary p-7 text-primary-foreground sm:p-9"><p className="text-sm font-semibold text-primary-foreground/75">Your daily calorie target</p><div className="mt-2 flex items-end gap-2"><strong className="font-display text-6xl leading-none">{result.target.toLocaleString("en-IN")}</strong><span className="pb-1 text-sm font-bold">kcal/day</span></div><p className="mt-5 max-w-md text-sm leading-6 text-primary-foreground/75">A practical daily estimate based on your body, activity, and goal.</p></div><div className="p-6 sm:p-8"><div className="grid grid-cols-3 gap-3">{[[result.bmr,'BMR'],[result.tdee,'TDEE'],[result.bmi,'BMI']].map(([value,label]) => <div key={label} className="rounded-2xl bg-muted p-4"><p className="font-display text-2xl font-bold">{value}</p><p className="mt-1 text-xs font-semibold text-muted-foreground">{label}</p></div>)}</div><div className="mt-7"><div className="flex items-center justify-between"><h3 className="font-display text-xl font-bold">Daily macros</h3><span className="text-xs text-muted-foreground">30 / 40 / 30 split</span></div><div className="mt-5 space-y-5"><Macro label="Protein" grams={result.protein} percent={30} color="bg-accent" /><Macro label="Carbohydrates" grams={result.carbs} percent={40} color="bg-primary" /><Macro label="Fat" grams={result.fat} percent={30} color="bg-sun" /></div></div><div className="mt-7 rounded-2xl bg-leaf-soft p-4 text-sm"><strong>BMI: {result.bmiCategory}.</strong><span className="text-muted-foreground"> BMI is a general screening measure, not a diagnosis.</span></div></div></div>;
}

function Macro({ label, grams, percent, color }: { label: string; grams: number; percent: number; color: string }) {
  return <div><div className="mb-2 flex justify-between text-sm"><span className="font-semibold">{label}</span><strong>{grams} g</strong></div><div className="h-2.5 overflow-hidden rounded-full bg-muted"><div className={cn("h-full rounded-full", color)} style={{ width: `${percent * 2}%` }} /></div></div>;
}

function FoodCard({ food }: { food: { name: string; serving: string; calories: number; protein: number; carbs: number; fat: number; category: FoodCategory; emoji: string } }) {
  return <article className="clay-card group rounded-3xl bg-card p-5 shadow-clay transition-transform hover:-translate-y-1"><div className="flex items-start justify-between"><span className="flex size-14 items-center justify-center rounded-2xl bg-secondary text-3xl">{food.emoji}</span><span className="rounded-full bg-muted px-3 py-1 text-[11px] font-bold text-muted-foreground">{food.category}</span></div><h3 className="mt-5 min-h-12 font-display text-lg font-bold leading-6">{food.name}</h3><p className="text-xs text-muted-foreground">{food.serving}</p><div className="mt-5 flex items-end justify-between border-t border-border pt-4"><div><strong className="font-display text-2xl">{food.calories}</strong><span className="ml-1 text-xs text-muted-foreground">kcal</span></div><p className="text-right text-[11px] leading-4 text-muted-foreground">P {food.protein}g · C {food.carbs}g<br />F {food.fat}g</p></div></article>;
}
