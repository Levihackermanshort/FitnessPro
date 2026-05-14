import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Dumbbell,
  Heart,
  Utensils,
  Activity,
  ArrowRight,
  TrendingUp,
  Flame,
  Target,
  Zap,
  Timer,
  Apple,
  Calculator
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  {
    href: '/exercises',
    title: 'Exercise Library',
    description: '45+ exercises with detailed instructions, pro tips, variations, and common mistakes to avoid.',
    icon: Dumbbell,
    color: 'from-blue-500/20 to-blue-600/5',
    borderColor: 'border-blue-500/20',
    iconColor: 'text-blue-400',
  },
  {
    href: '/workouts',
    title: 'Workout Routines',
    description: 'Push/Pull/Legs, Upper/Lower, Full Body, and Bro Split programs with built-in rest timers.',
    icon: Activity,
    color: 'from-primary/20 to-primary/5',
    borderColor: 'border-primary/20',
    iconColor: 'text-primary',
  },
  {
    href: '/cardio',
    title: 'Cardio Protocols',
    description: 'HIIT, LISS, MISS, and Circuit training with heart rate zones, calorie estimates, and session timers.',
    icon: Heart,
    color: 'from-red-500/20 to-red-600/5',
    borderColor: 'border-red-500/20',
    iconColor: 'text-red-400',
  },
  {
    href: '/nutrition',
    title: 'Nutrition Center',
    description: 'Shuffling meal plans, macro calculator, and diet templates for every goal.',
    icon: Utensils,
    color: 'from-amber-500/20 to-amber-600/5',
    borderColor: 'border-amber-500/20',
    iconColor: 'text-amber-400',
  },
  {
    href: '/tools',
    title: 'Fitness Tools',
    description: '1RM calculator, BMI tracker, water intake logger, and workout progress tracker.',
    icon: Calculator,
    color: 'from-purple-500/20 to-purple-600/5',
    borderColor: 'border-purple-500/20',
    iconColor: 'text-purple-400',
  },
];

const stats = [
  { label: 'Exercises', value: '45+', icon: Dumbbell },
  { label: 'Workout Plans', value: '10', icon: Zap },
  { label: 'Cardio Protocols', value: '9', icon: Timer },
  { label: 'Meal Plans', value: '5', icon: Apple },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } },
};

export function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 py-12"
    >
      {/* Hero Section */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
        >
          <Flame className="w-4 h-4" />
          Complete Fitness Platform
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
        >
          Train <span className="gradient-text">Smarter</span>
          <br />
          <span className="text-foreground">Eat Better</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          Evidence-based workouts, comprehensive exercise demonstrations, cardio programming with
          timers, and intelligent nutrition planning with shuffling meal plans.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Link to="/workouts">
            <Button size="lg" className="gap-2 px-8">
              Start Training <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link to="/nutrition">
            <Button size="lg" variant="secondary" className="gap-2 px-8">
              Plan Meals <Utensils className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Stats */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
      >
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              variants={item}
              className="glass rounded-xl p-5 text-center card-hover"
            >
              <Icon className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Features Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16"
      >
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <motion.div key={feature.href} variants={item}>
              <Link to={feature.href} className="block h-full group">
                <div
                  className={`h-full p-6 rounded-xl border ${feature.borderColor} bg-gradient-to-br ${feature.color} card-hover relative overflow-hidden`}
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-8 translate-x-8 group-hover:scale-150 transition-transform duration-500" />
                  <Icon className={`w-8 h-8 ${feature.iconColor} mb-4 relative z-10`} />
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors relative z-10">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground relative z-10">{feature.description}</p>
                  <div className="flex items-center gap-1 mt-4 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity relative z-10">
                    Explore <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Why Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="glass rounded-2xl p-8 md:p-12"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
          Why <span className="gradient-text">FitnessPro</span>?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-primary/20">
              <Target className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Goal-Specific</h3>
            <p className="text-sm text-muted-foreground">
              Programs tailored for bulking, cutting, or maintenance with precise macro calculations
              and adjustable meal plans.
            </p>
          </div>
          <div className="text-center">
            <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-500/20">
              <TrendingUp className="w-7 h-7 text-blue-400" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Progressive</h3>
            <p className="text-sm text-muted-foreground">
              Built-in workout timers, set tracking, progressive overload guidance, and personal
              record tracking to ensure consistent gains.
            </p>
          </div>
          <div className="text-center">
            <div className="w-14 h-14 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-red-500/20">
              <Flame className="w-7 h-7 text-red-400" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Science-Based</h3>
            <p className="text-sm text-muted-foreground">
              RPE-based cardio protocols, evidence-based nutrition splits, and biomechanically sound
              exercises with professional tips.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
