import mongoose from 'mongoose';

const exerciseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  date: { type: String, required: true },
  exercises: [
    {
      title: { type: String, required: true },
      type: { type: String, required: true },
      category: { type: String, required: true },
      weight: { type: Number },
      sets: { type: Number },
      reps: { type: Number },
      time: { type: Number },
    },
  ],
});

export const Exercise = mongoose.model('Exercise', exerciseSchema);
