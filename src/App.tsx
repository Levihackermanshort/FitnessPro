import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { HomePage } from '@/pages/HomePage';
import { ExercisesPage } from '@/pages/ExercisesPage';
import { WorkoutsPage } from '@/pages/WorkoutsPage';
import { CardioPage } from '@/pages/CardioPage';
import { NutritionPage } from '@/pages/NutritionPage';
import { ToolsPage } from '@/pages/ToolsPage';

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/exercises" element={<ExercisesPage />} />
            <Route path="/workouts" element={<WorkoutsPage />} />
            <Route path="/cardio" element={<CardioPage />} />
            <Route path="/nutrition" element={<NutritionPage />} />
            <Route path="/tools" element={<ToolsPage />} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
