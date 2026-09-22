# CalorieAI — Calculator-First Build Plan

## Goal
Build the first polished release as a responsive calorie calculator with clear results and an Indian food calorie reference. Accounts, saved history, dashboards, and AI food logging remain outside this release.

## Experience
- Replace the blank page with the working calculator immediately; no marketing-only landing screen.
- Use an original soft-clay wellness theme: warm ivory base, leafy green, coral accent, tactile inset/raised surfaces, restrained shadows, and friendly rounded forms.
- Keep the calculator easy for fitness beginners, students, gym users, and weight-management users.
- Add a compact header, prominent calculator workspace, results panel, Indian food reference, and health disclaimer.
- Make the whole experience comfortable on mobile and desktop with clear focus, validation, and reduced-motion support.

## Calculator
- Collect age, gender, height in cm, weight in kg, activity level, and goal.
- Validate realistic ranges and show field-specific messages.
- Calculate BMR using the PRD’s Mifflin–St Jeor formulas.
- Calculate TDEE using the documented activity multipliers.
- Calculate BMI and display its standard category.
- Apply the PRD goal adjustments: calorie deficit for weight loss, maintenance unchanged, and calorie surplus for weight gain.
- Estimate daily protein, carbohydrates, and fat targets, keeping the calorie math internally consistent.
- Present calories, BMR, TDEE, BMI, and macros in a scannable result view with progress-style visuals.

## Indian Food Reference
- Add a searchable/filterable list of familiar Indian foods with serving sizes, estimated calories, protein, carbohydrates, and fat.
- Include a balanced mix of breakfast foods, breads, rice dishes, dals, curries, snacks, and everyday meals.
- Clearly label values as estimates because recipes and serving sizes vary.
- Let users compare foods without requiring an account or saving data.

## Originality and Inspiration
- Borrow only the reference product’s low-friction hierarchy and emphasis on immediate answers.
- Do not copy its branding, wording, page composition, or visual identity.
- Reserve natural-language AI logging and nutrition coaching for the later PRD phase.

## Technical Details
- Keep the existing TanStack Start architecture and implement the experience at `/`.
- Define the full visual system with semantic OKLCH tokens in the global stylesheet; avoid ad hoc component colors.
- Keep calculations in pure typed utilities so formulas can be tested independently.
- Add route-specific metadata for CalorieAI.
- Verify calculator outcomes, validation, food search/filtering, and layout at desktop and mobile sizes.

## Not Included Yet
- Sign-up/login, saved profiles, database storage, dashboard, food diary CRUD, weight history, AI logging, assistant, photo recognition, and barcode scanning.
