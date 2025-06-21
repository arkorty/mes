import { Router } from "express";
import {
  createEvent,
  getEvents,
  getEventById,
  updateEventById,
  deleteEventById,
  uploadEventImage,
} from "../Controllers/EventController";
import { upload } from "../Config/FileStorageConfig";

const eventRouter = Router();

eventRouter.post("/", upload.single("image"), createEvent);
eventRouter.get("/", getEvents);
eventRouter.get("/:id", getEventById);
eventRouter.put("/:id", upload.single("image"), updateEventById);
eventRouter.delete("/:id", deleteEventById);
eventRouter.post("/:id/upload-image", upload.single("image"), uploadEventImage);

export default eventRouter;
