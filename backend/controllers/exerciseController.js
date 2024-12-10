import Workout from '../models/exercise.js'

// const addExercises = async (req, res) => {
//   const { date ,title, category, weight, sets, reps, time } = req.body;
//   let workout = await Workout.findOne({ date });

//   // If no workout exists for the date, create a new one
//   if (!workout) {
//     workout = new Workout({
//       date,
//       exercises: [] // Initialize with an empty exercises array
//     });
//   }

//   // Create a new exercise
//   const newExercise = {
//     title,
//     category,
//     weight,
//     sets,
//     reps,
//     time
//   };

//   // Add the new exercise to the exercises array
//   workout.exercises.push(newExercise);

//   // Save the workout with the new exercise
//   await workout.save();
//   res.status(201).json(newExercise);
// }

// const getExercises = async (req, res) => {
//   const exercises = await Workout.find({});
//   res.json(exercises);
// }

const deleteWorkout = async (req, res) => {
  const { date } = req.params; // Get the date from the request parameters

  try {
    const workout = await Workout.findOneAndDelete({ date });
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found for this date' });
    }

    res.status(200).json({ message: `Workout for ${date} has been deleted` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};





const addExercises = async (req, res) => {
  const {userId ,date, title, category, weight, sets, reps, time } = req.body;

  let workout = await Workout.findOne({ date, user: userId });

  if (!workout) {
    workout = new Workout({
      user: userId,
      date,
      exercises: [],
    });
  }

  const newExercise = { title, category, weight, sets, reps, time };
  workout.exercises.push(newExercise);
  await workout.save();

  res.status(201).json(newExercise);
};


const getExercises = async (req, res) => {
  const userId = req.query.userId || req.body.userId;

  const exercises = await Workout.find({ user: userId });
  res.json(exercises);
};



const getExercisesById = async (req, res) => {
  const userId = req.query.userId || req.body.userId;

  const exercises = await Workout.find({ user: userId });
  res.json(exercises);
};







export { addExercises, getExercises, deleteWorkout,getExercisesById}