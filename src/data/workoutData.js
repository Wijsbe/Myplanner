// Workout categories
export const workoutCategories = [
  { id: 'push-pull', name: 'Push-Pull', color: 'primary' },
  { id: 'cardio', name: 'Cardio', color: 'secondary' },
  { id: 'yoga', name: 'Yoga', color: 'accent' },
  { id: 'home', name: 'Home Training', color: 'success' },
  { id: 'custom', name: 'Custom', color: 'gray' },
];

// Exercise data structure
export const exerciseTypes = [
  { id: 'strength', name: 'Strength', icon: 'dumbbell' },
  { id: 'cardio', name: 'Cardio', icon: 'running' },
  { id: 'flexibility', name: 'Flexibility', icon: 'yoga' },
  { id: 'balance', name: 'Balance', icon: 'balance' },
];

// Sample exercises for the library
export const exerciseLibrary = [
  // Push exercises
  {
    id: 1,
    name: 'Bench Press',
    type: 'strength',
    category: 'push-pull',
    targetMuscles: ['chest', 'triceps', 'shoulders'],
    description: 'Lie on a bench and push a barbell or dumbbells away from your chest.',
    defaultSets: 3,
    defaultReps: 10,
  },
  {
    id: 2,
    name: 'Push-ups',
    type: 'strength',
    category: 'push-pull',
    targetMuscles: ['chest', 'triceps', 'shoulders'],
    description: 'Start in a plank position and lower your body until your chest nearly touches the floor, then push back up.',
    defaultSets: 3,
    defaultReps: 15,
  },
  {
    id: 3,
    name: 'Shoulder Press',
    type: 'strength',
    category: 'push-pull',
    targetMuscles: ['shoulders', 'triceps'],
    description: 'Press weights from shoulder height to overhead.',
    defaultSets: 3,
    defaultReps: 10,
  },
  
  // Pull exercises
  {
    id: 4,
    name: 'Pull-ups',
    type: 'strength',
    category: 'push-pull',
    targetMuscles: ['back', 'biceps'],
    description: 'Hang from a bar and pull your body up until your chin is over the bar.',
    defaultSets: 3,
    defaultReps: 8,
  },
  {
    id: 5,
    name: 'Bent-over Rows',
    type: 'strength',
    category: 'push-pull',
    targetMuscles: ['back', 'biceps'],
    description: 'Bend at the hips and pull weights toward your lower chest/upper abdomen.',
    defaultSets: 3,
    defaultReps: 12,
  },
  
  // Cardio exercises
  {
    id: 6,
    name: 'Running',
    type: 'cardio',
    category: 'cardio',
    targetMuscles: ['legs', 'heart'],
    description: 'Run at a moderate pace.',
    defaultSets: 1,
    defaultReps: 1,
    defaultDuration: 20, // in minutes
  },
  {
    id: 7,
    name: 'Jumping Jacks',
    type: 'cardio',
    category: 'cardio',
    targetMuscles: ['full body', 'heart'],
    description: 'Jump while raising your arms and spreading your legs out.',
    defaultSets: 3,
    defaultReps: 30,
  },
  {
    id: 8,
    name: 'Burpees',
    type: 'cardio',
    category: 'cardio',
    targetMuscles: ['full body', 'heart'],
    description: 'Begin in a standing position, drop into a squat position, kick your feet back, do a push-up, return to squat, and jump up.',
    defaultSets: 3,
    defaultReps: 15,
  },
  
  // Yoga exercises
  {
    id: 9,
    name: 'Downward Dog',
    type: 'flexibility',
    category: 'yoga',
    targetMuscles: ['shoulders', 'hamstrings', 'calves'],
    description: 'Form an inverted V shape with your body, with hands and feet on the ground.',
    defaultSets: 1,
    defaultDuration: 60, // in seconds
  },
  {
    id: 10,
    name: 'Warrior Pose',
    type: 'balance',
    category: 'yoga',
    targetMuscles: ['legs', 'core'],
    description: 'Stand with legs apart, one knee bent, arms extended.',
    defaultSets: 1,
    defaultDuration: 45, // in seconds per side
  },
  
  // Home training exercises
  {
    id: 11,
    name: 'Bodyweight Squats',
    type: 'strength',
    category: 'home',
    targetMuscles: ['quadriceps', 'glutes', 'hamstrings'],
    description: 'Stand with feet shoulder-width apart, lower your body as if sitting in a chair, then return to standing.',
    defaultSets: 3,
    defaultReps: 20,
  },
  {
    id: 12,
    name: 'Plank',
    type: 'strength',
    category: 'home',
    targetMuscles: ['core', 'shoulders'],
    description: 'Hold a push-up position with your weight on your forearms.',
    defaultSets: 3,
    defaultDuration: 30, // in seconds
  },
  {
    id: 13,
    name: 'Mountain Climbers',
    type: 'cardio',
    category: 'home',
    targetMuscles: ['core', 'shoulders', 'legs'],
    description: 'Start in a plank position and alternate bringing knees to chest in a running motion.',
    defaultSets: 3,
    defaultDuration: 30, // in seconds
  },
];

// Preset workouts
export const presetWorkouts = [
  {
    id: 1,
    name: 'Push-Pull Workout',
    category: 'push-pull',
    description: 'A balanced workout targeting both pushing and pulling muscles.',
    exercises: [1, 2, 4, 5], // IDs from exerciseLibrary
    duration: 45, // in minutes
    difficulty: 'intermediate',
  },
  {
    id: 2,
    name: 'Cardio Blast',
    category: 'cardio',
    description: 'High-intensity cardio workout to get your heart pumping.',
    exercises: [6, 7, 8],
    duration: 30,
    difficulty: 'intermediate',
  },
  {
    id: 3,
    name: 'Yoga Flow',
    category: 'yoga',
    description: 'A relaxing yoga sequence to improve flexibility and mindfulness.',
    exercises: [9, 10],
    duration: 40,
    difficulty: 'beginner',
  },
  {
    id: 4,
    name: 'Home Body',
    category: 'home',
    description: 'A full-body workout you can do at home with no equipment.',
    exercises: [2, 11, 12, 13],
    duration: 35,
    difficulty: 'beginner',
  },
];

// Sample user workouts (empty initially)
export const userWorkouts = [];
