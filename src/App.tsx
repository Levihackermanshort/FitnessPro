import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { ReminderRunner } from '@/components/ReminderRunner';
import { HomePage } from '@/pages/HomePage';
import { ExercisesPage } from '@/pages/ExercisesPage';
import { WorkoutsPage } from '@/pages/WorkoutsPage';
import { ProgramsPage } from '@/pages/ProgramsPage';
import { WorkoutLogPage } from '@/pages/WorkoutLogPage';
import { CardioPage } from '@/pages/CardioPage';
import { NutritionPage } from '@/pages/NutritionPage';
import { WellnessPage } from '@/pages/WellnessPage';
import { ToolsPage } from '@/pages/ToolsPage';
import { SettingsPage } from '@/pages/SettingsPage';

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <ReminderRunner />
      <main className="pt-16">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/exercises" element={<ExercisesPage />} />
            <Route path="/workouts" element={<WorkoutsPage />} />
            <Route path="/programs" element={<ProgramsPage />} />
            <Route path="/log" element={<WorkoutLogPage />} />
            <Route path="/cardio" element={<CardioPage />} />
            <Route path="/nutrition" element={<NutritionPage />} />
            <Route path="/wellness" element={<WellnessPage />} />
            <Route path="/tools" element={<ToolsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
