import { Request, Response } from "express";
import { EnquiryService } from "../Services/EnquiryService";

export class EnquiryController {
  private _enquiryService: EnquiryService;
  constructor(private enquiryService: EnquiryService) {
    this._enquiryService = enquiryService;
  }

  public async CreateEnquiry(req: Request, res: Response) {
    try {
      let result = await this._enquiryService.createEnquiry(req.body);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  public async GetAllEnquiries(req: Request, res: Response) {
    try {
      let result = await this._enquiryService.getAllEnquiries();
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  public async DeleteEnquiry(req: Request, res: Response) {
    const { id } = req.params;
    try {
      let result = await this._enquiryService.deleteEnquiry(id);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export const enquiryController = new EnquiryController(new EnquiryService());
