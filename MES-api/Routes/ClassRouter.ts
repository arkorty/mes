import { Router } from "express";
import {
  createClass,
  getAllClasses,
  getClassById,
  updateClassById,
  deleteClassById
} from "../Controllers/ClassController";

const classRouter = Router();

classRouter.post("/", createClass);
classRouter.get("/", getAllClasses);
classRouter.get("/:id", getClassById);
classRouter.put("/:id", updateClassById);
classRouter.delete("/:id", deleteClassById);

export default classRouter;
