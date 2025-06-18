import { Router } from "express";
import {
  createClass,
  getClasses,
  getClassById,
  updateClassById,
  deleteClassById,
} from "../Controllers/ClassController";
import { upload } from "../Config/FileStorageConfig";

const classRouter = Router();

classRouter.post("/", upload.single("image"), createClass);
classRouter.get("/", getClasses);
classRouter.get("/:id", getClassById);
classRouter.put("/:id", upload.single("image"), updateClassById);
classRouter.delete("/:id", deleteClassById);

export default classRouter;
