import { Router } from "express";
import {
  createClass,
  getAllClasses,
  getClassById,
  updateClassById,
  deleteClassById,
  uploadClassImage,
} from "../Controllers/ClassController";
import { upload } from "../Config/FileStorageConfig";

const classRouter = Router();

classRouter.post("/", upload.single("image"), createClass);
classRouter.get("/", getAllClasses);
classRouter.get("/:id", getClassById);
classRouter.put("/:id", updateClassById);
classRouter.delete("/:id", deleteClassById);
classRouter.post("/:id/image", upload.single("image"), uploadClassImage);

export default classRouter;
