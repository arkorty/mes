import { Router } from "express";
import { enquiryController } from "../Controllers/EnquiryController";
const enquiryRouter = Router();

enquiryRouter.post("/create", (req, res) =>
  enquiryController.CreateEnquiry(req, res)
);
enquiryRouter.get("/:id", (req, res) =>
  enquiryController.GetEnquiryById(req, res)
);
enquiryRouter.get("/", (req, res) =>
  enquiryController.GetAllEnquiries(req, res)
);

export default enquiryRouter;
