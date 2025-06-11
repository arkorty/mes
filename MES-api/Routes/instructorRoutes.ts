import express from "express";
import {
  getAllInstructors,
  getInstructorById,
  createInstructor,
  updateInstructor,
  deleteInstructor,
} from "../Controllers/InstructorController";

const router = express.Router();

router.get("/", getAllInstructors);

router.get("/:id", getInstructorById);

router.post("/", createInstructor);

router.put("/:id", updateInstructor);

router.delete("/:id", deleteInstructor);

export default router;
