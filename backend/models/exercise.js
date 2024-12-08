import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  weight: {
    type: Number,
    default: 0
  },
  sets: {
    type: Number,
    required: false,
    default:0
  },
  reps: {
    type: Number,
    required: false,
    default:0
  },
  time: {
    type: Number,
    required: false,
    default:0
  }
});

const workoutSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    required: true
  },
  exercises: [exerciseSchema]  
});

export default mongoose.model('Workout', workoutSchema);