import express from "express";
import {
  getAllInstructors,
  getInstructorById,
  createInstructor,
  updateInstructor,
  deleteInstructor,
} from "../Controllers/InstructorController";
import { upload } from "../Config/FileStorageConfig";

const router = express.Router();

router.get("/", getAllInstructors);

router.get("/:id", getInstructorById);

router.post("/", upload.single("image"), createInstructor);

router.put("/:id", upload.single("image"), updateInstructor);

router.delete("/:id", deleteInstructor);

export default router;
