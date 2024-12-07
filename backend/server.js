import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();
const app = express()
const PORT = process.env.PROT || 5000;

//read json form
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

/* function: connect with database
  expect: in console you will get message show
  that you connect successfully or there error
*/ 



// create new exercise in database
app.post( ("/add-exercise"),async (req, res) => {
  // const { user, date, exercises } = req.body;

  // res.status(201).json({ user, date, exercises: createdExercises });
  const { date,title, category, weight, time, reps, sets } = req.body;

  // Create a new exercise entry
  const newExercise = {
    date,
    exercises:[{
      title,
      category,
      weight,
      sets,
      reps,
      time,
    }]
  };

  // Find the day or create a new day
  try {
    let day = await DayExercises.findOne({ date });
    if (!day) {
      day = new DayExercises({ date, exercises: [] });
    }
    day.exercises.push(newExercise);
    await day.save();
    res.status(201).json(newExercise); // Return the new exercise data
  } catch (error) {
    res.status(400).send('Error saving exercise');
  }
})
);






import  connectDB  from "./db/connectDB.js";
connectDB()

import exerciseRouter from './routers/exerciseRouter.js';
app.use('/api',exerciseRouter)

app.listen(PORT, ()=> console.log("it's work"))