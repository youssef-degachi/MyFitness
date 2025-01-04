import Workout from "../models/exercise.js";
//* i use word workout

// create new exercise
// @param userId,date, title, category, weight, sets, reps, time
// @result create new exercise for "userId" and in date "date"
// Post request
const addExercises = async (req, res) => {
  // get detail from body
  const { userId, date, title, category, weight, sets, reps, time } = req.body;
  // find user and date
  let workout = await Workout.findOne({ date, user: userId });
  //if exercise not exist create it
  if (!workout) {
    workout = new Workout({
      user: userId,
      date,
      exercises: [],
    });
  }
  // add exercise for DB
  const newExercise = { title, category, weight, sets, reps, time };
  workout.exercises.push(newExercise);
  await workout.save();

  res.status(201).json(newExercise);
};

// get all exercise for specific user
// @param userId
// @result show all exercise for  specific user
// get request
const getExercises = async (req, res) => {
  // get all exercise and show them
  const userId = req.query.userId || req.body.userId;
  const workout = await Workout.find({ user: userId });
  res.json(workout);
};

// delete specific exercise for specific user
// @param Date ,userId
// @result delete user
// delete request
//! this function not perfect yet [can remove other user exercise]
// todo: need to add specific user
const deleteWorkout = async (req, res) => {
  // get date
  const { date } = req.params;
  // delete exercise with the same date
  try {
    const workout = await Workout.findOneAndDelete({ date });
    if (!workout) {
      return res
        .status(404)
        .json({ message: "Exercise not found in this date" });
    }
    // show if exercise is deleted or not
    res.status(200).json({ message: `Exercise in ${date} has been deleted` });
  } catch (error) {
    console.error(error);
  }
};

export { addExercises, getExercises, deleteWorkout };
