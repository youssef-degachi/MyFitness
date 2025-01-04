import express from "express";
const router = express.Router();
import {
  getExercises,
  addExercises,
  deleteWorkout,
} from "../controllers/exerciseController.js";

router.route("/add-exercise").post(addExercises);
router.route("/get-exercise").get(getExercises);
router.route("/delete-exercise/:date").delete(deleteWorkout);

router.route("/test").get(() => {
  console.log("test");
});

export default router;
