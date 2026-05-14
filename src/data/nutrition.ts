export interface MealOption {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber: number;
  ingredients: string[];
  prepTime: number;
  instructions?: string[];
  tags: string[];
}

export interface MealSlot {
  category: 'Breakfast' | 'Snack 1' | 'Lunch' | 'Snack 2' | 'Dinner';
  timing: string;
  options: MealOption[];
}

export interface NutritionPlan {
  id: string;
  name: string;
  goal: string;
  description: string;
  targetCalories: string;
  macroSplit: { protein: string; carbs: string; fats: string };
  slots: MealSlot[];
  tips: string[];
}

export const nutritionPlans: NutritionPlan[] = [
  {
    id: 'bulking',
    name: 'Mass Builder',
    goal: 'Muscle Gain',
    targetCalories: '~3500-4000 kcal',
    macroSplit: { protein: '25-30%', carbs: '45-50%', fats: '25-30%' },
    description: 'High-calorie, high-protein plan designed to support muscle growth and strength gains with a controlled calorie surplus of ~500 above maintenance.',
    tips: [
      'Eat in a 300-500 calorie surplus for lean gains',
      'Prioritize protein at every meal - aim for 1.6-2.2g per kg bodyweight',
      'Time carbs around workouts for optimal performance',
      'Dont skip meals - consistency is key for mass gaining',
      'Weigh yourself weekly and adjust calories if not gaining 0.25-0.5kg per week'
    ],
    slots: [
      {
        category: 'Breakfast',
        timing: '7:00 AM',
        options: [
          {
            id: 'bulk-b1',
            name: 'Mass Gainer Oatmeal',
            calories: 820,
            protein: 48,
            carbs: 98,
            fats: 24,
            fiber: 10,
            prepTime: 10,
            tags: ['High protein', 'Quick'],
            ingredients: ['Rolled oats 100g', 'Whey protein 1.5 scoops', 'Peanut butter 2 tbsp', 'Banana 1 large', 'Honey 1 tbsp', 'Whole milk 300ml', 'Chia seeds 1 tbsp'],
            instructions: ['Cook oats in milk until creamy', 'Stir in protein powder off heat', 'Top with sliced banana, peanut butter, and honey', 'Sprinkle chia seeds']
          },
          {
            id: 'bulk-b2',
            name: 'Steak & Eggs Power Breakfast',
            calories: 920,
            protein: 65,
            carbs: 42,
            fats: 52,
            fiber: 4,
            prepTime: 15,
            tags: ['High protein', 'Keto-friendly'],
            ingredients: ['Ribeye steak 200g', 'Whole eggs 3 large', 'Egg whites 3', 'Oatmeal 80g cooked', 'Butter 1 tsp', 'Orange juice 250ml', 'Spinach 100g'],
            instructions: ['Season and pan-sear steak to preference', 'Scramble eggs and egg whites in butter', 'Serve with cooked oatmeal and spinach', 'Fresh orange juice on the side']
          },
          {
            id: 'bulk-b3',
            name: 'Protein Pancake Stack',
            calories: 780,
            protein: 45,
            carbs: 88,
            fats: 26,
            fiber: 6,
            prepTime: 20,
            tags: ['High protein', 'Weekend treat'],
            ingredients: ['Protein pancake mix 150g', 'Whey protein 1 scoop', 'Whole milk 200ml', 'Eggs 2', 'Maple syrup 2 tbsp', 'Greek yogurt 100g', 'Mixed berries 100g', 'Butter for cooking'],
            instructions: ['Mix pancake batter with protein, milk, and eggs', 'Cook on buttered griddle until golden', 'Stack and top with yogurt, berries, and syrup']
          }
        ]
      },
      {
        category: 'Snack 1',
        timing: '10:00 AM',
        options: [
          {
            id: 'bulk-s1',
            name: 'PB Banana Protein Shake',
            calories: 520,
            protein: 35,
            carbs: 48,
            fats: 20,
            fiber: 4,
            prepTime: 3,
            tags: ['Quick', 'Liquid calories'],
            ingredients: ['Whey protein 1.5 scoops', 'Peanut butter 1.5 tbsp', 'Banana 1 medium', 'Oats 40g', 'Whole milk 400ml', 'Honey 1 tbsp', 'Ice cubes'],
            instructions: ['Blend all ingredients until smooth', 'Add ice for thickness', 'Drink immediately']
          },
          {
            id: 'bulk-s2',
            name: 'Greek Yogurt Power Bowl',
            calories: 480,
            protein: 32,
            carbs: 42,
            fats: 22,
            fiber: 3,
            prepTime: 5,
            tags: ['High protein', 'No cook'],
            ingredients: ['Greek yogurt 300g', 'Granola 80g', 'Mixed nuts 30g', 'Honey 1 tbsp', 'Blueberries 100g', 'Protein powder 1/2 scoop mixed in'],
            instructions: ['Mix protein powder into yogurt', 'Top with granola, nuts, and berries', 'Drizzle with honey']
          },
          {
            id: 'bulk-s3',
            name: 'Turkey & Cheese Roll-Ups',
            calories: 450,
            protein: 38,
            carbs: 12,
            fats: 28,
            fiber: 1,
            prepTime: 5,
            tags: ['Low carb', 'Quick'],
            ingredients: ['Sliced turkey breast 150g', 'Cheddar cheese 60g', 'Whole wheat tortillas 2 small', 'Mustard 1 tbsp', 'Lettuce and tomato'],
            instructions: ['Lay out tortillas', 'Layer turkey, cheese, lettuce, tomato, mustard', 'Roll tightly and slice in half']
          }
        ]
      },
      {
        category: 'Lunch',
        timing: '1:00 PM',
        options: [
          {
            id: 'bulk-l1',
            name: 'Chicken Rice Bowl',
            calories: 780,
            protein: 58,
            carbs: 82,
            fats: 24,
            fiber: 6,
            prepTime: 20,
            tags: ['Meal prep friendly', 'High protein'],
            ingredients: ['Chicken breast 250g', 'White rice 200g cooked', 'Broccoli 150g', 'Olive oil 1 tbsp', 'Soy sauce 1 tbsp', 'Sesame seeds', 'Mixed vegetables 100g', 'Teriyaki sauce 1 tbsp'],
            instructions: ['Dice and season chicken, pan-fry until golden', 'Steam broccoli and mixed vegetables', 'Serve over cooked rice', 'Drizzle with sauces and sprinkle sesame seeds']
          },
          {
            id: 'bulk-l2',
            name: 'Salmon & Sweet Potato',
            calories: 820,
            protein: 52,
            carbs: 72,
            fats: 38,
            fiber: 8,
            prepTime: 25,
            tags: ['Omega-3 rich', 'Healthy fats'],
            ingredients: ['Salmon fillet 250g', 'Sweet potato 300g', 'Asparagus 150g', 'Olive oil 1.5 tbsp', 'Lemon juice', 'Garlic 2 cloves', 'Mixed green salad', 'Avocado 1/2'],
            instructions: ['Bake salmon with lemon, garlic, and olive oil at 200C for 15 min', 'Roast cubed sweet potato with seasoning', 'Steam asparagus', 'Serve with side salad and sliced avocado']
          },
          {
            id: 'bulk-l3',
            name: 'Beef Burrito Bowl',
            calories: 850,
            protein: 55,
            carbs: 78,
            fats: 35,
            fiber: 12,
            prepTime: 20,
            tags: ['Flavorful', 'Meal prep'],
            ingredients: ['Ground beef (90% lean) 250g', 'Rice 200g cooked', 'Black beans 100g', 'Corn 80g', 'Cheese 40g', 'Salsa 3 tbsp', 'Guacamole 3 tbsp', 'Sour cream 2 tbsp', 'Lettuce and tomato'],
            instructions: ['Brown ground beef with taco seasoning', 'Assemble bowl: rice, beef, beans, corn', 'Top with cheese, salsa, guac, sour cream', 'Add fresh lettuce and tomato']
          }
        ]
      },
      {
        category: 'Snack 2',
        timing: '4:00 PM',
        options: [
          {
            id: 'bulk-s4',
            name: 'Protein Shake & Rice Cakes',
            calories: 480,
            protein: 42,
            carbs: 48,
            fats: 12,
            fiber: 2,
            prepTime: 3,
            tags: ['Pre-workout', 'Quick'],
            ingredients: ['Whey protein 1.5 scoops', 'Rice cakes 4', 'Peanut butter 2 tbsp', 'Milk 400ml', 'Honey 1 tbsp'],
            instructions: ['Blend protein with milk and honey', 'Spread peanut butter on rice cakes', 'Enjoy shake with rice cakes']
          },
          {
            id: 'bulk-s5',
            name: 'Tuna Avocado Wrap',
            calories: 520,
            protein: 45,
            carbs: 32,
            fats: 24,
            fiber: 8,
            prepTime: 10,
            tags: ['Omega-3', 'No cook'],
            ingredients: ['Canned tuna in water 200g', 'Whole wheat wrap 1 large', 'Avocado 1 whole', 'Spinach handful', 'Tomato sliced', 'Red onion 1/4', 'Light mayo 1 tbsp', 'Lemon juice'],
            instructions: ['Mix tuna with mayo and lemon juice', 'Mash avocado onto wrap', 'Layer spinach, tomato, onion, and tuna', 'Roll tightly and enjoy']
          },
          {
            id: 'bulk-s6',
            name: 'Cottage Cheese & Fruit Bowl',
            calories: 420,
            protein: 38,
            carbs: 38,
            fats: 14,
            fiber: 3,
            prepTime: 3,
            tags: ['Casein protein', 'Before bed option'],
            ingredients: ['Full-fat cottage cheese 250g', 'Pineapple chunks 150g', 'Almonds 20g', 'Honey 1 tbsp', 'Cinnamon sprinkle'],
            instructions: ['Scoop cottage cheese into bowl', 'Top with pineapple and almonds', 'Drizzle honey and sprinkle cinnamon']
          }
        ]
      },
      {
        category: 'Dinner',
        timing: '7:00 PM',
        options: [
          {
            id: 'bulk-d1',
            name: 'Pasta Bolognese Feast',
            calories: 880,
            protein: 62,
            carbs: 92,
            fats: 30,
            fiber: 8,
            prepTime: 25,
            tags: ['Comfort food', 'High protein'],
            ingredients: ['Ground beef (85% lean) 250g', 'Pasta 120g dry', 'Marinara sauce 200g', 'Parmesan 30g', 'Olive oil 1 tbsp', 'Side salad with dressing', 'Garlic bread 1 slice', 'Onion, garlic, herbs'],
            instructions: ['Brown beef with onion, garlic, and herbs', 'Add marinara and simmer 15 min', 'Cook pasta al dente', 'Serve topped with parmesan, side salad, and garlic bread']
          },
          {
            id: 'bulk-d2',
            name: 'Ribeye & Roasted Potatoes',
            calories: 950,
            protein: 65,
            carbs: 58,
            fats: 52,
            fiber: 5,
            prepTime: 30,
            tags: ['High protein', 'Satisfying'],
            ingredients: ['Ribeye steak 300g', 'Roasted potatoes 250g', 'Green beans 150g', 'Butter 1 tbsp', 'Mushrooms 100g', 'Red wine sauce 2 tbsp', 'Side salad'],
            instructions: ['Season and pan-sear ribeye to preference, rest 5 min', 'Roast potatoes with herbs and olive oil', 'Sauté mushrooms in butter', 'Steam green beans', 'Serve with red wine sauce']
          },
          {
            id: 'bulk-d3',
            name: 'Chicken Stir-Fry with Noodles',
            calories: 820,
            protein: 55,
            carbs: 85,
            fats: 28,
            fiber: 6,
            prepTime: 20,
            tags: ['Quick', 'Flavorful'],
            ingredients: ['Chicken thigh fillets 250g', 'Egg noodles 150g', 'Mixed stir-fry vegetables 200g', 'Soy sauce 2 tbsp', 'Oyster sauce 1 tbsp', 'Sesame oil 1 tsp', 'Cashews 30g', 'Ginger and garlic'],
            instructions: ['Slice chicken and stir-fry with ginger and garlic', 'Add vegetables and cook until tender-crisp', 'Add cooked noodles and sauces', 'Toss together, top with cashews']
          }
        ]
      }
    ]
  },
  {
    id: 'cutting',
    name: 'Shred Protocol',
    goal: 'Fat Loss',
    targetCalories: '~1800-2200 kcal',
    macroSplit: { protein: '35-40%', carbs: '30-35%', fats: '25-30%' },
    description: 'High-protein, moderate-carb, controlled-fat plan for aggressive fat loss while preserving every ounce of muscle. Calorie deficit of ~500.',
    tips: [
      'High protein preserves muscle mass in a deficit - prioritize it',
      'Eat plenty of vegetables for volume and satiety',
      'Drink 3-4 liters of water daily to manage hunger',
      'Time most carbs around your workout',
      'Consider intermittent fasting (16:8) to control hunger'
    ],
    slots: [
      {
        category: 'Breakfast',
        timing: '7:00 AM',
        options: [
          {
            id: 'cut-b1',
            name: 'Egg White Scramble',
            calories: 260,
            protein: 35,
            carbs: 8,
            fats: 10,
            fiber: 2,
            prepTime: 10,
            tags: ['High protein', 'Low carb'],
            ingredients: ['Egg whites 6 large', 'Whole egg 1', 'Spinach 100g', 'Mushrooms 80g', 'Cooking spray', 'Salt, pepper, hot sauce', 'Turkey bacon 2 slices'],
            instructions: ['Scramble egg whites and whole egg together', 'Sauté mushrooms and spinach in cooking spray', 'Cook turkey bacon until crispy', 'Combine and season']
          },
          {
            id: 'cut-b2',
            name: 'Protein Smoothie Bowl',
            calories: 290,
            protein: 38,
            carbs: 24,
            fats: 6,
            fiber: 6,
            prepTime: 5,
            tags: ['Quick', 'Refreshing'],
            ingredients: ['Whey protein 1 scoop', 'Frozen mixed berries 150g', 'Unsweetened almond milk 200ml', 'Chia seeds 1 tbsp', 'Ice cubes', 'Stevia if needed'],
            instructions: ['Blend protein, berries, almond milk, and ice', 'Pour into bowl', 'Top with chia seeds and extra berries']
          },
          {
            id: 'cut-b3',
            name: 'Greek Yogurt & Protein',
            calories: 280,
            protein: 40,
            carbs: 18,
            fats: 5,
            fiber: 0,
            prepTime: 2,
            tags: ['Super quick', 'High protein'],
            ingredients: ['Non-fat Greek yogurt 200g', 'Whey protein 1/2 scoop mixed in', 'Cinnamon', 'Stevia to taste'],
            instructions: ['Mix protein powder into yogurt until smooth', 'Sweeten with stevia and cinnamon', 'Enjoy immediately']
          }
        ]
      },
      {
        category: 'Snack 1',
        timing: '10:00 AM',
        options: [
          {
            id: 'cut-s1',
            name: 'Apple & Almonds',
            calories: 180,
            protein: 4,
            carbs: 20,
            fats: 10,
            fiber: 4,
            prepTime: 1,
            tags: ['No prep', 'Portable'],
            ingredients: ['Apple 1 medium', 'Almonds 15g (about 12)'],
            instructions: ['Wash apple', 'Eat apple with almonds']
          },
          {
            id: 'cut-s2',
            name: 'Protein Snack Pack',
            calories: 160,
            protein: 22,
            carbs: 8,
            fats: 4,
            fiber: 0,
            prepTime: 2,
            tags: ['High protein', 'Quick'],
            ingredients: ['Sliced turkey breast 100g', 'Cucumber slices', 'Cherry tomatoes 5', 'Mustard for dipping'],
            instructions: ['Arrange turkey slices with vegetables', 'Use mustard as dip']
          },
          {
            id: 'cut-s3',
            name: 'Rice Cake Stack',
            calories: 150,
            protein: 12,
            carbs: 16,
            fats: 5,
            fiber: 2,
            prepTime: 2,
            tags: ['Quick', 'Crunchy'],
            ingredients: ['Rice cakes 2', 'Tuna in water 80g', 'Light mayo 1 tsp', 'Salt and pepper'],
            instructions: ['Mix tuna with light mayo and seasoning', 'Spread on rice cakes', 'Eat immediately']
          }
        ]
      },
      {
        category: 'Lunch',
        timing: '1:00 PM',
        options: [
          {
            id: 'cut-l1',
            name: 'Grilled Chicken Mega Salad',
            calories: 360,
            protein: 50,
            carbs: 14,
            fats: 12,
            fiber: 5,
            prepTime: 15,
            tags: ['High volume', 'Nutrient dense'],
            ingredients: ['Chicken breast 200g', 'Mixed greens 150g', 'Cherry tomatoes 10', 'Cucumber 1/2', 'Red onion 1/4', 'Balsamic vinegar 1 tbsp', 'Olive oil 1 tsp', 'Feta cheese 20g'],
            instructions: ['Grill chicken with seasoning, slice', 'Toss greens with chopped vegetables', 'Drizzle with balsamic and olive oil', 'Top with chicken and crumbled feta']
          },
          {
            id: 'cut-l2',
            name: 'Turkey Lettuce Wraps',
            calories: 320,
            protein: 42,
            carbs: 16,
            fats: 10,
            fiber: 3,
            prepTime: 15,
            tags: ['Low carb', 'Fresh'],
            ingredients: ['Ground turkey 99% lean 200g', 'Lettuce cups 4 large', 'Bell pepper diced', 'Onion 1/4 diced', 'Salsa 2 tbsp', 'Avocado 1/4 sliced', 'Lime juice', 'Cilantro'],
            instructions: ['Brown turkey with onion and bell pepper', 'Season with lime and cilantro', 'Spoon into lettuce cups', 'Top with salsa and avocado']
          },
          {
            id: 'cut-l3',
            name: 'Tuna Salad Protein Bowl',
            calories: 340,
            protein: 48,
            carbs: 18,
            fats: 10,
            fiber: 4,
            prepTime: 10,
            tags: ['No cook', 'Omega-3'],
            ingredients: ['Canned tuna in water 200g', 'Cucumber diced 100g', 'Cherry tomatoes 8', 'Red onion 1/4', 'Mixed greens 100g', 'Light vinaigrette 1 tbsp', 'Lemon juice', 'Salt and pepper'],
            instructions: ['Drain tuna and flake into bowl', 'Add chopped vegetables and greens', 'Dress with vinaigrette and lemon', 'Season and toss']
          }
        ]
      },
      {
        category: 'Snack 2',
        timing: '4:00 PM',
        options: [
          {
            id: 'cut-s4',
            name: 'Cottage Cheese & Berries',
            calories: 180,
            protein: 26,
            carbs: 14,
            fats: 3,
            fiber: 1,
            prepTime: 2,
            tags: ['Casein protein', 'Slow digesting'],
            ingredients: ['Low-fat cottage cheese 200g', 'Strawberries 100g sliced', 'Stevia if needed'],
            instructions: ['Scoop cottage cheese into bowl', 'Top with sliced strawberries', 'Sweeten if desired']
          },
          {
            id: 'cut-s5',
            name: 'Veggie Hummus Cup',
            calories: 170,
            protein: 6,
            carbs: 18,
            fats: 8,
            fiber: 5,
            prepTime: 5,
            tags: ['Vegan', 'Fiber rich'],
            ingredients: ['Hummus 3 tbsp', 'Celery sticks 3', 'Carrot sticks 2', 'Cucumber slices', 'Cherry tomatoes 5', 'Bell pepper strips'],
            instructions: ['Arrange vegetables on plate', 'Use hummus as dip']
          },
          {
            id: 'cut-s6',
            name: 'Protein Coffee Shake',
            calories: 140,
            protein: 28,
            carbs: 6,
            fats: 2,
            fiber: 0,
            prepTime: 3,
            tags: ['Caffeine boost', 'Liquid'],
            ingredients: ['Whey protein 1 scoop', 'Cold brew coffee 250ml', 'Ice cubes', 'Unsweetened almond milk 100ml', 'Sugar-free syrup optional'],
            instructions: ['Blend protein with cold brew, almond milk, and ice', 'Add sugar-free syrup if desired', 'Enjoy as afternoon pick-me-up']
          }
        ]
      },
      {
        category: 'Dinner',
        timing: '7:00 PM',
        options: [
          {
            id: 'cut-d1',
            name: 'White Fish & Roasted Vegetables',
            calories: 310,
            protein: 44,
            carbs: 12,
            fats: 10,
            fiber: 4,
            prepTime: 20,
            tags: ['Low calorie', 'Omega-3'],
            ingredients: ['Cod or tilapia fillet 250g', 'Asparagus 200g', 'Lemon 1/2', 'Garlic 2 cloves', 'Olive oil 1 tsp', 'Herbs (dill, parsley)', 'Cherry tomatoes 8', 'Spinach 100g'],
            instructions: ['Season fish with lemon, garlic, and herbs', 'Bake at 200C for 12-15 min', 'Roast asparagus with olive oil', 'Serve with fresh spinach and tomatoes']
          },
          {
            id: 'cut-d2',
            name: 'Lean Beef Stir-Fry',
            calories: 360,
            protein: 42,
            carbs: 18,
            fats: 14,
            fiber: 4,
            prepTime: 20,
            tags: ['Iron rich', 'Quick'],
            ingredients: ['Lean beef strips (eye of round) 200g', 'Broccoli 150g', 'Snap peas 100g', 'Soy sauce 1 tbsp', 'Sesame oil 1 tsp', 'Ginger 1 tbsp', 'Garlic 2 cloves', 'Cauliflower rice 150g'],
            instructions: ['Slice beef thinly against the grain', 'Stir-fry beef with ginger and garlic', 'Add vegetables and cook until tender-crisp', 'Add soy sauce and sesame oil', 'Serve over cauliflower rice']
          },
          {
            id: 'cut-d3',
            name: 'Chicken Zucchini Noodles',
            calories: 290,
            protein: 40,
            carbs: 14,
            fats: 10,
            fiber: 4,
            prepTime: 15,
            tags: ['Low carb', 'Volume eating'],
            ingredients: ['Chicken breast 200g', 'Zucchini noodles (zoodles) 200g', 'Cherry tomatoes 10', 'Garlic 2 cloves', 'Olive oil 1 tsp', 'Parmesan 15g', 'Fresh basil', 'Red pepper flakes'],
            instructions: ['Sauté diced chicken until cooked through', 'Add garlic and tomatoes', 'Toss in zoodles and cook 2-3 min', 'Top with parmesan and fresh basil']
          }
        ]
      }
    ]
  },
  {
    id: 'maintenance',
    name: 'Balanced Lifestyle',
    goal: 'Maintenance',
    targetCalories: '~2500-2800 kcal',
    macroSplit: { protein: '25-30%', carbs: '40-45%', fats: '30-35%' },
    description: 'Sustainable, balanced macros for maintaining current physique, supporting training performance, and enjoying food flexibility.',
    tips: [
      'This is your sustainable baseline - no extremes needed',
      'Focus on whole foods 80% of the time, flexible 20%',
      'Prioritize protein at each meal for recovery',
      'Listen to hunger cues and adjust portions',
      'Stay consistent - maintenance is about habits, not perfection'
    ],
    slots: [
      {
        category: 'Breakfast',
        timing: '7:30 AM',
        options: [
          {
            id: 'main-b1',
            name: 'Veggie Omelet & Toast',
            calories: 460,
            protein: 30,
            carbs: 38,
            fats: 22,
            fiber: 4,
            prepTime: 15,
            tags: ['Balanced', 'Satisfying'],
            ingredients: ['Whole eggs 2', 'Egg whites 3', 'Whole grain toast 2 slices', 'Avocado 1/4 sliced', 'Mixed bell peppers 50g', 'Onion 1/4', 'Spinach 50g', 'Feta cheese 20g'],
            instructions: ['Sauté vegetables in cooking spray', 'Pour in beaten eggs and cook into omelet', 'Fold with feta inside', 'Serve with toast and avocado']
          },
          {
            id: 'main-b2',
            name: 'Overnight Protein Oats',
            calories: 440,
            protein: 30,
            carbs: 52,
            fats: 12,
            fiber: 8,
            prepTime: 5,
            tags: ['Meal prep', 'Grab and go'],
            ingredients: ['Rolled oats 80g', 'Whey protein 1/2 scoop', 'Greek yogurt 150g', 'Almond milk 200ml', 'Mixed berries 100g', 'Chia seeds 1 tbsp', 'Honey 1 tsp'],
            instructions: ['Mix oats, protein, yogurt, and milk in jar', 'Refrigerate overnight', 'Top with berries, chia, and honey in morning']
          }
        ]
      },
      {
        category: 'Snack 1',
        timing: '10:30 AM',
        options: [
          {
            id: 'main-s1',
            name: 'Trail Mix & Fruit',
            calories: 310,
            protein: 8,
            carbs: 34,
            fats: 18,
            fiber: 4,
            prepTime: 1,
            tags: ['Energy boost', 'Portable'],
            ingredients: ['Mixed nuts 25g', 'Dried fruit 20g', 'Dark chocolate chips 10g', 'Fresh apple 1 small'],
            instructions: ['Mix nuts, dried fruit, and chocolate', 'Enjoy with fresh apple']
          },
          {
            id: 'main-s2',
            name: 'Protein Smoothie',
            calories: 290,
            protein: 28,
            carbs: 30,
            fats: 8,
            fiber: 4,
            prepTime: 3,
            tags: ['Refreshing', 'Quick'],
            ingredients: ['Whey protein 1 scoop', 'Banana 1', 'Spinach handful', 'Peanut butter 1 tbsp', 'Milk 250ml', 'Ice'],
            instructions: ['Blend all ingredients until smooth', 'Drink immediately']
          }
        ]
      },
      {
        category: 'Lunch',
        timing: '1:00 PM',
        options: [
          {
            id: 'main-l1',
            name: 'Mediterranean Chicken Bowl',
            calories: 560,
            protein: 42,
            carbs: 48,
            fats: 22,
            fiber: 6,
            prepTime: 20,
            tags: ['Flavorful', 'Balanced'],
            ingredients: ['Chicken breast 200g', 'Quinoa 150g cooked', 'Hummus 2 tbsp', 'Cucumber diced', 'Cherry tomatoes 8', 'Red onion 1/4', 'Feta 30g', 'Olive oil 1 tsp', 'Lemon juice', 'Mixed greens'],
            instructions: ['Grill seasoned chicken, slice', 'Assemble bowl with quinoa and greens', 'Add vegetables, hummus, and feta', 'Drizzle with olive oil and lemon']
          },
          {
            id: 'main-l2',
            name: 'Tuna Salad Sandwich',
            calories: 530,
            protein: 38,
            carbs: 48,
            fats: 20,
            fiber: 6,
            prepTime: 10,
            tags: ['Classic', 'Satisfying'],
            ingredients: ['Canned tuna in water 180g', 'Whole grain bread 2 slices', 'Light mayo 1 tbsp', 'Celery 1 stalk diced', 'Red onion 1/4 diced', 'Lettuce and tomato', 'Side salad with vinaigrette'],
            instructions: ['Mix tuna with mayo, celery, and onion', 'Assemble sandwich with lettuce and tomato', 'Serve with side salad']
          }
        ]
      },
      {
        category: 'Snack 2',
        timing: '4:00 PM',
        options: [
          {
            id: 'main-s3',
            name: 'Greek Yogurt Parfait',
            calories: 260,
            protein: 22,
            carbs: 28,
            fats: 8,
            fiber: 2,
            prepTime: 3,
            tags: ['Protein rich', 'Sweet treat'],
            ingredients: ['Greek yogurt 200g', 'Granola 30g', 'Honey 1 tbsp', 'Walnuts 15g', 'Blueberries 50g'],
            instructions: ['Layer yogurt in glass', 'Add granola, walnuts, and berries', 'Drizzle with honey']
          },
          {
            id: 'main-s4',
            name: 'Hard-Boiled Eggs & Veggies',
            calories: 250,
            protein: 18,
            carbs: 16,
            fats: 14,
            fiber: 3,
            prepTime: 1,
            tags: ['Quick', 'Nutrient dense'],
            ingredients: ['Hard-boiled eggs 2', 'Whole grain crackers 6', 'Cheese slice 1', 'Cherry tomatoes 6', 'Cucumber slices'],
            instructions: ['Arrange everything on plate', 'Season eggs with salt and pepper']
          }
        ]
      },
      {
        category: 'Dinner',
        timing: '7:00 PM',
        options: [
          {
            id: 'main-d1',
            name: 'Salmon & Quinoa',
            calories: 620,
            protein: 42,
            carbs: 48,
            fats: 26,
            fiber: 6,
            prepTime: 25,
            tags: ['Omega-3 rich', 'Nutrient dense'],
            ingredients: ['Salmon fillet 200g', 'Quinoa 150g cooked', 'Roasted vegetables 200g (zucchini, peppers, onion)', 'Olive oil 1 tbsp', 'Lemon dill sauce 2 tbsp', 'Mixed green salad'],
            instructions: ['Season and bake salmon at 200C for 15 min', 'Cook quinoa according to package', 'Roast vegetables with olive oil and herbs', 'Serve with lemon dill sauce and side salad']
          },
          {
            id: 'main-d2',
            name: 'Pork Tenderloin & Rice',
            calories: 580,
            protein: 45,
            carbs: 48,
            fats: 22,
            fiber: 4,
            prepTime: 30,
            tags: ['Lean protein', 'Satisfying'],
            ingredients: ['Pork tenderloin 200g', 'Brown rice 150g cooked', 'Steamed broccoli 150g', 'Apple sauce 2 tbsp (unsweetened)', 'Dijon mustard 1 tbsp', 'Mixed salad', 'Olive oil 1 tsp'],
            instructions: ['Season pork and sear all sides', 'Finish in oven at 180C for 15 min', 'Cook brown rice', 'Steam broccoli', 'Slice pork and serve with apple sauce and mustard']
          }
        ]
      }
    ]
  },
  {
    id: 'vegan',
    name: 'Plant Power',
    goal: 'Vegan Lifestyle',
    targetCalories: '~2600-3000 kcal',
    macroSplit: { protein: '20-25%', carbs: '50-55%', fats: '25-30%' },
    description: '100% plant-based plan with complete proteins, micronutrient density, and optimal amino acid profiles through strategic food combining.',
    tips: [
      'Combine legumes + grains for complete protein profiles',
      'Supplement B12, Vitamin D, and Omega-3 (algae-based)',
      'Eat a variety of protein sources throughout the day',
      'Include fermented foods for gut health',
      'Track protein initially to ensure adequate intake (1.6-2g per kg)'
    ],
    slots: [
      {
        category: 'Breakfast',
        timing: '7:30 AM',
        options: [
          {
            id: 'veg-b1',
            name: 'Tofu Scramble Toast',
            calories: 420,
            protein: 26,
            carbs: 42,
            fats: 18,
            fiber: 6,
            prepTime: 15,
            tags: ['Savory', 'High protein'],
            ingredients: ['Firm tofu 200g crumbled', 'Turmeric 1/2 tsp', 'Nutritional yeast 2 tbsp', 'Whole grain toast 2 slices', 'Spinach 100g', 'Tomato 1 sliced', 'Avocado 1/4', 'Black salt (kala namak)'],
            instructions: ['Sauté crumbled tofu with turmeric and nutritional yeast', 'Add spinach and cook until wilted', 'Season with black salt for eggy flavor', 'Serve on toast with tomato and avocado']
          },
          {
            id: 'veg-b2',
            name: 'Chia Protein Pudding',
            calories: 400,
            protein: 24,
            carbs: 38,
            fats: 20,
            fiber: 10,
            prepTime: 5,
            tags: ['Make ahead', 'Omega-3'],
            ingredients: ['Chia seeds 3 tbsp', 'Plant protein (pea/rice blend) 1 scoop', 'Almond milk 250ml', 'Mixed berries 100g', 'Maple syrup 1 tbsp', 'Vanilla extract', 'Walnuts 15g'],
            instructions: ['Mix chia seeds, protein powder, and almond milk', 'Refrigerate overnight or for 4+ hours', 'Top with berries, walnuts, and maple syrup']
          }
        ]
      },
      {
        category: 'Snack 1',
        timing: '10:30 AM',
        options: [
          {
            id: 'veg-s1',
            name: 'Hummus Veggie Platter',
            calories: 260,
            protein: 10,
            carbs: 28,
            fats: 14,
            fiber: 8,
            prepTime: 5,
            tags: ['Fresh', 'Fiber rich'],
            ingredients: ['Hummus 4 tbsp', 'Carrot sticks 2', 'Cucumber 1/2 sliced', 'Bell pepper 1 sliced', 'Whole grain pita 1/2', 'Olives 5'],
            instructions: ['Arrange vegetables and pita on plate', 'Use hummus as dip']
          },
          {
            id: 'veg-s2',
            name: 'Edamame Protein Snack',
            calories: 240,
            protein: 20,
            carbs: 16,
            fats: 10,
            fiber: 8,
            prepTime: 5,
            tags: ['Complete protein', 'Quick'],
            ingredients: ['Edamame pods 200g (or shelled 120g)', 'Sea salt', 'Chili flakes', 'Lemon juice', 'Sesame seeds'],
            instructions: ['Steam or microwave edamame until hot', 'Season with salt, chili, lemon, and sesame']
          }
        ]
      },
      {
        category: 'Lunch',
        timing: '1:00 PM',
        options: [
          {
            id: 'veg-l1',
            name: 'Buddha Power Bowl',
            calories: 580,
            protein: 24,
            carbs: 68,
            fats: 24,
            fiber: 14,
            prepTime: 20,
            tags: ['Nutrient dense', 'Colorful'],
            ingredients: ['Quinoa 150g cooked', 'Chickpeas 150g', 'Avocado 1/2', 'Kale 100g massaged', 'Tahini dressing 2 tbsp', 'Roasted sweet potato 150g', 'Pumpkin seeds 15g', 'Lemon juice'],
            instructions: ['Massage kale with lemon juice until softened', 'Arrange quinoa, chickpeas, and sweet potato in bowl', 'Add kale and sliced avocado', 'Drizzle with tahini dressing and pumpkin seeds']
          },
          {
            id: 'veg-l2',
            name: 'Red Lentil Curry',
            calories: 600,
            protein: 28,
            carbs: 78,
            fats: 18,
            fiber: 12,
            prepTime: 25,
            tags: ['Comfort food', 'Batch cook'],
            ingredients: ['Red lentils 200g dry', 'Light coconut milk 100ml', 'Curry paste 1 tbsp', 'Brown rice 150g cooked', 'Spinach 100g', 'Onion diced', 'Garlic 2 cloves', 'Ginger 1 tbsp', 'Tomatoes diced 200g'],
            instructions: ['Sauté onion, garlic, and ginger', 'Add curry paste and tomatoes, simmer', 'Add lentils and coconut milk, cook 15 min', 'Stir in spinach at end', 'Serve over brown rice']
          }
        ]
      },
      {
        category: 'Snack 2',
        timing: '4:00 PM',
        options: [
          {
            id: 'veg-s3',
            name: 'Green Protein Smoothie',
            calories: 320,
            protein: 28,
            carbs: 34,
            fats: 10,
            fiber: 6,
            prepTime: 5,
            tags: ['Greens packed', 'Refreshing'],
            ingredients: ['Plant protein 1 scoop', 'Banana 1', 'Spinach 50g', 'Almond butter 1 tbsp', 'Oat milk 300ml', 'Ice', 'Spirulina powder 1 tsp (optional)'],
            instructions: ['Blend all ingredients until smooth', 'Drink immediately']
          },
          {
            id: 'veg-s4',
            name: 'Peanut Butter Rice Cakes',
            calories: 340,
            protein: 14,
            carbs: 38,
            fats: 18,
            fiber: 4,
            prepTime: 2,
            tags: ['Quick', 'Satisfying'],
            ingredients: ['Rice cakes 3', 'Peanut butter 2 tbsp', 'Chia seeds 1 tbsp', 'Sliced banana 1/2', 'Dark chocolate drizzle 10g'],
            instructions: ['Spread peanut butter on rice cakes', 'Top with banana slices and chia seeds', 'Drizzle with melted dark chocolate']
          }
        ]
      },
      {
        category: 'Dinner',
        timing: '7:00 PM',
        options: [
          {
            id: 'veg-d1',
            name: 'Chickpea Pasta Marinara',
            calories: 540,
            protein: 30,
            carbs: 72,
            fats: 16,
            fiber: 14,
            prepTime: 20,
            tags: ['High protein pasta', 'Comfort food'],
            ingredients: ['Chickpea pasta 100g dry', 'Marinara sauce 200g', 'Nutritional yeast 2 tbsp', 'Zucchini 100g diced', 'Mushrooms 100g sliced', 'Fresh basil', 'Garlic 2 cloves', 'Olive oil 1 tsp', 'Side salad'],
            instructions: ['Cook chickpea pasta according to package', 'Sauté garlic, zucchini, and mushrooms', 'Add marinara and simmer', 'Toss with pasta and nutritional yeast', 'Garnish with fresh basil']
          },
          {
            id: 'veg-d2',
            name: 'Tempeh Stir-Fry',
            calories: 580,
            protein: 32,
            carbs: 58,
            fats: 26,
            fiber: 8,
            prepTime: 20,
            tags: ['Fermented protein', 'Flavorful'],
            ingredients: ['Tempeh 200g cubed', 'Brown rice 150g cooked', 'Broccoli 150g', 'Bell pepper 1 sliced', 'Soy sauce 2 tbsp', 'Sesame oil 1 tsp', 'Ginger 1 tbsp', 'Garlic 2 cloves', 'Sesame seeds', 'Sriracha optional'],
            instructions: ['Pan-fry tempeh cubes until golden', 'Stir-fry vegetables with ginger and garlic', 'Add tempeh back with soy sauce and sesame oil', 'Toss together and serve over rice', 'Top with sesame seeds and sriracha']
          }
        ]
      }
    ]
  },
  {
    id: 'keto',
    name: 'Keto Shred',
    goal: 'Ketogenic Fat Loss',
    targetCalories: '~1800-2200 kcal',
    macroSplit: { protein: '25-30%', carbs: '5-10%', fats: '60-70%' },
    description: 'Strict ketogenic plan for rapid fat loss through ketosis. Very low carb, moderate protein, high fat. Not recommended long-term without medical supervision.',
    tips: [
      'Keep net carbs under 20-30g per day to maintain ketosis',
      'Increase sodium, potassium, and magnesium (keto flu prevention)',
      'Drink plenty of water - ketosis is dehydrating',
      'Use MCT oil for quick ketone production',
      'Monitor blood ketones if possible (target 0.5-3.0 mmol/L)'
    ],
    slots: [
      {
        category: 'Breakfast',
        timing: '8:00 AM',
        options: [
          {
            id: 'keto-b1',
            name: 'Bacon & Eggs Avocado Plate',
            calories: 580,
            protein: 28,
            carbs: 8,
            fats: 50,
            fiber: 5,
            prepTime: 10,
            tags: ['Classic keto', 'Satisfying'],
            ingredients: ['Bacon 4 strips', 'Eggs 2 fried in butter', 'Avocado 1 whole', 'Butter 1 tbsp', 'Salt and pepper', 'Hot sauce optional'],
            instructions: ['Cook bacon until crispy', 'Fry eggs in butter to preference', 'Slice avocado alongside', 'Season everything well']
          },
          {
            id: 'keto-b2',
            name: 'Keto Coffee & Chia Pudding',
            calories: 420,
            protein: 12,
            carbs: 6,
            fats: 40,
            fiber: 8,
            prepTime: 5,
            tags: ['Bulletproof', 'MCT boost'],
            ingredients: ['Coffee 1 cup', 'MCT oil 1 tbsp', 'Butter 1 tbsp', 'Chia seeds 3 tbsp', 'Coconut milk (full fat) 150ml', 'Stevia to taste', 'Vanilla extract'],
            instructions: ['Blend coffee with MCT oil and butter (bulletproof coffee)', 'Mix chia seeds with coconut milk, stevia, and vanilla', 'Let chia sit 10 min while drinking coffee', 'Enjoy chia pudding']
          }
        ]
      },
      {
        category: 'Snack 1',
        timing: '11:00 AM',
        options: [
          {
            id: 'keto-s1',
            name: 'Macadamia & Cheese',
            calories: 320,
            protein: 8,
            carbs: 4,
            fats: 32,
            fiber: 2,
            prepTime: 1,
            tags: ['Zero prep', 'High fat'],
            ingredients: ['Macadamia nuts 30g', 'Cheddar cheese 40g', 'Olives 5'],
            instructions: ['Arrange on plate', 'Eat slowly and mindfully']
          },
          {
            id: 'keto-s2',
            name: 'Celery & Almond Butter',
            calories: 280,
            protein: 8,
            carbs: 6,
            fats: 26,
            fiber: 3,
            prepTime: 2,
            tags: ['Crunchy', 'Quick'],
            ingredients: ['Celery sticks 4', 'Almond butter 2 tbsp', 'Everything bagel seasoning'],
            instructions: ['Fill celery with almond butter', 'Sprinkle with seasoning']
          }
        ]
      },
      {
        category: 'Lunch',
        timing: '1:00 PM',
        options: [
          {
            id: 'keto-l1',
            name: 'Caesar Salad with Chicken',
            calories: 520,
            protein: 42,
            carbs: 6,
            fats: 36,
            fiber: 3,
            prepTime: 15,
            tags: ['Restaurant style', 'High protein'],
            ingredients: ['Grilled chicken breast 200g', 'Romaine lettuce 150g', 'Parmesan 30g', 'Bacon bits 20g', 'Caesar dressing (keto) 3 tbsp', 'Lemon juice', 'Black pepper'],
            instructions: ['Grill and slice chicken', 'Chop romaine', 'Toss with dressing, parmesan, and bacon', 'Top with sliced chicken and lemon']
          },
          {
            id: 'keto-l2',
            name: 'Salmon Salad Plate',
            calories: 580,
            protein: 38,
            carbs: 5,
            fats: 46,
            fiber: 2,
            prepTime: 15,
            tags: ['Omega-3 rich', 'No cook option'],
            ingredients: ['Smoked salmon 150g', 'Cream cheese 3 tbsp', 'Cucumber slices', 'Avocado 1/2', 'Capers 1 tbsp', 'Olive oil 1 tbsp', 'Lemon', 'Mixed greens'],
            instructions: ['Arrange greens on plate', 'Add smoked salmon, sliced avocado, cucumber', 'Dollop cream cheese and capers', 'Drizzle with olive oil and lemon']
          }
        ]
      },
      {
        category: 'Snack 2',
        timing: '4:00 PM',
        options: [
          {
            id: 'keto-s3',
            name: 'Fat Bomb Coffee',
            calories: 220,
            protein: 2,
            carbs: 1,
            fats: 24,
            fiber: 0,
            prepTime: 3,
            tags: ['Energy boost', 'MCT'],
            ingredients: ['Coffee 1 cup', 'MCT oil 1 tbsp', 'Heavy cream 2 tbsp', 'Stevia to taste'],
            instructions: ['Blend coffee with MCT oil, cream, and stevia', 'Drink immediately']
          },
          {
            id: 'keto-s4',
            name: 'Pepperoni & Cheese Chips',
            calories: 260,
            protein: 14,
            carbs: 2,
            fats: 22,
            fiber: 0,
            prepTime: 5,
            tags: ['Crunchy', 'Satisfying'],
            ingredients: ['Pepperoni slices 30g', 'Parmesan crisps (baked) 20g', 'Cream cheese 1 tbsp for dip'],
            instructions: ['Bake pepperoni until crispy (3-4 min at 200C)', 'Serve with parmesan crisps and cream cheese']
          }
        ]
      },
      {
        category: 'Dinner',
        timing: '7:00 PM',
        options: [
          {
            id: 'keto-d1',
            name: 'Ribeye with Garlic Butter',
            calories: 720,
            protein: 50,
            carbs: 2,
            fats: 58,
            fiber: 0,
            prepTime: 20,
            tags: ['High fat protein', 'Satisfying'],
            ingredients: ['Ribeye steak 250g', 'Butter 2 tbsp', 'Garlic 3 cloves', 'Asparagus 150g', 'Olive oil 1 tbsp', 'Salt and pepper', 'Herb butter 1 tbsp'],
            instructions: ['Season steak generously with salt', 'Sear in hot pan 3-4 min per side for medium', 'Baste with garlic butter', 'Rest 5 min', 'Serve with olive oil drizzled asparagus']
          },
          {
            id: 'keto-d2',
            name: 'Creamy Chicken Thighs',
            calories: 650,
            protein: 42,
            carbs: 6,
            fats: 50,
            fiber: 1,
            prepTime: 25,
            tags: ['Comfort food', 'One pan'],
            ingredients: ['Chicken thighs (skin on) 250g', 'Heavy cream 100ml', 'Butter 1 tbsp', 'Garlic 3 cloves', 'Spinach 100g', 'Parmesan 20g', 'Mushrooms 100g', 'Olive oil 1 tbsp'],
            instructions: ['Sear chicken thighs skin-side down until crispy', 'Flip and cook through, remove from pan', 'Sauté mushrooms and garlic in same pan', 'Add cream, parmesan, and spinach', 'Simmer until thickened, return chicken to pan']
          }
        ]
      }
    ]
  }
];

export const getPlanById = (id: string) => nutritionPlans.find(p => p.id === id);
export const getAllMealOptions = (planId: string, slotIndex: number) => {
  const plan = getPlanById(planId);
  return plan?.slots[slotIndex]?.options || [];
};
