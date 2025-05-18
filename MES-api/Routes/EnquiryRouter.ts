import { Router } from "express";
import { enquiryController } from "../Controllers/EnquiryController";
const enquiryRouter = Router();

enquiryRouter.post("/create", (req, res) =>
  enquiryController.CreateEnquiry(req, res)
);
enquiryRouter.delete("/:id", (req, res) =>
  enquiryController.DeleteEnquiry(req, res)
);
enquiryRouter.get("/", (req, res) =>
  enquiryController.GetAllEnquiries(req, res)
);

export default enquiryRouter;
